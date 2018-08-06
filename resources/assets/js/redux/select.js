
//redux for select forms
export const types = {
	STATUS:'STATUS',
};
export const actions = {
  //client status select form data
	status: () => {
		return {type: types.STATUS,payload:{status:{}}}
	}
}

// Initial state of the store
// all for all of the select data
//select for select form data as key value pairs id:value
const initialState = {
  status:{
    "0":"any progress",
    "new client":"new client",
    "app on progress":"app on progress",
    "Successfull":"Successfull"
  },
	serviceForm:[
    {
      value:"migration",
      label:"migration"
    },
    {
      value:"education",
      label:"education"
    }
	],
  statusForm: [
    {
      value:0,
      label:"any progress"
    },
    {
      value:"new client",
      label:"new client"
    },
    {
      value:"app on progress",
      label:"app on progress"
    },
    {
      value:"Successfull",
      label:"Successfull"
    }
  ],
  statusForm2: [
    {
      value:"new client",
      label:"new client"
    },
    {
      value:"app on progress",
      label:"app on progress"
    },
    {
      value:"Successfull",
      label:"Successfull"
    }
  ]
};


export const selectReducer = (state = initialState, action) => {
	return state;
}
