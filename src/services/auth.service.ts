import axios from "axios";
import { LoginProps } from "../interface";

class AuthServices {
     public async Login({ email, password }: LoginProps) {
          return axios.post(`${process.env.REACT_APP_BACKEND}/login`, { email, password }, { withCredentials: true });
     }
     public async Logout() {
          return axios.post(`${ process.env.REACT_APP_BACKEND }/logout`, {}, { withCredentials: true });
     }
     public async Profile() {
          return axios.get(`${process.env.REACT_APP_BACKEND}/profile`, { withCredentials: true });
     }
}

const AuthService = new AuthServices();

export default AuthService;
