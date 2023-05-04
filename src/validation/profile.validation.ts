import * as yup from "yup";

export interface ProfileFormProps {
     email: string;
     password: string;
     firstName: string;
     lastName: string;
     address: string;
     phone: string;
     instaLink?: string;
     fbLink?: string;
     aboutText: string;
     logo: string;
     slogan?: string;
     support?: string;
     privacyPolicy: string;
     termsCondition: string;
}

export const InitialProfileForm: ProfileFormProps = {
     email: "",
     firstName: "",
     lastName: "",
     password: "",
     address: "",
     phone: "",
     fbLink: "",
     instaLink: "",
     aboutText: "",
     logo: "",
     slogan: "",
     support: "",
     privacyPolicy: "",
     termsCondition: "",
};

export const ProfileValidationSchema = yup.object().shape({
     email: yup.string().email().required(),
     firstName: yup.string().required(),
     lastName: yup.string().required(),
     password: yup.string().required(),
     address: yup.string().required(),
     phone: yup.string().required(),
     fbLink: yup.string().required(),
     instaLink: yup.string().required(),
     aboutText: yup.string().required(),
     logo: yup.string().required(),
     slogan: yup.string().required(),
     support: yup.string().required(),
     privacyPolicy: yup.string().required(),
     termsCondition: yup.string().required(),
});
