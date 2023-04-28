import { useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React from "react";
import { AppButton, AppInput } from "../../default";

export interface PasswordPanelProps {
     initialValues: any;
     validationSchema: any;
     onSubmit: any;
}

export const PasswordPanel: React.FC<PasswordPanelProps> = ({
     initialValues,
     onSubmit,
     validationSchema,
}) => {
     const { shadows, spacing } = useTheme();
     return (
          <Box
               boxShadow={shadows[10]}
               p={spacing(3)}
               borderRadius={spacing(1.5)}
          >
               <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
               >
                    {({
                         errors,
                         values,
                         touched,
                         handleBlur,
                         handleChange,
                         handleSubmit,
                    }) => (
                         <form onSubmit={handleSubmit}>
                              <AppInput
                                   type="password"
                                   label="Your old password"
                                   name="old_password"
                                   id="old_password"
                                   onBlur={handleBlur("old_password")}
                                   onChange={handleChange("old_password")}
                                   value={values.old_password}
                                   error={touched.old_password as boolean}
                                   helperText={
                                        touched.old_password &&
                                        errors.old_password
                                   }
                              />
                              <AppInput
                                   type="password"
                                   label="New password"
                                   name="new_password"
                                   id="new_password"
                                   onBlur={handleBlur("new_password")}
                                   onChange={handleChange("new_password")}
                                   value={values.new_password}
                                   error={touched.new_password as boolean}
                                   helperText={
                                        touched.new_password &&
                                        errors.new_password
                                   }
                                   sx={{
                                        marginTop: spacing(2),
                                        marginBottom: spacing(2),
                                   }}
                              />
                              <AppInput
                                   type="password"
                                   label="Confirm new password"
                                   name="c_password"
                                   id="c_password"
                                   onBlur={handleBlur("c_password")}
                                   onChange={handleChange("c_password")}
                                   value={values.c_password}
                                   error={touched.c_password as boolean}
                                   helperText={
                                        touched.c_password && errors.c_password
                                   }
                              />
                              <Box
                                   display="flex"
                                   justifyContent="flex-end"
                                   my={spacing(2)}
                              >
                                   <AppButton type="submit">
                                        save changes
                                   </AppButton>
                              </Box>
                         </form>
                    )}
               </Formik>
          </Box>
     );
};
