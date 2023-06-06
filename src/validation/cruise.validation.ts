import * as yup from "yup";

export const CruiseValidationSchema = yup.object().shape({
     image: yup.string().required("please enter image URL"),
     displayName: yup.string().required("please enter cruise name"),
     itinerary: yup.string().required("please enter itinerary"),
     sailingType: yup.string().required("please enter sailing type"),
     from: yup.string().required("please enter departure from"),
     to: yup.string().required("please enter departure to"),
     description: yup.string().required("please enter cruise description"),
     SubCategory: yup.string().required("please select sub category"),
});
