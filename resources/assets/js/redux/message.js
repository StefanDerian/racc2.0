export const types = {
	SUCCESS:'SUCCESS',
	LOADING:'LOADING',
  FAILED:'FAILED',
  RESET:'RESET'


};


export const actions = {
	failed: (msg) => {
		return {type: types.FAILED,payload:{msg:msg,status:0}}
	},
  loading: (msg) => {
		return {type: types.LOADING,payload:{msg:msg,status:1}}
	},
  success:(msg)=>{
    return {type: types.SUCCESS,payload:{msg:msg,status:2}}
  },
  reset:()=>{
    return {type: types.RESET}
  }
}

// Initial state of the store
const initialState = {
	status: -1,
  msg:""

};


export const messageReducer = (state = initialState, action) => {

  const { type, payload } = action;

	switch(action.type){

		case types.FAILED: {
			return {
				...state,
				...{msg:payload.msg, status: payload.status}

			};
		}

		case types.LOADING: {
			return {
        ...state,
        ...{msg:payload.msg, status: payload.status}
			};
		}
		case types.SUCCESS: {
			return {
        ...state,
        ...{msg:payload.msg, status: payload.status}
			};
		}
		case types.RESET: {
			return {
        ...state,
        ...{msg:"", status: -1},
			};
		}

	}

	return state;
}
