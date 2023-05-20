import { object, string } from "yup";

export const CategoryValidationSchema = object().shape({
     name: string().required("category name is required"),
     parentCategory: string().required("please select parent category"),
});
