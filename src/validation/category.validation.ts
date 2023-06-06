import { object, string } from "yup";

export const CategoryValidationSchema = object().shape({
     displayName: string().required("category name is required"),
});
