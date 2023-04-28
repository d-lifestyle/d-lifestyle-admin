import React, { useEffect } from "react";
import { DefaultLayout } from "../../../layout";
import { AppButton, AppInput, AppTitleBar } from "../../../component";
import { Box, Grid, useTheme } from "@mui/material";
import { Formik } from "formik";
import { InitialMainCategory, ValidationMainCategory } from "../../../validation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../features";
import { AddNewMainCategory, GetAllMainCategory } from "../../../features/action";
import { NewMainCategoryProps } from "../../../interface";
import { useNavigate } from "react-router-dom";

export const AddMainCategory = () => {
     const dispatch = useDispatch<AppDispatch>();
     const { palette } = useTheme();
     const navigate = useNavigate();

     useEffect(() => {
          (() => {})();
     }, [dispatch]);

     const NewMainCategory = async (e: NewMainCategoryProps) => {
          await dispatch(AddNewMainCategory(e));
          await dispatch(GetAllMainCategory());
          navigate("/manage/main-category", { replace: true });
     };

     return (
          <DefaultLayout pagetitle="AddCategory main category">
               <AppTitleBar
                    title="create main Category"
                    breadcrubms={[
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "home",
                         },
                         {
                              pagepath: "/content/manage",
                              activepage: false,
                              activetitle: "create",
                         },
                         {
                              pagepath: "/add/main-category",
                              activepage: true,
                              activetitle: "create parent category",
                         },
                    ]}
               />
               <Box width="60%" border={`2px solid ${palette.grey[400]}`} p={3} margin="auto" borderRadius={1} mt={5}>
                    <Formik
                         initialValues={InitialMainCategory}
                         validationSchema={ValidationMainCategory}
                         onSubmit={NewMainCategory}
                    >
                         {({ handleBlur, handleChange, handleSubmit, errors, values, touched }) => (
                              <form onSubmit={handleSubmit}>
                                   <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                                             <Box>
                                                  <AppInput
                                                       label="Enter main category name"
                                                       value={values?.displayName}
                                                       onChange={handleChange("displayName")}
                                                       onBlur={handleBlur("displayName")}
                                                       helperText={!touched.displayName && errors.displayName}
                                                       error={!values.displayName && touched.displayName}
                                                  />
                                             </Box>
                                        </Grid>
                                   </Grid>
                                   <Box display="flex" flexDirection="row" gap={3} mt={3}>
                                        <AppButton
                                             fullWidth
                                             variant="text"
                                             color="error"
                                             type="button"
                                             onClick={() => navigate(-1)}
                                        >
                                             back
                                        </AppButton>
                                        <AppButton size="large" fullWidth type="button" onClick={() => handleSubmit()}>
                                             Submit
                                        </AppButton>
                                   </Box>
                              </form>
                         )}
                    </Formik>
               </Box>
          </DefaultLayout>
     );
};
