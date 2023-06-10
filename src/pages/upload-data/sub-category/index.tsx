import React, { useEffect } from "react";
import { DefaultLayout } from "../../../layout";
import { AppButton, AppContainer, AppInput, AppTitleBar } from "../../../component";
import { Formik } from "formik";
import {
     ListCategoryAction,
     ListSubCategoryAction,
     ListSubCategoryByIdAction,
     UpdateSubCategoryAction,
     UploadSubCategoryAction,
     useAppDispatch,
     useCategorySelector,
     useSubCategorySelector,
} from "../../../redux";
import { MenuItem, Typography } from "@mui/material";
import { NewSubCategoryProps } from "../../../interface";
import { SubCategoryValidationSchema } from "../../../validation/sub-category.validation";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { AuthValidations } from "../../../utils";

export const NewSubCategory = () => {
     const subCategory = useSubCategorySelector();
     const category = useCategorySelector();
     const params = useParams();
     const dispatch = useAppDispatch();
     const navigate = useNavigate();

     const UploadSubCategory = async (e: NewSubCategoryProps) => {
          if (params.id) {
               const data = await dispatch(UpdateSubCategoryAction({ data: e, id: params.id }));
               if (data.type === "sub_category/update/fulfilled") {
                    enqueueSnackbar(data.payload.data, { variant: "success" });
                    return navigate("/table/sub-category", { replace: true });
               }
               if (data.type === "sub_category/update/rejected") {
                    AuthValidations(data);

                    enqueueSnackbar(data.payload, { variant: "error" });
               }
          } else {
               const data = await dispatch(UploadSubCategoryAction(e));
               if (data.type === "sub_category/new/fulfilled") {
                    enqueueSnackbar(data.payload.data, { variant: "success" });
                    return navigate("/table/sub-category", { replace: true });
               }
               if (data.type === "sub_category/new/rejected") {
                    AuthValidations(data);

                    enqueueSnackbar(data.payload, { variant: "error" });
               }
          }
     };

     useEffect(() => {
          (async () => {
               await dispatch(ListCategoryAction());
               if (params.id) {
                    await dispatch(ListSubCategoryByIdAction(params.id));
               }
          })();
     }, [dispatch]);
     console.log(subCategory.single);

     return (
          <DefaultLayout pagetitle="upload sub category">
               <AppTitleBar
                    title="Upload new sub category"
                    breadcrubms={[
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "Home",
                         },
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "table",
                         },
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "upload new sub category",
                         },
                    ]}
               />
               <AppContainer>
                    <Formik
                         enableReinitialize
                         initialValues={
                              {
                                   displayName: subCategory.single.displayName ? subCategory.single.displayName : "",
                                   CategoryId: subCategory.single.CategoryId ? subCategory.single.CategoryId : "",
                              } as NewSubCategoryProps
                         }
                         validationSchema={SubCategoryValidationSchema}
                         onSubmit={UploadSubCategory}
                    >
                         {({ handleSubmit, errors, values, touched, handleBlur, handleChange, isSubmitting }) => (
                              <form onSubmit={handleSubmit}>
                                   <Typography variant="h6">Provide details to create</Typography>
                                   <AppInput
                                        label="Enter category name"
                                        value={values.displayName}
                                        onChange={handleChange("displayName")}
                                        onBlur={handleBlur("displayName")}
                                        error={touched.displayName}
                                        helperText={touched.displayName && errors.displayName}
                                   />
                                   {category.data.length !== 0 && (
                                        <AppInput
                                             id="CategoryId"
                                             select
                                             label="Select category"
                                             value={values.CategoryId}
                                             onChange={handleChange("CategoryId")}
                                             onBlur={handleBlur("CategoryId")}
                                             error={touched.CategoryId as boolean}
                                             helperText={touched.CategoryId && errors.CategoryId}
                                             margin="normal"
                                             fullWidth
                                        >
                                             <MenuItem value="">
                                                  <em>None</em>
                                             </MenuItem>
                                             {category?.data.map(({ displayName, _id }) => (
                                                  <MenuItem key={_id} value={_id}>
                                                       {displayName}
                                                  </MenuItem>
                                             ))}
                                        </AppInput>
                                   )}

                                   <AppButton sx={{ mt: 2 }} disabled={isSubmitting} type="submit" fullWidth>
                                        upload
                                   </AppButton>
                              </form>
                         )}
                    </Formik>
               </AppContainer>
          </DefaultLayout>
     );
};
