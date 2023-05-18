import axios from "axios";
import { NewCarouselProps, UpdateCarouselProps } from "../interface";
import { AxiosOptions } from "../utils";

class CarouselServices {
     public async GetCarousel() {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/carousel`, AxiosOptions);
     }

     public async GetCarouselById(id: string) {
          return await axios.get(`${process.env.REACT_APP_BACKEND}/carousel/${id}`, AxiosOptions);
     }
     public async AddCarousel(props: NewCarouselProps) {
          return await axios.post(
               `${process.env.REACT_APP_BACKEND}/carousel`,
               {
                    dataAlt: props.dataAlt,
                    dataImage: props.dataImage,
               },
               AxiosOptions
          );
     }

     public async UpdateCarouselById(props: UpdateCarouselProps) {
          return await axios.put(
               `${process.env.REACT_APP_BACKEND}/carousel/${props.id}`,
               {
                    dataImage: props.data.dataImage,
                    dataAlt: props.data.dataAlt,
               },
               AxiosOptions
          );
     }
     public async DeleteCarouselById(id: string) {
          return await axios.delete(`${process.env.REACT_APP_BACKEND}/carousel/${id}`, AxiosOptions);
     }
}

export default new CarouselServices();
