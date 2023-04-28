import { MainCategoryProps } from "../interface";
import * as yup from "yup";
export const InitialMainCategory: MainCategoryProps = {
     displayName: "",
};

export const ValidationMainCategory = yup.object().shape({
     displayName: yup.string().required("please enter title"),
});
