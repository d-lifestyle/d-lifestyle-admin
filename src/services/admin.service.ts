import axios from "axios";
import { AxiosOptions } from "../utils";

axios.defaults.withCredentials = true;

class AdminServices {
     public async GetAllUsers() {
          return axios.get(`${process.env.REACT_APP_BACKEND}/my-user`, AxiosOptions);
     }
     public async DeleteUserAdmin(id: string) {
          return axios.delete(`${process.env.REACT_APP_BACKEND}/my-user/${id}`, AxiosOptions);
     }
}

const AdminService = new AdminServices();

export default AdminService;
