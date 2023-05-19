import React from "react";

import { Grid, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import { LoginInitialValues, LoginValidationSchema } from "../../validation";
import { AppButton, AppInput } from "../../component";
import { useNavigate } from "react-router-dom";
import { LoginProps } from "../../interface";
import { useAuthSelector } from "../../features/slice";
import AuthService from "../../services/auth.service";
import { useAuth } from "../../context/auth.context";
import { enqueueSnackbar } from "notistack";

const Login = () => {
     const auth = useAuthSelector();
     const navigate = useNavigate();
     const { setAuthorization, setUser } = useAuth();

     const { spacing, shadows, palette } = useTheme();
     const LoginToAccount = async (e: LoginProps) => {
          try {
               const data = await AuthService.Login({ email: e.email, password: e.password });
               localStorage.setItem("token", JSON.stringify(await data.data.data.token));
               setUser(JSON.stringify(await data.data.data.token));
               setAuthorization(true);
               if (await data.data.success) {
                    enqueueSnackbar(await data.data.data, { variant: "success" });
                    navigate("/", { replace: true });
               } else {
                    navigate("/login", { replace: true });
               }
          } catch (err: any) {
               if (err.response) {
                    enqueueSnackbar(err.response.data.message, { variant: "error" });
               } else {
                    enqueueSnackbar(err.response.data.message, { variant: "error" });
               }
          }
     };
     return (
          <Box component="div" p={spacing(3)} height="100vh" display="flex" justifyContent="center" alignItems="center">
               <Grid container sm={12} spacing={3} alignItems="center">
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                         <Box
                              boxShadow={shadows[5]}
                              border={1}
                              borderColor={palette.grey[300]}
                              p={spacing(3)}
                              borderRadius={spacing(1.5)}
                         >
                              <img
                                   src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c747a562972803.5aa1729d2eaab.jpg"
                                   width={150}
                                   alt="logo"
                              />
                              <Typography variant="h3" sx={{ my: spacing(3) }}>
                                   Hi, Welcome Back
                              </Typography>
                              <img
                                   width="100%"
                                   src="https://minimals.cc/assets/illustrations/illustration_dashboard.png"
                                   alt=""
                              />
                         </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                         <Box display="flex" justifyContent="center" alignItems="center">
                              <Box>
                                   <Typography variant="h3">Sign in to DLifeStyle Admin Panel</Typography>

                                   {auth.error ? (
                                        <Typography variant="body2" mt={3} color="red" textTransform="uppercase">
                                             {auth.error}
                                        </Typography>
                                   ) : (
                                        <Typography variant="body1" color={palette.grey[500]} mt={spacing(3)}>
                                             Enter your details below
                                        </Typography>
                                   )}

                                   <Formik
                                        enableReinitialize
                                        initialValues={LoginInitialValues}
                                        validationSchema={LoginValidationSchema}
                                        onSubmit={LoginToAccount}
                                   >
                                        {({
                                             handleBlur,
                                             handleChange,
                                             errors,
                                             handleSubmit,
                                             values,
                                             touched,
                                             isSubmitting,
                                        }) => (
                                             <form onSubmit={handleSubmit}>
                                                  <AppInput
                                                       sx={{
                                                            marginTop: spacing(5),
                                                       }}
                                                       fullWidth
                                                       label="Enter address"
                                                       placeholder="E.g. abc@gmail.com"
                                                       onBlur={handleBlur("email")}
                                                       onChange={handleChange("email")}
                                                       value={values.email}
                                                       id="email"
                                                       name="email"
                                                       error={!values.email && touched.email}
                                                       helperText={touched.email && errors.email}
                                                  />
                                                  <AppInput
                                                       fullWidth
                                                       sx={{
                                                            marginTop: spacing(2),
                                                       }}
                                                       type="password"
                                                       label="Enter password"
                                                       placeholder="E.g. abc123"
                                                       onBlur={handleBlur("password")}
                                                       onChange={handleChange("password")}
                                                       value={values.password}
                                                       id="password"
                                                       name="password"
                                                       error={!values.password && touched.password}
                                                       helperText={touched.password && errors.password}
                                                  />
                                                  <AppButton
                                                       disabled={isSubmitting}
                                                       sx={{ mt: 3 }}
                                                       fullWidth
                                                       size="large"
                                                       type="submit"
                                                  >
                                                       {!isSubmitting ? "Login" : "please wait"}
                                                  </AppButton>
                                             </form>
                                        )}
                                   </Formik>
                              </Box>
                         </Box>
                    </Grid>
               </Grid>
          </Box>
     );
};

export default Login;
