import React, { useEffect } from "react";
import { DefaultLayout } from "../../../layout";
import { AppButton, AppContainer, AppInput, AppTitleBar } from "../../../component";
import { Box, MenuItem, Typography } from "@mui/material";
import { Formik } from "formik";
import { NewRentalFormProps, RentalValidationSchema } from "../../../validation";
import { ListSubCategoryAction, useAppDispatch, useRentalSelector, useSubCategorySelector } from "../../../redux";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateRentalAction, UploadRentalAction } from "../../../redux/action/rental.action";
import { enqueueSnackbar } from "notistack";

export const NewRental = () => {
     const dispatch = useAppDispatch();
     const params = useParams();
     const navigate = useNavigate();
     const rental = useRentalSelector();
     const subCategory = useSubCategorySelector();

     useEffect(() => {
          (async () => {
               await dispatch(ListSubCategoryAction());
          })();
     }, []);

     const SendRequest = async (e: NewRentalFormProps) => {
          if (params.id) {
               const data = await dispatch(
                    UpdateRentalAction({
                         data: {
                              carRentalName: e.carRentalName,
                              image: rental.image,
                              SubCategory: e.SubCategory,
                              location: {
                                   from: e.from,
                                   to: e.to,
                              },
                              options: e.options,
                              peopleAllowed: e.peopleAllowed,
                         },
                         id: params.id,
                    })
               );
               if (data.type === "rental/update/fulfilled") {
                    enqueueSnackbar(data.payload.data, { variant: "success" });
                    return navigate("/table/rental", { replace: true });
               }
               if (data.type === "rental/update/rejected") {
                    enqueueSnackbar(data.payload, { variant: "error" });
               }
          } else {
               const data = await dispatch(
                    UploadRentalAction({
                         carRentalName: e.carRentalName,
                         image: rental.image,
                         from: e.from,
                         to: e.to,
                         options: e.options,
                         peopleAllowed: e.peopleAllowed,
                         SubCategory: e.SubCategory,
                    })
               );
               if (data.type === "rental/new/fulfilled") {
                    enqueueSnackbar(data.payload.data, { variant: "success" });
                    return navigate("/table/rental", { replace: true });
               }
               if (data.type === "rental/new/rejected") {
                    enqueueSnackbar(data.payload, { variant: "error" });
               }
          }
     };
     return (
          <DefaultLayout pagetitle="upload files for rental service">
               <AppTitleBar
                    title="Upload rental services"
                    breadcrubms={[
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "Home",
                         },
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "rental",
                         },
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "upload rental services",
                         },
                    ]}
               />
               <AppContainer width="100%">
                    <Typography variant="h6">Provide details to create</Typography>
                    <Formik
                         enableReinitialize
                         onSubmit={SendRequest}
                         initialValues={
                              {
                                   carRentalName: "",
                                   options: "",
                                   peopleAllowed: "",
                                   SubCategory: "",
                                   from: "",
                                   to: "",
                              } as unknown as NewRentalFormProps
                         }
                         validationSchema={RentalValidationSchema}
                    >
                         {({ errors, values, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                              <form onSubmit={handleSubmit}>
                                   <AppInput
                                        label="Enter car name"
                                        value={values.carRentalName}
                                        onChange={handleChange("carRentalName")}
                                        onBlur={handleBlur("carRentalName")}
                                        error={touched.carRentalName && !values.carRentalName}
                                        helperText={touched.carRentalName && errors.carRentalName}
                                   />
                                   <Box display="flex" gap={3} mt={3}>
                                        <AppInput
                                             label="Enter pick up location"
                                             value={values.from}
                                             onChange={handleChange("from")}
                                             onBlur={handleBlur("from")}
                                             error={touched?.from && !values.from}
                                             helperText={touched?.from && errors.from}
                                        />
                                        <AppInput
                                             label="Enter drop location"
                                             value={values?.to}
                                             onChange={handleChange("to")}
                                             onBlur={handleBlur("to")}
                                             error={touched?.to && !values?.to}
                                             helperText={touched?.to && errors?.to}
                                        />
                                   </Box>
                                   <Box display="flex" gap={2}>
                                        <AppInput
                                             sx={{
                                                  mt: "16px",
                                             }}
                                             label="Enter car seats"
                                             value={values.peopleAllowed}
                                             onChange={handleChange("peopleAllowed")}
                                             onBlur={handleBlur("peopleAllowed")}
                                             error={touched?.peopleAllowed && !values.peopleAllowed}
                                             helperText={touched?.peopleAllowed && errors.peopleAllowed}
                                        />
                                        <AppInput
                                             sx={{ marginTop: "16px" }}
                                             id="options"
                                             select
                                             label="Select car rental option"
                                             value={values.options}
                                             onChange={handleChange("options")}
                                             onBlur={handleBlur("options")}
                                             error={(touched.options as boolean) && !values.options}
                                             helperText={touched.options && errors.options}
                                             margin="normal"
                                             fullWidth
                                        >
                                             <MenuItem selected value={"self"}>
                                                  <Typography textTransform="capitalize">Self</Typography>
                                             </MenuItem>
                                             <MenuItem value={"driver"}>
                                                  <Typography textTransform="capitalize">driver</Typography>
                                             </MenuItem>
                                             <MenuItem value={"chauffeur"}>
                                                  <Typography textTransform="capitalize">chauffeur</Typography>
                                             </MenuItem>
                                        </AppInput>
                                   </Box>
                                   {subCategory.data.length !== 0 && (
                                        <AppInput
                                             id="SubCategory"
                                             select
                                             label="Select sub category"
                                             value={values.SubCategory}
                                             onChange={handleChange("SubCategory")}
                                             onBlur={handleBlur("SubCategory")}
                                             error={(touched.SubCategory as boolean) && !values.SubCategory}
                                             helperText={touched.SubCategory && errors.SubCategory}
                                             margin="normal"
                                             fullWidth
                                        >
                                             {subCategory?.data.map(({ displayName, _id }) => (
                                                  <MenuItem key={_id} value={_id}>
                                                       <Typography textTransform="capitalize">{displayName}</Typography>
                                                  </MenuItem>
                                             ))}
                                        </AppInput>
                                   )}
                                   <AppButton type="submit" disabled={isSubmitting} sx={{ marginTop: 3 }}>
                                        Upload rental service
                                   </AppButton>
                              </form>
                         )}
                    </Formik>
               </AppContainer>
          </DefaultLayout>
     );
};
