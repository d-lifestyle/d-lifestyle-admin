import axios from "axios";
import { LoginProps, UpdateProfileProps } from "../interface";

class AuthServices {
     public async Login({ email, password }: LoginProps) {
          return axios.post(
               `${process.env.REACT_APP_BACKEND}/login`,
               { email, password },
               {
                    withCredentials: true,
                    headers: {
                         "Access-Control-Allow-Credentials": true,
                    },
               }
          );
     }
     public async Logout() {
          return axios.post(
               `${process.env.REACT_APP_BACKEND}/logout`,
               {},
               {
                    withCredentials: true,
                    headers: {
                         "Access-Control-Allow-Credentials": true,
                    },
               }
          );
     }
     public async Profile() {
          return axios.get(`${process.env.REACT_APP_BACKEND}/profile`, {
               withCredentials: true,
               headers: {
                    "Access-Control-Allow-Credentials": true,
               },
          });
     }
     public async UpdateAdminProfile({ data, id }: UpdateProfileProps) {
          return axios.put(
               `${process.env.REACT_APP_BACKEND}/update-profile/${id}`,
               { ...data },
               {
                    withCredentials: true,
                    headers: {
                         "Access-Control-Allow-Credentials": true,
                    },
               }
          );
     }
}

const AuthService = new AuthServices();

export default AuthService;
