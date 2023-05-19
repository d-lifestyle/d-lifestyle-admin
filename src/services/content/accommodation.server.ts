import axios from "axios";
import { AccommodationProps, UpdateAccommodationProps } from "../../interface";
import { AxiosInstance } from "../../utils";
axios.defaults.withCredentials = true;

class AccommodationServices {
     public async GetAccommodation() {
          return await AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/accommodation`);
     }

     public async GetAccommodationById(id: string) {
          return await AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/accommodation/${id}`);
     }
     public async AddAccommodation({ SubCategory, city, displayName, state, description, image }: AccommodationProps) {
          return await AxiosInstance.post(
               `${process.env.REACT_APP_BACKEND}/accommodation`,
               {
                    SubCategory,
                    city,
                    displayName,
                    state,
                    description,
                    image,
               },
               {
                    headers: {
                         Authorization: localStorage.getItem("token") as string,
                    },
               }
          );
     }
     public async UpdateAccommodationById({ id, data }: UpdateAccommodationProps) {
          return await AxiosInstance.put(`${process.env.REACT_APP_BACKEND}/accommodation/${id}`, {
               SubCategory: data.SubCategory,
               city: data.city,
               displayName: data.displayName,
               state: data.state,
               description: data.description,
               image: data.image,
          });
     }

     public async DeleteAccommodationById(id: string) {
          return await AxiosInstance.delete(`${process.env.REACT_APP_BACKEND}/accommodation/${id}`);
     }
}

export default new AccommodationServices();
