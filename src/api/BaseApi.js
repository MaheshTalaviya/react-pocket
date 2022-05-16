import axios from "axios";
import store from "../redux/store/store";

//const baseURL = "http://104.248.123.252:2020/api/v1/";
const baseURL = "https://api.pocketi.io/api/v1/";
//const baseURL = "http://localhost:2020/api/v1/";


export const axiosObj = (isSendRefreshToken) => {
  const data = store.getState();
  const accessToken = data.loginData?.loginSuccesData?.accessToken
  const refreshToken = data.loginData?.loginSuccesData?.refreshToken

  let token = accessToken;
  if (isSendRefreshToken) {
    token = refreshToken;
  }
  
  const BaseApi = axios.create({
    baseURL: baseURL,
    // timeout: 1000,
    headers: {
      'x-api-key': 'dd52ea2d-4567-4956-9d19-35a7e75a2c17',
      'platform': 'web',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,

    },

  });
  return BaseApi;
}
