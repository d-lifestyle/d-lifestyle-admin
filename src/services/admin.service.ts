import axios from "axios";
import { AxiosInstance } from "../utils";

axios.defaults.withCredentials = true;

class AdminServices {
     public async GetAllUsers() {
          return await AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/my-user`);
     }
     public async DeleteUserAdmin(id: string) {
          return await AxiosInstance.delete(`${process.env.REACT_APP_BACKEND}/my-user/${id}`);
     }
}

const AdminService = new AdminServices();

export default AdminService;
