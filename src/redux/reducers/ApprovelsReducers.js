import {GET_ALL_APPROVELS_API } from "../action/actionTypes";
const initialState = {
  ApprovelsListData:{}
}
const ApprovelsData = (state = initialState, action) => {

  switch (action.type) {
    case GET_ALL_APPROVELS_API:
      return {
        ...state, // not value lose
        ApprovelsListData: action.payload,

      };
    
    default:
      return state
  }
}

export default ApprovelsData;
