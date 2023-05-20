import { AxiosInstance } from "../utils";

class EnquiryServices {
     public async GetAllEnquiry() {
          return AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/enquiry`);
     }
     public async MakeEnquiryFavorite(id: string) {
          return await AxiosInstance.put(`${process.env.REACT_APP_BACKEND}/enquiry/${id}`);
     }
     public async DeleteEnquiry(id: string) {
          return await AxiosInstance.delete(`${process.env.REACT_APP_BACKEND}/enquiry/${id}`);
     }
}

const EnquiryService = new EnquiryServices();
export default EnquiryService;
