import React, { useEffect } from "react";
import { DefaultLayout } from "../../../layout";
import { AppButton, AppContainer, AppInput, AppTitleBar } from "../../../component";
import { Box, FormLabel, MenuItem, Typography } from "@mui/material";
import { Formik } from "formik";
import { NewCruisePackageProps } from "../../../interface";
import { CruiseValidationSchema } from "../../../validation";
import { useNavigate, useParams } from "react-router-dom";
import {
     ListCruiseByIdAction,
     ListSubCategoryAction,
     UpdateCruiseAction,
     UploadCruiseAction,
     useAppDispatch,
     useCruiseSelector,
     useSubCategorySelector,
} from "../../../redux";
import { Editor } from "react-simple-wysiwyg";
import { enqueueSnackbar } from "notistack";

export const NewCruise = () => {
     const params = useParams();
     const cruise = useCruiseSelector();
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     const subcategory = useSubCategorySelector();

     useEffect(() => {
          (async () => {
               await dispatch(ListSubCategoryAction());
               if (params.id) {
                    await dispatch(ListCruiseByIdAction(params.id as string));
               }
          })();
     }, [dispatch]);

     const SendRequest = async (e: NewCruisePackageProps) => {
          console.log(e);
          if (params.id) {
               const data = await dispatch(
                    UpdateCruiseAction({
                         data: e,
                         id: params.id,
                    })
               );
               if (data.type === "cruise/update/fulfilled") {
                    navigate("/table/cruise-packages", { replace: true });
                    return enqueueSnackbar(data.payload.data, { variant: "success" });
               }
               if (data.type === "cruise/update/rejected") {
                    return enqueueSnackbar(data.payload.data, { variant: "error" });
               }
          } else {
               const data = await dispatch(
                    UploadCruiseAction({
                         description: e.description,
                         displayName: e.displayName,
                         departure: {
                              from: e.from,
                              to: e.to,
                         },
                         image: e.image,
                         itinerary: e.itinerary,
                         sailingType: e.sailingType,
                         SubCategory: e.SubCategory,
                    } as any)
               );
               if (data.type === "cruise/new/fulfilled") {
                    navigate("/table/cruise-packages", { replace: true });
                    return enqueueSnackbar(data.payload.data, { variant: "success" });
               }
               if (data.type === "cruise/new/rejected") {
                    return enqueueSnackbar(data.payload.data, { variant: "error" });
               }
          }
     };
     return (
          <DefaultLayout pagetitle="Upload new cruise">
               <AppTitleBar
                    title="Upload new cruise package"
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
                              activetitle: "upload new cruise package",
                         },
                    ]}
               />
               <AppContainer width="100%">
                    <Typography variant="h5">Provide details to upload</Typography>
                    <Formik
                         enableReinitialize
                         initialValues={
                              {
                                   departure: cruise.single ? cruise.single.departure : "",
                                   description: cruise.single ? cruise.single.description : "",
                                   displayName: cruise.single ? cruise.single.displayName : "",
                                   image: cruise.single ? cruise.single.image : "",
                                   itinerary: cruise.single ? cruise.single.itinerary : "",
                                   sailingType: cruise.single ? cruise.single.sailingType : "",
                                   SubCategory: cruise.single ? cruise.single.SubCategory : "",
                                   from: cruise.single ? cruise.single.departure?.from : "",
                                   to: cruise.single ? cruise.single.departure?.to : "",
                              } as NewCruisePackageProps
                         }
                         validationSchema={CruiseValidationSchema}
                         onSubmit={SendRequest}
                    >
                         {({ handleBlur, handleChange, handleSubmit, values, errors, touched, isSubmitting }) => (
                              <form onSubmit={handleSubmit}>
                                   <Box>
                                        <Typography variant="caption" textTransform="uppercase">
                                             Basic details
                                        </Typography>
                                        {values.image?.length !== 0 && (
                                             <Box>
                                                  <img src={values.image} alt={values.displayName} />
                                             </Box>
                                        )}
                                        <AppInput
                                             value={values.image}
                                             onChange={handleChange("image")}
                                             onBlur={handleBlur("image")}
                                             error={touched.image && !values.image}
                                             helperText={touched.image && errors.image}
                                             label="Write cruise image URL"
                                        />
                                   </Box>
                                   <Box>
                                        <AppInput
                                             value={values.displayName}
                                             onChange={handleChange("displayName")}
                                             onBlur={handleBlur("displayName")}
                                             error={touched.displayName && !values.displayName}
                                             helperText={touched.displayName && errors.displayName}
                                             label="Write cruise package name"
                                        />
                                   </Box>
                                   <Box mt={2}>
                                        <Typography variant="caption" textTransform="uppercase">
                                             Itinerary & Sailing Type
                                        </Typography>
                                   </Box>
                                   <Box display="flex" gap={3}>
                                        <AppInput
                                             value={values.itinerary}
                                             onChange={handleChange("itinerary")}
                                             onBlur={handleBlur("itinerary")}
                                             error={touched.itinerary && !values.itinerary}
                                             helperText={touched.itinerary && errors.itinerary}
                                             label="Write itinerary"
                                        />
                                        <AppInput
                                             value={values.sailingType}
                                             onChange={handleChange("sailingType")}
                                             onBlur={handleBlur("sailingType")}
                                             error={touched.sailingType && !values.sailingType}
                                             helperText={touched.sailingType && errors.sailingType}
                                             label="Write sailing type"
                                        />
                                   </Box>
                                   <Box mt={2}>
                                        <Typography variant="caption" textTransform="uppercase">
                                             Departure details
                                        </Typography>
                                   </Box>
                                   <Box display="flex" gap={3}>
                                        <AppInput
                                             value={values.from}
                                             onChange={handleChange("from")}
                                             onBlur={handleBlur("from")}
                                             error={touched.from && !values.from}
                                             helperText={touched.from && errors.from}
                                             label="Departure from"
                                        />
                                        <AppInput
                                             value={values.to}
                                             onChange={handleChange("to")}
                                             onBlur={handleBlur("to")}
                                             error={touched.to && !values.to}
                                             helperText={touched.to && errors.to}
                                             label="Departure to"
                                        />
                                   </Box>
                                   <Box mt={3}>
                                        <FormLabel>Enter accommodation description</FormLabel>
                                        <Editor
                                             placeholder="Entered description will be show to user"
                                             value={values.description}
                                             onChange={handleChange("description")}
                                             onBlur={handleBlur("description")}
                                             containerProps={{
                                                  style: {
                                                       marginTop: 6,
                                                       height: "300px",
                                                       borderRadius: 0,
                                                       overflow: "scroll",
                                                  },
                                             }}
                                        />
                                        {touched.description && (
                                             <Typography variant="caption" color="error">
                                                  {errors.description}
                                             </Typography>
                                        )}
                                   </Box>
                                   {subcategory.data.length !== 0 && (
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
                                             <MenuItem value="" selected>
                                                  <em>None</em>
                                             </MenuItem>
                                             {subcategory?.data.map(({ displayName, _id }) => (
                                                  <MenuItem key={_id} value={_id}>
                                                       <Typography textTransform="capitalize">{displayName}</Typography>
                                                  </MenuItem>
                                             ))}
                                        </AppInput>
                                   )}
                                   <AppButton type="submit" disabled={isSubmitting} sx={{ marginTop: 3 }}>
                                        Upload cruise
                                   </AppButton>
                              </form>
                         )}
                    </Formik>
               </AppContainer>
          </DefaultLayout>
     );
};
