import { GENERATE_TOKEN } from "../actionTypes";
import { generateTokenApi } from "../../../api/ApiService";


export const generateTokenData = () => {
  return new Promise((resolve, reject) => {
    return async (dispatch) => {
      const response = await generateTokenApi()
        .then(response => {

        })
        .catch(({ ...error }) => {
          dispatch({ type: GENERATE_TOKEN, payload: error.response.data });
          reject(error)
        });
    };
  })
};

