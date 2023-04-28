import { CarouselProps } from "../interface";
import * as yup from "yup";

export const CarouselInitial: CarouselProps = {
     dataAlt: "",
     dataImage: "",
};

export const CarouselValidateSchema = yup.object().shape({
     dataAlt: yup.string().required("image title is required"),
     dataImage: yup.string().required("image is required"),
});
