import axios from "axios";
import { AxiosInstance, AxiosOptions } from "../utils";

axios.defaults.withCredentials = true;

class AdminServices {
     public async GetAllUsers() {
          return AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/my-user`);
     }
     public async DeleteUserAdmin(id: string) {
          return AxiosInstance.delete(`${process.env.REACT_APP_BACKEND}/my-user/${id}`);
     }
}

const AdminService = new AdminServices();

export default AdminService;
