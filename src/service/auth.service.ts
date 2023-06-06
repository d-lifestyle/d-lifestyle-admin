import { LoginProps } from "../interface";
import { AxiosInstance } from "../utils";

class AuthServices {
     public async Login(data: LoginProps) {
          return await AxiosInstance().post(`${process.env.REACT_APP_BACKEND}/login`, {
               email: data.email,
               password: data.password,
          });
     }

     public async Logout() {
          return await AxiosInstance().post(`${process.env.REACT_APP_BACKEND}/logout`);
     }
}

const AuthService = new AuthServices();

export default AuthService;
