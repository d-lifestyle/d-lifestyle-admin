import React, { useEffect } from "react";
import { DefaultLayout } from "../../../layout";
import { AppButton, AppInput, AppTitleBar } from "../../../component";
import { Box, Grid, useTheme } from "@mui/material";
import { Formik } from "formik";
import { InitialMainCategory, ValidationMainCategory } from "../../../validation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../features";
import {
     AddNewMainCategory,
     GetAllMainCategory,
     GetMainCategoryWithId,
     UpdateMainCategoryById,
} from "../../../features/action";
import { NewMainCategoryProps } from "../../../interface";
import { useNavigate, useParams } from "react-router-dom";
import { useMainCategorySelector } from "../../../features/slice";
import { enqueueSnackbar } from "notistack";

const AddMainCategory = () => {
     const params = useParams();
     const dispatch = useDispatch<AppDispatch>();
     const { palette } = useTheme();
     const navigate = useNavigate();
     const mainCategory = useMainCategorySelector();

     useEffect(() => {
          (async () => {
               if (params.id) {
                    const data = await dispatch(GetMainCategoryWithId(params.id));
               }
          })();
     }, [dispatch]);

     const NewMainCategory = async (e: NewMainCategoryProps) => {
          if (params.id) {
               const data = await dispatch(
                    UpdateMainCategoryById({
                         data: e,
                         id: params.id,
                    })
               );
               if (data.type === "mainCategory/update/fulfilled") {
                    enqueueSnackbar(data.payload, { variant: "success" });
                    navigate("/manage/main-category", { replace: true });
               }

               if (data.type === "mainCategory/update/rejected") {
                    enqueueSnackbar(data.payload, { variant: "success" });
               }
          } else {
               await dispatch(AddNewMainCategory(e));
               await dispatch(GetAllMainCategory());
               navigate("/manage/main-category", { replace: true });
          }
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
                         enableReinitialize
                         initialValues={{
                              displayName: mainCategory.single ? mainCategory.single.displayName : "",
                         }}
                         validationSchema={ValidationMainCategory}
                         onSubmit={NewMainCategory}
                    >
                         {({ handleBlur, handleChange, handleSubmit, errors, values, touched, isSubmitting }) => (
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
                                        <AppButton
                                             size="large"
                                             disabled={isSubmitting}
                                             fullWidth
                                             type="button"
                                             onClick={() => handleSubmit()}
                                        >
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

export default AddMainCategory;
