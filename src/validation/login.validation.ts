import * as yup from "yup";
import { LoginProps } from "../interface";

export const LoginInitialValues: LoginProps = {
     email: "teamviewer993@gmail.com",
     password: "abc123",
};

export const LoginValidationSchema = yup.object().shape({
     email: yup.string().email().required("Email is required"),
     password: yup.string().min(3).required("Password is required"),
});
