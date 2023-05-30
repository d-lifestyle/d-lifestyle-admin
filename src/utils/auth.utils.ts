import axios from "axios";
import AuthService from "../services/auth.service";

export const getUser = () => {
  const data = JSON.parse(localStorage.getItem("token") as string)
  if (!data) {
    return null;
  }
  return data;
};

export const logOutUser = async () => {
  try {
    localStorage.removeItem("token");
    const data = await AuthService.Logout();
    return data.data;
  } catch (err: any) {
    if (err.response) {
      if (err.response.status === 403) {
        return 403;
      }
      return err.response.data.message;
    } else {
      return err.message;
    }
  }
};

const data = getUser()
export const AxiosInstance = axios.create({
  // withCredentials: true,
  baseURL: process.env.REACT_APP_BACKEND,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    Authorization: data?.length && data,
  },
});
