export const types = {
	ALL:'ALL',
};
export const actions = {
	all: (employeeData) => {
		return {type: types.ALL,payload:{employeeData:employeeData}}
	}
}

// Initial state of the store
// all for all of the employee data
//select for select form data as key value pairs id:value
const initialState = {
	all: [],
  select:{},
	selectForm:[],
	selectForm2:[],//without 0 value
};


export const employeeReducer = (state = initialState, action) => {

  const { type, payload } = action;

	switch(action.type){

		case types.ALL: {
			//for select data in the bootstrap table
      var selectData = {}
			//for select form options
			var selectForm = [{label:"any Consultant",value:0}]
			//without 0 value
			var selectForm2 = []
      for (let employee of payload.employeeData) {
        selectData[employee.UserID] = employee.DisplayName
				selectForm.push({label:employee.DisplayName,value:employee.UserID})
				selectForm2.push({label:employee.DisplayName,value:employee.UserID})
      }


			return {
				...state,
				...{all:payload.employeeData,select:selectData,selectForm:selectForm,selectForm2:selectForm2}

			};
		}


	}

	return state;
}
