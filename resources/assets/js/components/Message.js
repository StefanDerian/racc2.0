import React from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'reactstrap';

import { connect } from 'react-redux';
import {types, actions, messageReducer} from '../redux/message'


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
  }

  render () {
    return(
      <div>

          {this.props.status == 2 &&<Alert className ="fixed" color="success"> {this.props.msg} </Alert>}
          {this.props.status == 1 &&<Alert className ="fixed" color="warning"> {this.props.msg} </Alert>}
          {this.props.status == 0 &&<Alert className ="fixed" color="danger"> {this.props.msg} </Alert>}





     </div>
    )


  }
  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  shouldComponentUpdate(nextProps, nextState){
    var self = this;
		if(nextState!== this.state || nextProps!== this.props){

      self.sleep(5000).then(()=>{
        self.props.reset()
      })


			return true
		}
		return false
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Message);
