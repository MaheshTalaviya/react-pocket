
import { LOGIN, LOGIN_ERROR, GENERATE_TOKEN, LOGOUT } from "../action/actionTypes";
const initialState = {
  loginSuccesData: {},
  loginErrorData: {},
  GenerateTokenData: {},
  accessToken: {}
}
const loginData = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      let accessToken = action?.payload?.data?.data?.accessToken
      return {
        ...state, // not value lose
        loginSuccesData: action?.payload?.data?.data,
        accessToken: accessToken,
        loginErrorData: {}
      };
    case LOGIN_ERROR:
      return {
        ...state, // not value lose
        loginErrorData: action.payload,
      };
    case LOGOUT:
      console.log('logout call')
      return {
        initialState
      };

    case GENERATE_TOKEN:
      // console.log("*********************************", action.payload, "$$$$$$$$$$$$", state)
      if (action?.payload?.data?.token?.accessToken) {
        let loginData = state.loginSuccesData;
        loginData.accessToken = action.payload.data.token.accessToken
        loginData.accessTokenExpiry = action.payload.data.token.accessTokenExpiry
        return {
          ...state, // not value lose
          loginSuccesData: loginData,
          accessToken: action.payload,

        };
      } else return state
    default:
      return state
  }
}




export default loginData;