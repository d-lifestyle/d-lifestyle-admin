import { Box, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import React, { useCallback, useEffect } from "react";
import { LoginInitialValues, LoginValidationSchema } from "../../../validation";
import { GetAdminContentAction, GlobalLogin, LoginAction, useAppDispatch, useAuthSelector } from "../../../redux";
import { LoginProps } from "../../../interface";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { AppButton, AppInput } from "../../../component";
import { AuthValidations } from "../../../utils";

export const LoginPage = () => {
     const dispatch = useAppDispatch();
     const auth = useAuthSelector();
     const navigate = useNavigate();
     const content = useAuthSelector();
     const { palette } = useTheme();

     useEffect(() => {
          (async () => {
               dispatch(GetAdminContentAction());
          })();
     }, []);

     const LoginUser = useCallback(async (e: LoginProps) => {
          const data = await dispatch(LoginAction(e));
          if (data.type === "auth/login/fulfilled") {
               localStorage.setItem("token", JSON.stringify(data.payload.token));
               localStorage.setItem(
                    "user",
                    JSON.stringify({
                         email: data.payload.user.email,
                         password: data.payload.user.password,
                         firstName: data.payload.user.firstName,
                         lastName: data.payload.user.lastName,
                    })
               );
               dispatch(
                    GlobalLogin({
                         token: localStorage.getItem("token"),
                         user: localStorage.getItem("user"),
                    })
               );
               enqueueSnackbar(data.payload.message, { variant: "success" });
               return navigate("/", { replace: true });
          }
          if (data.type === "auth/login/rejected") {
               AuthValidations(data);
               return enqueueSnackbar(data.payload, { variant: "error" });
          }
     }, []);

     return (
          <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" height="100vh">
               <Box width="40%" p={2} border={`2px dashed ${palette.primary.main}`}>
                    <Box display="flex" justifyContent="center" flexDirection="column" alignItems="center">
                         <img src={content.content.aboutInfo.logo} alt="DLifeStyle" width="30%" />
                    </Box>
                    <Typography variant="caption">{auth.error}</Typography>
                    <Formik
                         enableReinitialize
                         initialValues={LoginInitialValues}
                         validationSchema={LoginValidationSchema}
                         onSubmit={LoginUser}
                    >
                         {({ handleBlur, handleChange, handleSubmit, errors, values, touched, isSubmitting }) => (
                              <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                                   <Box>
                                        <AppInput
                                             onChange={handleChange("email")}
                                             onBlur={handleBlur("email")}
                                             error={touched.email}
                                             helperText={touched.email && errors.email}
                                             value={values.email}
                                             label="Email address"
                                             size="small"
                                        />
                                   </Box>
                                   <Box mt={2}>
                                        <AppInput
                                             type="password"
                                             onChange={handleChange("password")}
                                             onBlur={handleBlur("password")}
                                             error={touched.password}
                                             helperText={touched.password && errors.password}
                                             value={values.password}
                                             label="Enter your security key"
                                             size="small"
                                        />
                                   </Box>
                                   <Box mt={2}>
                                        <AppButton fullWidth type="submit" disabled={isSubmitting}>
                                             {auth.loading ? "please wait" : "Go to dashboard"}
                                        </AppButton>
                                   </Box>
                              </form>
                         )}
                    </Formik>
               </Box>
          </Box>
     );
};
