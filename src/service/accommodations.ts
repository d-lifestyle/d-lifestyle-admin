import { AxiosInstance } from "../utils";
import { AccommodationProps, UpdateAccommodationProps } from "../interface";

class AccommodationServices {
     public async AccommodationList() {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/accommodation`);
     }

     public async AccommodationListById(id: string) {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/accommodation/${id}`);
     }
     public async DeleteListById(id: string) {
          return await AxiosInstance().delete(`${process.env.REACT_APP_BACKEND}/accommodation/${id}`);
     }
     public async UploadAccommodation(data: AccommodationProps) {
          return await AxiosInstance().post(`${process.env.REACT_APP_BACKEND}/accommodation`, {
               ...data,
          });
     }
     public async UpdateAccommodationById({ data, id }: UpdateAccommodationProps) {
          return await AxiosInstance().put(`${process.env.REACT_APP_BACKEND}/accommodation/${id}`, {
               ...data,
          });
     }
}

const AccommodationService = new AccommodationServices();

export default AccommodationService;
