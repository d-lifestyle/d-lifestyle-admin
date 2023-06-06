import * as yup from "yup";

export interface NewToursTravelFormProps {
     displayName: string;
     code: string;
     duration: string;
     place: string;
     theme: string;
     SubCategory: string;
     description: string;
}

export const ToursTravelValidationSchema = yup.object().shape({
     displayName: yup.string().required("package name is required"),
     code: yup.string().required("package code is required"),
     duration: yup.string().required("package duration is require"),
     place: yup.string().required("package location is required"),
     theme: yup.string().required("package theme is required"),
     SubCategory: yup.string().required("package sub category is required"),
     description: yup.string().required("package description is required"),
});
