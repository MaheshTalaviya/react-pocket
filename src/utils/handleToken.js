import store from "../redux/store/store";
import { generateTokenApi } from "../api/ApiService";

export const validateToken = async () => {

  const data1 = store.getState();
  const accessTokenExpiry = data1.loginData?.loginSuccesData?.accessTokenExpiry
  const currentTime = Math.floor(new Date().getTime() / 1000);
  const checkt = currentTime - 60;
  if (currentTime > accessTokenExpiry) {
    const response = await generateTokenApi();
    if (response?.response?.statusText === "Unauthorized") {
      window.location.href = "/"
    }
    return response;
  } else {
    return null;
  }
}