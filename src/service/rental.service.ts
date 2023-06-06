import { RentalProps, UpdateRentalProps } from "../interface";
import { AxiosInstance } from "../utils";

class RentalServices {
     public async RentalList() {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/rental`);
     }

     public async RentalListById(id: string) {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/rental/${id}`);
     }
     public async RentalDeleteListById(id: string) {
          return await AxiosInstance().delete(`${process.env.REACT_APP_BACKEND}/rental/${id}`);
     }
     public async UploadRental(data: RentalProps) {
          return await AxiosInstance().post(`${process.env.REACT_APP_BACKEND}/rental`, {
               ...data,
          });
     }
     public async UpdateRentalById({ data, id }: UpdateRentalProps) {
          return await AxiosInstance().put(`${process.env.REACT_APP_BACKEND}/rental/${id}`, {
               ...data,
          });
     }
}

const RentalService = new RentalServices();

export default RentalService;
