import axios from "axios";
import { NewToursTravelProps, UpdateToursTravelProps } from "../../interface";

class ToursTravelServices {
     public async GetToursTravel() {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/tours-travel`, {
               withCredentials: true,
          });
     }

     public async GetToursTravelById(id: string) {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/tours-travel/${id}`, {
               withCredentials: true,
          });
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
          return await axios.post(
               `${process.env.REACT_APP_BACKEND}/tours-travel/`,
               {
                    SubCategory,
                    code,
                    displayName,
                    duration,
                    place,
                    theme,
                    description,
                    image,
               },
               {
                    withCredentials: true,
               }
          );
     }
     public async UpdateToursTravelById({ data, id }: UpdateToursTravelProps) {
          return await axios.put(
               `${process.env.REACT_APP_BACKEND}/tours-travel/${id}`,
               {
                    SubCategory: data.SubCategory,
                    code: data.code,
                    displayName: data.displayName,
                    duration: data.duration,
                    place: data.place,
                    theme: data.theme,
                    description: data.description,
                    image: data.image,
               },
               {
                    withCredentials: true,
               }
          );
     }

     public async DeleteToursTravelById(id: string) {
          return await axios.delete(`${process.env.REACT_APP_BACKEND}/tours-travel/${id}`, {
               withCredentials: true,
          });
     }
}

export default new ToursTravelServices();
