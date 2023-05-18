import axios from "axios";
import { NewCarouselProps, UpdateCarouselProps } from "../interface";
import { AxiosInstance, AxiosOptions } from "../utils";
axios.defaults.withCredentials = true;

class CarouselServices {
     public async GetCarousel() {
          return await AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/carousel`);
     }

     public async GetCarouselById(id: string) {
          return await AxiosInstance.get(`${process.env.REACT_APP_BACKEND}/carousel/${id}`);
     }
     public async AddCarousel(props: NewCarouselProps) {
          return await AxiosInstance.post(`${process.env.REACT_APP_BACKEND}/carousel`, {
               dataAlt: props.dataAlt,
               dataImage: props.dataImage,
          });
     }

     public async UpdateCarouselById(props: UpdateCarouselProps) {
          return await AxiosInstance.put(`${process.env.REACT_APP_BACKEND}/carousel/${props.id}`, {
               dataImage: props.data.dataImage,
               dataAlt: props.data.dataAlt,
          });
     }
     public async DeleteCarouselById(id: string) {
          return await AxiosInstance.delete(`${process.env.REACT_APP_BACKEND}/carousel/${id}`);
     }
}

export default new CarouselServices();
