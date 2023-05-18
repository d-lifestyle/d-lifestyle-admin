import axios from "axios";

class AdminServices {
     public async GetAllUsers() {
          return axios.get(`${process.env.REACT_APP_BACKEND}/my-user`, {
               withCredentials: true,
               headers: {
                    "Access-Control-Allow-Credentials": true,
               },
          });
     }
     public async DeleteUserAdmin(id: string) {
          return axios.delete(`${process.env.REACT_APP_BACKEND}/my-user/${id}`, {
               withCredentials: true,
               headers: {
                    "Access-Control-Allow-Credentials": true,
               },
          });
     }
}

const AdminService = new AdminServices();

export default AdminService;
