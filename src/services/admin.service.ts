import axios from "axios";

class AdminServices {
     public async GetAllUsers() {
          return axios.get(`${process.env.REACT_APP_BACKEND}/my-user`, { withCredentials: true });
     }
     public async DeleteUserAdmin(id: string) {
          return axios.delete(`${process.env.REACT_APP_BACKEND}/my-user/${id}`, { withCredentials: true });
     }
}

const AdminService = new AdminServices();

export default AdminService;
