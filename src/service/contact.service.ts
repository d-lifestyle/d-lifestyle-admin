import { AxiosInstance } from "../utils";

class ContactServices {
     public async GetContact() {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/contact-me`);
     }
     public async MakeFavoriteContact(id: string) {
          return await AxiosInstance().put(`${process.env.REACT_APP_BACKEND}/contact-me/${id}`);
     }
}

const ContactService = new ContactServices();
export default ContactService;
