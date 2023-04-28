import axios from "axios";
import { AccommodationProps, UpdateAccommodationProps } from "../../interface";

class AccommodationServices {
     public async GetAccommodation() {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/accommodation`);
     }

     public async GetAccommodationById(id: string) {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/accommodation/${id}`);
     }
     public async AddAccommodation({ SubCategory, city, displayName, state }: AccommodationProps) {
          return await axios.post(`${process.env.REACT_APP_BACKEND}/accommodation`, {
               SubCategory,
               city,
               displayName,
               state,
          });
     }
     public async UpdateAccommodationById({ id, data }: UpdateAccommodationProps) {
          return await axios.put(`${process.env.REACT_APP_BACKEND}/accommodation/${id}`, {
               SubCategory: data.SubCategory,
               city: data.city,
               displayName: data.displayName,
               state: data.state,
          });
     }

     public async DeleteAccommodationById(id: string) {
          return await axios.delete(`${process.env.REACT_APP_BACKEND}/accommodation/${id}`, {});
     }
}

export default new AccommodationServices();
