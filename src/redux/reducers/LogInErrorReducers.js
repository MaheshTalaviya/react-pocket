import { LOGIN_ERROR, } from "../action/actionTypes";
const initialState = {

  loginErrorData: {},

}
const loginErrorData = (state = initialState, action) => {
  switch (action.type) {

    case LOGIN_ERROR:
      return {
        ...state, // not value lose
        loginErrorData: action.payload,
      };

    default:
      return state
  }
}




export default loginErrorData;