import { object, string } from "yup";

export const SubCategoryValidationSchema = object().shape({
     displayName: string().required("category name is required"),
     CategoryId: string().required("please select normal category"),
});
