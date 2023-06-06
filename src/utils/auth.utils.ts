import axios from "axios";

export const getUser = () => {
     const data = JSON.parse(localStorage.getItem("token") as any);
     if (!data) {
          return null;
     }
     return data;
};

const data = getUser();
export const AxiosInstance = () => {
     if (data.length) {
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
