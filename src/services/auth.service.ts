import axios from "axios";
import { LoginProps, UpdateProfileProps } from "../interface";
import { AxiosOptions } from "../utils";
axios.defaults.withCredentials = true;

class AuthServices {
     public async Login({ email, password }: LoginProps) {
          return axios.post(`${process.env.REACT_APP_BACKEND}/login`, { email, password }, AxiosOptions);
     }
     public async Logout() {
          return axios.post(`${process.env.REACT_APP_BACKEND}/logout`, {}, AxiosOptions);
     }
     public async Profile() {
          return axios.get(`${process.env.REACT_APP_BACKEND}/profile`, AxiosOptions);
     }
     public async UpdateAdminProfile({ data, id }: UpdateProfileProps) {
          return axios.put(`${process.env.REACT_APP_BACKEND}/update-profile/${id}`, { ...data }, AxiosOptions);
     }
}

const AuthService = new AuthServices();

export default AuthService;
