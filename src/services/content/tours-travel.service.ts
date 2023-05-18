import axios from "axios";
import { NewToursTravelProps, UpdateToursTravelProps } from "../../interface";
import { AxiosInstance } from "../../utils";
axios.defaults.withCredentials = true;

class ToursTravelServices {
     public async GetToursTravel() {
          return await AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/tours-travel`);
     }

     public async GetToursTravelById(id: string) {
          return await AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/tours-travel/${id}`);
     }
     public async AddToursTravel({
          SubCategory,
          code,
          displayName,
          duration,
          place,
          theme,
          description,
          image,
     }: NewToursTravelProps) {
          console.log(image);
          return await AxiosInstance.post(`${process.env.REACT_APP_BACKEND}/tours-travel/`, {
               SubCategory,
               code,
               displayName,
               duration,
               place,
               theme,
               description,
               image,
          });
     }
     public async UpdateToursTravelById({ data, id }: UpdateToursTravelProps) {
          return await AxiosInstance.put(`${process.env.REACT_APP_BACKEND}/tours-travel/${id}`, {
               SubCategory: data.SubCategory,
               code: data.code,
               displayName: data.displayName,
               duration: data.duration,
               place: data.place,
               theme: data.theme,
               description: data.description,
               image: data.image,
          });
     }

     public async DeleteToursTravelById(id: string) {
          return await AxiosInstance.delete(`${process.env.REACT_APP_BACKEND}/tours-travel/${id}`);
     }
}

export default new ToursTravelServices();
