import * as yup from "yup";

export const BlogValidationSchema = yup.object().shape({
     label: yup.string().required("please enter blog title"),
     images: yup.string().required("please enter blog image URL"),
     body: yup.string().required("please enter blog description"),
});
