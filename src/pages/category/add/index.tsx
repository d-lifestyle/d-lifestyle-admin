import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../../layout";
import { AppButton, AppInput, AppTitleBar } from "../../../component";
import { CategoriesProps, MainCategoryProps, NewCategoryProps } from "../../../interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../features";
import { clearSingleCategory, useCategorySelector, useMainCategorySelector } from "../../../features/slice";
import {
     AddNewCategory,
     GetAllMainCategory,
     GetCategoryById,
     UpdateCarouselById,
     UpdateCategoryById,
} from "../../../features/action";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { Formik } from "formik";
import { CategoryValidationSchema } from "../../../validation";

const AddCategory = () => {
     const [category, setCategory] = useState<NewCategoryProps>({
          name: "",
          parentCategory: "",
     });
     const params = useParams();
     const categoryData = useCategorySelector();
     const navigate = useNavigate();
     const { palette } = useTheme();
     const dispatch = useDispatch<AppDispatch>();
     const mainCategory = useMainCategorySelector();

     useEffect(() => {
          (async () => {
               await dispatch(GetAllMainCategory());
               if (params.id) {
                    await dispatch(GetCategoryById(params.id));
               }
          })();
     }, [dispatch]);

     const SubmitRequest = async (e: NewCategoryProps) => {
          if (params.id) {
               const data = await dispatch(
                    UpdateCategoryById({
                         data: e,
                         id: params.id,
                    })
               );
               if (data.type === "category/update/fulfilled") {
                    enqueueSnackbar(data.payload, { variant: "success" });
                    return navigate("/manage/category", { replace: true });
               }
               if (data.type === "category/update/rejected") {
                    enqueueSnackbar(data.payload, { variant: "error" });
               }
          } else {
               const data = await dispatch(AddNewCategory(category));
               dispatch(clearSingleCategory());
               if (data.type === "category/new/fulfilled") {
                    enqueueSnackbar(data.payload, { variant: "success" });
                    return navigate("/manage/category", { replace: true });
               }
               if (data.type === "category/new/rejected") {
                    enqueueSnackbar(data.payload, { variant: "error" });
               }
          }
     };

     return (
          <DefaultLayout pagetitle="Add categories">
               <AppTitleBar
                    title="Create Category"
                    breadcrubms={[
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "home",
                         },
                         {
                              pagepath: "/add/category",
                              activepage: false,
                              activetitle: "create",
                         },
                         {
                              pagepath: "/manage/category",
                              activepage: true,
                              activetitle: "category",
                         },
                    ]}
               />

               <Formik
                    enableReinitialize
                    onSubmit={SubmitRequest}
                    initialValues={
                         {
                              name: categoryData.single ? categoryData.single.name : "",
                              parentCategory: categoryData ? categoryData.single?.parentCategory : "",
                         } as NewCategoryProps
                    }
                    validationSchema={CategoryValidationSchema}
               >
                    {({ errors, values, touched, handleBlur, handleChange, handleSubmit }) => (
                         <form onSubmit={handleSubmit}>
                              <Box
                                   width="60%"
                                   border={`2px solid ${palette.grey[400]}`}
                                   p={3}
                                   margin="auto"
                                   borderRadius={1}
                                   mt={5}
                              >
                                   <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                                             {categoryData?.error?.length !== 0 && (
                                                  <Typography color="red">{categoryData.error}</Typography>
                                             )}
                                             <Box>
                                                  <AppInput
                                                       fullWidth
                                                       placeholder="Enter category name"
                                                       onBlur={handleBlur("name")}
                                                       onChange={handleChange("name")}
                                                       value={values.name}
                                                       id="name"
                                                       name="name"
                                                       error={!values.name && touched.name}
                                                       helperText={touched.name && errors.name}
                                                  />
                                             </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                                             <FormControl
                                                  onBlur={handleBlur("parentCategory")}
                                                  onChange={handleChange("parentCategory")}
                                                  variant="outlined"
                                                  fullWidth
                                                  sx={{ mt: 1 }}
                                             >
                                                  <InputLabel id="new-sub-category">Select Parent Category</InputLabel>
                                                  <Select
                                                       labelId="new-sub-category"
                                                       id="new-sub-category"
                                                       name="parentCategory"
                                                       value={values?.parentCategory}
                                                  >
                                                       <MenuItem value="none">
                                                            <em>None</em>
                                                       </MenuItem>
                                                       {mainCategory.data.map(
                                                            ({ _id, displayName }: MainCategoryProps) => (
                                                                 <MenuItem value={_id} key={_id}>
                                                                      <Typography textTransform="capitalize">
                                                                           {displayName}
                                                                      </Typography>
                                                                 </MenuItem>
                                                            )
                                                       )}
                                                  </Select>
                                             </FormControl>
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
                                             fullWidth
                                             type="submit"
                                             onClick={() => handleSubmit(values as any)}
                                        >
                                             Submit
                                        </AppButton>
                                   </Box>
                              </Box>
                         </form>
                    )}
               </Formik>
          </DefaultLayout>
     );
};

export default AddCategory;
