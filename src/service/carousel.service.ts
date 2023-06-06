import { NewCarouselProps, UpdateCarouselProps } from "../interface";
import { AxiosInstance } from "../utils";

class CarouselServices {
     public async CarouselList() {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/carousel`);
     }
     public async CarouselListById(id: string) {
          return await AxiosInstance().get(`${process.env.REACT_APP_BACKEND}/carousel/${id}`);
     }

     public async UploadCarousel({ dataAlt, dataImage }: NewCarouselProps) {
          return await AxiosInstance().post(`${process.env.REACT_APP_BACKEND}/carousel/`, {
               dataAlt,
               dataImage,
          });
     }

     public async UpdateCarouselById({ data, id }: UpdateCarouselProps) {
          return await AxiosInstance().put(`${process.env.REACT_APP_BACKEND}/carousel/${id}`, {
               ...data,
          });
     }
     public async DeleteCarouselById(id: string) {
          return await AxiosInstance().delete(`${process.env.REACT_APP_BACKEND}/carousel/${id}`);
     }
}

const CarouselService = new CarouselServices();

export default CarouselService;
