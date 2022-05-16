
import { LOGIN, LOGIN_ERROR } from "../actionTypes";
import { loginApi } from "../../../api/ApiService";



export const addLogInData = data => {
  return dispatch => {
    // dispatch (loadingAction (true));
    loginApi(data)
      .then(response => {
        // dispatch (loadingAction (false));
        if (response && response.status && response.status === 200) {

          dispatch({ type: LOGIN, payload: response });
        }
      })
      .catch(({ ...error }) => {
        dispatch({ type: LOGIN_ERROR, payload: error.response.data });
        // dispatch({ type: LOGIN_ERROR, payload: error.response });
        // dispatch (loadingAction (false));
        throw error;
      });
  };
};

