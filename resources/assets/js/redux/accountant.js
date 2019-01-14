export const types = {
	PAYMENT_STATUS:'PAYMENT_STATUS'
};
export const actions = {
	payment_status: () => {
		return {type: types.PAYMENT_STATUS}
	}
}

// Initial state of the store
// all for all of the employee data
//select for select form data as key value pairs id:value
const initialState = {
	selectStatus:[
                  {label:"unpaid",value:"unpaid"},
                  {label:"paid",value:"paid"},
                
                  {label:"Email Sent",value:"email_sent"},
                ],

};


export const accountantReducer = (state = initialState, action) => {

  const { type, payload } = action;

	switch(action.type){


		case types.PAYMENT_STATUS: {

			return {
				...state,
				...{selectStatus:payload.selectStatus}
			};

		}

	}

	return state;
}
