import { AxiosInstance } from "../utils";
import { CruisePackageProps, UpdateCruiseProps } from "../interface";

class CruiseServices {
     public async CruiseList() {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/cruise`);
     }

     public async CruiseListById(id: string) {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/cruise/${id}`);
     }
     public async DeleteCruiseListById(id: string) {
          return await AxiosInstance().delete(`${process.env.REACT_APP_BACKEND}/cruise/${id}`);
     }
     public async UploadCruise({
          SubCategory,
          departure,
          description,
          displayName,
          image,
          itinerary,
          sailingType,
     }: CruisePackageProps) {
          return await AxiosInstance().post(`${process.env.REACT_APP_BACKEND}/cruise`, {
               SubCategory,
               departure,
               description,
               displayName,
               image,
               itinerary,
               sailingType,
          });
     }
     public async UpdateCruiseById({ data, id }: UpdateCruiseProps) {
          return await AxiosInstance().put(`${process.env.REACT_APP_BACKEND}/cruise/${id}`, { ...data });
     }
     public async DeleteCruiseById(id: string) {
          return await AxiosInstance().delete(`${process.env.REACT_APP_BACKEND}/cruise/${id}`);
     }
}

const CruiseService = new CruiseServices();

export default CruiseService;
