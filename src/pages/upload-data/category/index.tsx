import React, { useEffect } from "react";
import { DefaultLayout } from "../../../layout";
import { AppButton, AppContainer, AppInput, AppTitleBar } from "../../../component";
import { Formik } from "formik";
import { NewCategoryProps } from "../../../interface";
import { CategoryValidationSchema } from "../../../validation";
import {
     ListCategoryAction,
     ListCategoryByIdAction,
     LogOutAction,
     UpdateCategoryAction,
     UploadCategoryAction,
     callInitialState,
     useAppDispatch,
     useCategorySelector,
} from "../../../redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { Typography } from "@mui/material";
import { AuthValidations } from "../../../utils";

export const NewNormalCategory = () => {
     const dispatch = useAppDispatch();
     const category = useCategorySelector();
     const params = useParams();
     const navigate = useNavigate();

     const UploadCategory = async (e: NewCategoryProps) => {
          if (params.id) {
               const data = await dispatch(UpdateCategoryAction({ data: e, id: params.id }));
               if (data.type === "category/update/fulfilled") {
                    enqueueSnackbar(data.payload.data, { variant: "success" });
                    dispatch(callInitialState());
                    return navigate("/table/normal-category", { replace: true });
               }
               if (data.type === "category/update/rejected") {
                    AuthValidations(data);
                    enqueueSnackbar(data.payload, { variant: "error" });
               }
          } else {
               const data = await dispatch(UploadCategoryAction(e));
               if (data.type === "category/new/fulfilled") {
                    enqueueSnackbar(data.payload.data, { variant: "success" });
                    return navigate("/table/normal-category", { replace: true });
               }
               if (data.type === "category/new/rejected") {
                    AuthValidations(data);
                    enqueueSnackbar(data.payload, { variant: "error" });
               }
          }
     };

     useEffect(() => {
          (async () => {
               await dispatch(ListCategoryAction());
               if (params.id) {
                    await dispatch(ListCategoryByIdAction(params.id));
               }
          })();
     }, []);

     return (
          <DefaultLayout pagetitle="upload Category">
               <AppTitleBar
                    title="Upload new category"
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
                              activetitle: "upload new category",
                         },
                    ]}
               />
               <AppContainer>
                    <Formik
                         enableReinitialize
                         initialValues={
                              {
                                   displayName: category.single.displayName ? category.single.displayName : "",
                              } as NewCategoryProps
                         }
                         validationSchema={CategoryValidationSchema}
                         onSubmit={UploadCategory}
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
