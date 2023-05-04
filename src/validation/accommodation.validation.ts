import * as yup from "yup";
import { NewAccommodationProps } from "../interface";

export interface NewAccommodationFormProps {
     city: string;
     description: string;
     displayName: string;
     image: string;
     title: string;
     state: string;
     SubCategory: string;
}

export const InitialAccommodationValues: NewAccommodationFormProps = {
     city: "",
     description: "",
     displayName: "",
     image: "",
     state: "",
     SubCategory: "",
     title: "",
};

export const AccommodationValidationSchema = yup.object().shape({
     city: yup.string().required(),
     description: yup.string().required(),
     displayName: yup.string().required(),
     image: yup.string().required(),
     moreItems: yup.string().required(),
     state: yup.string().required(),
     SubCategory: yup.string().required(),
});
