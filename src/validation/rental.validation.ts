import { object, string } from "yup";

export interface NewRentalFormProps {
     carRentalName: string;

     peopleAllowed: string;
     to: string;
     from: string;

     options: "self" | "driver" | "chauffeur";
     SubCategory: any;
}

export const InitialRentalValues: NewRentalFormProps = {
     carRentalName: "",
     from: "",
     to: "",
     options: "self",
     peopleAllowed: "",
     SubCategory: "",
};

export const RentalValidationSchema = object().shape({
     carRentalName: string().required("car name is required"),
     from: string().required("location from is required"),
     to: string().required("location to is required"),
     options: string().required("car option is required"),
     peopleAllowed: string().required("people allowed in car is required"),
     SubCategory: string().required("sub category is required"),
});
