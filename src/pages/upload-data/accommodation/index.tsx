import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../../layout";
import { AppButton, AppContainer, AppInput, AppTitleBar } from "../../../component";
import { Box, FormLabel, Grid, IconButton, MenuItem, Typography } from "@mui/material";
import { Formik } from "formik";
import { AccommodationValidationSchema, NewAccommodationFormProps } from "../../../validation";
import {
     ListAccommodationByIdAction,
     ListSubCategoryAction,
     UpdateAccommodationAction,
     UploadAccommodationAction,
     addImage,
     clearImages,
     removeImage,
     useAccommodationSelector,
     useAppDispatch,
     useSubCategorySelector,
} from "../../../redux";
import Editor from "react-simple-wysiwyg";
import { enqueueSnackbar } from "notistack";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { AuthValidations } from "../../../utils";

export const NewAccommodation = () => {
     const subcategory = useSubCategorySelector();
     const params = useParams();
     const navigate = useNavigate();
     const [imageValue, setImage] = useState({
          title: "",
          image: "",
     });
     const dispatch = useAppDispatch();
     const accommodation = useAccommodationSelector();

     useEffect(() => {
          (async () => {
               await dispatch(ListSubCategoryAction());
               if (params.id) {
                    await dispatch(ListAccommodationByIdAction(params.id));
               }
          })();
     }, [params]);

     const UploadAccommodation = async (e: NewAccommodationFormProps) => {
          if (params.id) {
               const data = await dispatch(
                    UpdateAccommodationAction({
                         data: {
                              city: e.city,
                              description: e.description,
                              displayName: e.displayName,
                              image: accommodation.image,
                              state: e.state,
                              SubCategory: e.SubCategory,
                         },
                         id: params.id,
                    })
               );
               if (data.type === "accommodation/update/fulfilled") {
                    enqueueSnackbar(data.payload.data, { variant: "success" });
                    return navigate("/table/accommodations", { replace: true });
               }
               if (data.type === "accommodation/update/rejected") {
                    AuthValidations(data);
                    enqueueSnackbar(data.payload, { variant: "error" });
               }
               dispatch(clearImages());
          } else {
               const data = await dispatch(
                    UploadAccommodationAction({
                         city: e.city,
                         description: e.description,
                         displayName: e.displayName,
                         image: accommodation.image,
                         state: e.state,
                         SubCategory: e.SubCategory,
                    })
               );
               if (data.type === "accommodation/new/fulfilled") {
                    enqueueSnackbar(data.payload.data, { variant: "success" });
                    return navigate("/table/accommodations", { replace: true });
               }
               if (data.type === "accommodation/new/rejected") {
                    enqueueSnackbar(data.payload, { variant: "error" });
               }
          }
     };

     return (
          <DefaultLayout pagetitle="Upload new accommodations">
               <AppTitleBar
                    title="Upload accommodations"
                    breadcrubms={[
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "Home",
                         },
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "accommodation",
                         },
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "upload accommodations",
                         },
                    ]}
               />
               <AppContainer width="100%">
                    <Typography variant="h6">Provide details to create</Typography>
                    <Formik
                         enableReinitialize
                         onSubmit={UploadAccommodation}
                         initialValues={
                              {
                                   city: accommodation?.single.city ? accommodation.single.city : "",
                                   description: accommodation?.single ? accommodation.single.description : "",
                                   displayName: accommodation?.single ? accommodation.single.displayName : "",
                                   state: accommodation?.single ? accommodation.single.state : "",
                                   SubCategory: accommodation?.single ? accommodation.single.SubCategory : "",
                              } as NewAccommodationFormProps
                         }
                         validationSchema={AccommodationValidationSchema}
                    >
                         {({ errors, values, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                              <form onSubmit={handleSubmit}>
                                   <AppInput
                                        label="Enter accommodation name"
                                        value={values.displayName}
                                        onChange={handleChange("displayName")}
                                        onBlur={handleBlur("displayName")}
                                        error={touched.displayName && !values.displayName}
                                        helperText={touched.displayName && errors.displayName}
                                   />
                                   <Box display="flex" gap={3} mt={3}>
                                        <AppInput
                                             label="Enter city"
                                             value={values.city}
                                             onChange={handleChange("city")}
                                             onBlur={handleBlur("city")}
                                             error={touched.city && !values.city}
                                             helperText={touched.city && errors.city}
                                        />
                                        <AppInput
                                             label="Enter state"
                                             value={values.state}
                                             onChange={handleChange("state")}
                                             onBlur={handleBlur("state")}
                                             error={touched.state && !values.city}
                                             helperText={touched.state && errors.state}
                                        />
                                   </Box>
                                   {accommodation?.image?.length !== 0 && (
                                        <Grid container spacing={3}>
                                             {accommodation?.image?.map(({ image, title }, i) => (
                                                  <Grid item xs={12} sm={12} key={i} md={6} xl={3} lg={3}>
                                                       <img width="100%" src={image} alt={title} />
                                                       <IconButton
                                                            onClick={() => {
                                                                 dispatch(removeImage(i));
                                                            }}
                                                       >
                                                            <AiFillDelete />
                                                       </IconButton>
                                                  </Grid>
                                             ))}
                                        </Grid>
                                   )}
                                   <Box display="flex" alignItems="center" my={2} gap={3}>
                                        <AppInput
                                             label="Enter image URL"
                                             value={imageValue.image}
                                             onChange={(e) =>
                                                  setImage({
                                                       ...imageValue,
                                                       image: e.target.value as string,
                                                  })
                                             }
                                        />
                                        <AppInput
                                             label="Enter image title"
                                             value={imageValue.title}
                                             onChange={(e) =>
                                                  setImage({
                                                       ...imageValue,
                                                       title: e.target.value as string,
                                                  })
                                             }
                                        />
                                        <AppButton
                                             onClick={() => {
                                                  if (!imageValue.image || !imageValue.title) {
                                                       enqueueSnackbar("all image field is required", {
                                                            variant: "error",
                                                       });
                                                  } else
                                                       dispatch(
                                                            addImage({
                                                                 title: imageValue.title,
                                                                 image: imageValue.image,
                                                            })
                                                       );
                                                  setImage({
                                                       image: "",
                                                       title: "",
                                                  });
                                             }}
                                             style={{ width: "50%" }}
                                        >
                                             add image
                                        </AppButton>
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
                                        Upload accommodation
                                   </AppButton>
                              </form>
                         )}
                    </Formik>
               </AppContainer>
          </DefaultLayout>
     );
};
