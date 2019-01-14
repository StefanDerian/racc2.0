import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'reactstrap';

import { connect } from 'react-redux';
import {types, actions, messageReducer} from '../redux/message'
import iziToast from 'izitoast'
import 'izitoast/dist/css/iziToast.min.css'
import { PulseLoader } from 'react-spinners';


const mapDispatchToProps = (dispatch, ownProps) => ({
  failed: () => dispatch(actions.failed()),
  loading: () => dispatch(actions.loading()),
  success: () => dispatch(actions.success()),
  reset: () => dispatch(actions.reset()),
});

const mapStateToProps = ({messageReducer}) => {
	return {
		msg:messageReducer.msg,
		status:messageReducer.status,

	}
}


class Message extends React.Component {

  constructor(props){
    super(props)
    this.sleep = this.sleep.bind(this)
    this.showToast = this.showToast.bind(this)
  }

  render () {
    return(
      <div>
          {/*
          {this.props.status == 2 &&<Alert className ="fixed" color="success"> {this.props.msg} </Alert>}
          {this.props.status == 1 &&<Alert className ="fixed" color="warning"> {this.props.msg} </Alert>}
          {this.props.status == 0 &&<Alert className ="fixed" color="danger"> {this.props.msg} </Alert>}
          */}

          {this.props.status == 1 &&
          <div style = {{background:"#000000",opacity:'0.5',width:'100%',minHeight:'1500px',position:'fixed',textAlign:'center',zIndex:'999'}}>
            <PulseLoader

              style = {{display: 'block',
              margin: '0 auto',
              borderColor: 'red',
              textAlign:'center',
              position:'fixed'

              }}
              sizeUnit={"px"}
              size={100}
              color={'#A1C5F0'}
              loading={this.props.status == 1}


            />
          <br/>
            <p style={{fontSize:'100px',color:"#ffffff"}}>
              {this.props.msg}
            </p>
          </div>
          }

      </div>

    )


  }
  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  showToast(status, msg) {
    if(status == 2){
      iziToast.success({
          title: 'OK',
          message: msg,
          position: 'topCenter',
          displayMode: 'replace'
      });
    }else if (status == 1){
        iziToast.warning({
          title: 'Loading',
          message: msg,
          position: 'topCenter',
          displayMode: 'replace'
      });
    }else if(status == 0){
        iziToast.error({
          title: 'Error',
          message: msg,
          position: 'topCenter',
          displayMode: 'replace'
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    var self = this;
		if(nextState!== this.state || nextProps!== this.props){

      self.showToast(nextProps.status,nextProps.msg)
      self.sleep(5000).then(()=>{
        self.props.reset()
      })


			return true
		}
		return false
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Message);
