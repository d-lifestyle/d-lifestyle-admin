import { Box, Typography } from "@mui/material";
import { Formik } from "formik";
import React, { useCallback } from "react";
import { LoginInitialValues, LoginValidationSchema } from "../../../validation";
import { GlobalLogin, LoginAction, useAppDispatch, useAuthSelector } from "../../../redux";
import { LoginProps } from "../../../interface";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { AppButton, AppInput } from "../../../component";

export const LoginPage = () => {
     const dispatch = useAppDispatch();
     const auth = useAuthSelector();
     const navigate = useNavigate();

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
               return enqueueSnackbar(data.payload, { variant: "error" });
          }
     }, []);

     return (
          <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" height="100vh">
               <Box width="40%" p={2} border="1px solid" display="flex" flexDirection="column" gap={3}>
                    <Typography variant="h6">Hello admin provide your information to login</Typography>
                    <Typography variant="caption">{auth.error}</Typography>

                    <Formik
                         enableReinitialize
                         initialValues={LoginInitialValues}
                         validationSchema={LoginValidationSchema}
                         onSubmit={LoginUser}
                    >
                         {({ handleBlur, handleChange, handleSubmit, errors, values, touched, isSubmitting }) => (
                              <form onSubmit={handleSubmit}>
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
