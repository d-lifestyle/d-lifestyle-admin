import axios from "axios";
import { LoginProps, UpdateProfileProps } from "../interface";
import { AxiosInstance } from "../utils";
axios.defaults.withCredentials = true;

class AuthServices {
     public async Login({ email, password }: LoginProps) {
          return AxiosInstance.post(`${process.env.REACT_APP_BACKEND}/login`, { email, password });
     }
     public async Logout() {
          return AxiosInstance.post(`${process.env.REACT_APP_BACKEND}/logout`, {});
     }
     public async Profile() {
          return AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/profile`);
     }
     public async UpdateAdminProfile({ data, id }: UpdateProfileProps) {
          return AxiosInstance.put(`${process.env.REACT_APP_BACKEND}/update-profile/${id}`, { ...data });
     }
}

const AuthService = new AuthServices();

export default AuthService;
