import axios from "axios";
import { LogOutAction } from "../redux";

export const getUser = () => {
     const data = JSON.parse(localStorage.getItem("token") as any);
     if (!data) {
          return null;
     }
     return data;
};

const data = getUser();
export const AxiosInstance = () => {
     if (data) {
          return axios.create({
               // withCredentials: true,
               baseURL: process.env.REACT_APP_BACKEND,
               headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                    Authorization: data,
               },
          });
     } else {
          return axios.create({
               // withCredentials: true,
               baseURL: process.env.REACT_APP_BACKEND,
          });
     }
};

export const AuthValidations = async ({ data, dispatch, navigate, Navigate }: any) => {
     if (data.payload === "token expired") {
          const data = await dispatch(LogOutAction());
          localStorage.removeItem("token");
          if (data.type === "auth/logout/fulfilled") {
               return navigate("/", { replace: true });
          } else if (data.type === "auth/logout/fulfilled") {
               return navigate("/", { replace: true });
          }
     }
};
