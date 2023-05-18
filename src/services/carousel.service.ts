import axios from "axios";
import { NewCarouselProps, UpdateCarouselProps } from "../interface";

class CarouselServices {
     public async GetCarousel() {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/carousel`, {
               withCredentials: true,
               headers: {
                    "Access-Control-Allow-Credentials": true,
               },
          });
     }

     public async GetCarouselById(id: string) {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/carousel/${id}`, {
               withCredentials: true,
               headers: {
                    "Access-Control-Allow-Credentials": true,
               },
          });
     }
     public async AddCarousel(props: NewCarouselProps) {
          return await axios.post(
               `${process.env.REACT_APP_BACKEND}/carousel`,
               {
                    dataAlt: props.dataAlt,
                    dataImage: props.dataImage,
               },
               {
                    withCredentials: true,
                    headers: {
                         "Access-Control-Allow-Credentials": true,
                    },
               }
          );
     }

     public async UpdateCarouselById(props: UpdateCarouselProps) {
          return await axios.put(
               `${process.env.REACT_APP_BACKEND}/carousel/${props.id}`,
               {
                    dataImage: props.data.dataImage,
                    dataAlt: props.data.dataAlt,
               },
               {
                    withCredentials: true,
                    headers: {
                         "Access-Control-Allow-Credentials": true,
                    },
               }
          );
     }
     public async DeleteCarouselById(id: string) {
          return await axios.delete(`${process.env.REACT_APP_BACKEND}/carousel/${id}`, {
               withCredentials: true,
               headers: {
                    "Access-Control-Allow-Credentials": true,
               },
          });
     }
}

export default new CarouselServices();
