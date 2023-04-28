import React from "react";

import { Grid, Box, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import { AppButton, AppInput } from "../../default";

export interface GeneralPanelProps {
     ProfileInitialValues: any;
     ProfileValidationSchema: any;
     AdminProfileUpdate: any;
     onDrop: any;
     useDropzone: any;
}

export const GeneralPanel: React.FC<GeneralPanelProps> = ({
     ProfileInitialValues,
     AdminProfileUpdate,
     ProfileValidationSchema,
     // onDrop,
     // useDropzone,
}) => {
     const { spacing, palette, shadows } = useTheme();
     // const { getRootProps, getInputProps, isDragActive } = useDropzone({
     //      onDrop,
     // });
     return (
          <Formik
               initialValues={ProfileInitialValues}
               validationSchema={ProfileValidationSchema}
               onSubmit={AdminProfileUpdate}
          >
               {({
                    errors,
                    touched,
                    values,
                    handleBlur,
                    handleChange,
                    handleSubmit,
               }) => (
                    <form onSubmit={handleSubmit}>
                         <Grid container sm={12} spacing={3}>
                              <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                   <Box
                                        boxShadow={shadows[5]}
                                        p={3}
                                        borderRadius={spacing(1.5)}
                                        height={300}
                                        display="flex"
                                        flexDirection="column"
                                        justifyContent="center"
                                        alignItems="center"
                                   >
                                        {/* <Box
                                             border={1}
                                             sx={{
                                                  borderStyle: "dashed",
                                                  cursor: "pointer",
                                             }}
                                             borderColor={palette.primary.main}
                                             borderRadius={spacing(1.5)}
                                             height={100}
                                             display="flex"
                                             justifyContent="center"
                                             alignItems="center"
                                             {...getRootProps()}
                                        >
                                             <input
                                                  type="file"
                                                  accept="image/png, image/gif, image/jpeg"
                                                  {...getInputProps()}
                                             />
                                             {isDragActive ? (
                                                  <p>Drop the files here ...</p>
                                             ) : (
                                                  <Typography
                                                       align="center"
                                                       variant="body1"
                                                       color={palette.grey[500]}
                                                  >
                                                       Drag 'n' drop some files
                                                       here, or click to select
                                                       files
                                                  </Typography>
                                             )}
                                        </Box> */}
                                        <img
                                             src="https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png"
                                             width={125}
                                             style={{
                                                  borderRadius: "100%",
                                                  border: `1px dashed grey`,
                                             }}
                                             alt="user_profile"
                                        />
                                        <Typography
                                             align="center"
                                             variant="caption"
                                             color={palette.grey[400]}
                                             mt={spacing(3)}
                                        >
                                             Allowed *.jpeg, *.jpg, *.png, *.gif
                                             max size of 3.1 MB
                                        </Typography>
                                   </Box>
                              </Grid>
                              <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                                   <Box
                                        boxShadow={shadows[5]}
                                        p={3}
                                        borderRadius={spacing(1.5)}
                                   >
                                        <Grid container spacing={3}>
                                             <Grid
                                                  item
                                                  xs={12}
                                                  sm={12}
                                                  md={6}
                                                  lg={6}
                                                  xl={6}
                                             >
                                                  <AppInput
                                                       type="text"
                                                       label="Firstname"
                                                       onChange={handleChange(
                                                            "firstname"
                                                       )}
                                                       onBlur={handleBlur(
                                                            "firstname"
                                                       )}
                                                       id="firstname"
                                                       name="firstname"
                                                       placeholder="E.g. Jhon"
                                                       value={values.firstname}
                                                       error={
                                                            touched.firstname as boolean
                                                       }
                                                       helperText={
                                                            touched.firstname &&
                                                            errors.firstname
                                                       }
                                                  />
                                             </Grid>
                                             <Grid
                                                  item
                                                  xs={12}
                                                  sm={12}
                                                  md={6}
                                                  lg={6}
                                                  xl={6}
                                             >
                                                  <AppInput
                                                       type="text"
                                                       onChange={handleChange(
                                                            "lastname"
                                                       )}
                                                       onBlur={handleBlur(
                                                            "lastname"
                                                       )}
                                                       id="lastname"
                                                       name="lastname"
                                                       label="Lastname"
                                                       placeholder="E.g. Doe"
                                                       value={values.lastname}
                                                       error={
                                                            touched.lastname as boolean
                                                       }
                                                       helperText={
                                                            touched.lastname &&
                                                            errors.lastname
                                                       }
                                                  />
                                             </Grid>
                                        </Grid>
                                        <Box my={spacing(3)}>
                                             <AppInput
                                                  type="email"
                                                  onChange={handleChange(
                                                       "email"
                                                  )}
                                                  onBlur={handleBlur("email")}
                                                  id="email"
                                                  name="email"
                                                  label="Email address"
                                                  placeholder="E.g. abc@google.com"
                                                  value={values.email}
                                                  error={
                                                       touched.email as boolean
                                                  }
                                                  helperText={
                                                       touched.email &&
                                                       errors.email
                                                  }
                                             />
                                        </Box>
                                        <Box>
                                             <AppInput
                                                  type="number"
                                                  onChange={handleChange(
                                                       "phone"
                                                  )}
                                                  onBlur={handleBlur("phone")}
                                                  id="phone"
                                                  name="phone"
                                                  label="Phone Number"
                                                  placeholder="E.g. (without +91) 1234567890"
                                                  value={values.phone}
                                                  error={
                                                       touched.phone as boolean
                                                  }
                                                  helperText={
                                                       touched.phone &&
                                                       errors.phone
                                                  }
                                             />
                                        </Box>

                                        <Box
                                             display="flex"
                                             justifyContent="flex-end"
                                             mt={spacing(3)}
                                        >
                                             <AppButton type="submit">
                                                  save changes
                                             </AppButton>
                                        </Box>
                                   </Box>
                              </Grid>
                         </Grid>
                    </form>
               )}
          </Formik>
     );
};
