import { AxiosInstance } from "../utils";

class ContactServices {
     public async GetContact() {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/contact-me`);
     }
}

const ContactService = new ContactServices();
export default ContactService;
