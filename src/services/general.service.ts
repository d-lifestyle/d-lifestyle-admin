import axios from "axios";
import { AxiosInstance } from "../utils";

class GeneralServices {
     public async GetCustomerContact() {
          return await AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/contact-me`);
     }
     public async MakeFavorite(id: string) {
          return await AxiosInstance.put(`${process.env.REACT_APP_BACKEND}/contact-me/${id}`);
     }
     public async DeleteCustomer(id: string) {
          return await AxiosInstance.delete(`${process.env.REACT_APP_BACKEND}/contact-me/${id}`);
     }
}

const GeneralService = new GeneralServices();

export default GeneralService;
