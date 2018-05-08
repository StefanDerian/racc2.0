export const types = {
	LOGIN:'LOGIN',
	LOGOUT:'LOGOUT',

};


export const actions = {
	login: () => {
		return {type: types.LOGIN}
	},
  logout: () => {
		return {type: types.LOGOUT}
	}
}

// Initial state of the store
const initialState = {
	isLoggedIn:false
};


export const authReducer = (state = initialState, action) => {

	switch(action.type){

		case types.LOGIN: {
			return {
				...state,
				isLoggedIn: true,

			};
		}
		//can be used to read one data or all data
		case types.LOGOUT: {
			return {
        ...state,
        isLoggedIn: false,
			};
		}

	}

	return state;
}
