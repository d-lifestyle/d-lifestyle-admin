import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../../layout";
import { AppButton, AppContainer, AppInput, AppTitleBar } from "../../../component";
import { Formik } from "formik";
import { NewToursTravelProps } from "../../../interface";
import { NewToursTravelFormProps, ToursTravelValidationSchema } from "../../../validation";
import { useNavigate, useParams } from "react-router-dom";
import { Box, FormLabel, Grid, IconButton, MenuItem, Typography } from "@mui/material";
import { AiFillDelete } from "react-icons/ai";
import {
     ListSubCategoryAction,
     ListToursPackageByIdAction,
     UpdateTourPackagesByIdAction,
     UploadTourPackagesAction,
     addPackageImage,
     removePackageImage,
     useAppDispatch,
     useSubCategorySelector,
     useTourPackageSelector,
} from "../../../redux";
import { enqueueSnackbar } from "notistack";
import { Editor } from "react-simple-wysiwyg";
import { AuthValidations } from "../../../utils";

export const NewToursTravel = () => {
     const params = useParams();
     const subCategory = useSubCategorySelector();
     const toursPackage = useTourPackageSelector();
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     const [imageValue, setImage] = useState({
          title: "",
          image: "",
     });

     const SendRequest = async (e: NewToursTravelFormProps) => {
          if (params.id) {
               const data = await dispatch(
                    UpdateTourPackagesByIdAction({
                         data: {
                              code: e.code,
                              description: e.description,
                              displayName: e.displayName,
                              duration: e.duration,
                              image: toursPackage.image,
                              place: e.place,
                              SubCategory: e.SubCategory,
                              theme: e.theme,
                         },
                         id: params.id,
                    })
               );
               if (data.type === "tours_package/update/fulfilled") {
                    enqueueSnackbar(data.payload.data, { variant: "success" });
                    return navigate("/table/travel-packages", { replace: true });
               }
               if (data.type === "tours_package/update/rejected") {
                    AuthValidations(data);
                    enqueueSnackbar(data.payload, { variant: "error" });
               }
          } else {
               const data = await dispatch(
                    UploadTourPackagesAction({
                         code: e.code,
                         description: e.description,
                         displayName: e.displayName,
                         duration: e.duration,
                         image: toursPackage.image,
                         place: e.place,
                         SubCategory: e.SubCategory,
                         theme: e.theme,
                    })
               );
               if (data.type === "tours_package/new/fulfilled") {
                    enqueueSnackbar(data.payload.data, { variant: "success" });
                    return navigate("/table/travel-packages", { replace: true });
               }
               if (data.type === "tours_package/new/rejected") {
                    AuthValidations(data);
                    enqueueSnackbar(data.payload, { variant: "error" });
               }
          }
     };

     useEffect(() => {
          (async () => {
               await dispatch(ListSubCategoryAction());
               if (params.id) {
                    await dispatch(ListToursPackageByIdAction(params.id));
               }
          })();
     }, []);

     return (
          <DefaultLayout pagetitle="Upload new tours packages">
               <AppTitleBar
                    title="Upload tour packages"
                    breadcrubms={[
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "Home",
                         },
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "tours",
                         },
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "upload tour packages",
                         },
                    ]}
               />
               <AppContainer width="100%">
                    <Formik
                         enableReinitialize
                         initialValues={
                              {
                                   code: toursPackage.single ? toursPackage.single.code : "",
                                   description: toursPackage.single ? toursPackage.single.description : "",
                                   displayName: toursPackage.single ? toursPackage.single.displayName : "",
                                   duration: toursPackage.single ? toursPackage.single.duration : "",
                                   place: toursPackage.single ? toursPackage.single.place : "",
                                   SubCategory: toursPackage.single ? toursPackage.single.SubCategory : "",
                                   theme: toursPackage.single ? toursPackage.single.theme : "",
                              } as NewToursTravelFormProps
                         }
                         validationSchema={ToursTravelValidationSchema}
                         onSubmit={SendRequest}
                    >
                         {({ values, touched, errors, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                              <form onSubmit={handleSubmit}>
                                   <AppInput
                                        label="Enter package name"
                                        value={values.displayName}
                                        onChange={handleChange("displayName")}
                                        onBlur={handleBlur("displayName")}
                                        error={touched.displayName && !values.displayName}
                                        helperText={touched.displayName && errors.displayName}
                                   />
                                   <Box display="flex" gap={3} mt={3}>
                                        <AppInput
                                             label="Enter package duration"
                                             value={values.duration}
                                             onChange={handleChange("duration")}
                                             onBlur={handleBlur("duration")}
                                             error={touched.duration && !values.duration}
                                             helperText={touched.duration && errors.duration}
                                        />
                                        <AppInput
                                             label="Enter package location"
                                             value={values.place}
                                             onChange={handleChange("place")}
                                             onBlur={handleBlur("place")}
                                             error={touched.place && !values.place}
                                             helperText={touched.place && errors.place}
                                        />
                                   </Box>
                                   {toursPackage?.image?.length !== 0 && (
                                        <Grid container spacing={3}>
                                             {toursPackage?.image?.map(({ image, title }, i) => (
                                                  <Grid item xs={12} sm={12} key={i} md={6} xl={3} lg={3}>
                                                       <img width="100%" src={image} alt={title} />
                                                       <IconButton
                                                            onClick={() => {
                                                                 dispatch(removePackageImage(i));
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
                                                            addPackageImage({
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
                                        <FormLabel>Enter package description</FormLabel>
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
                                   <Box display="flex" gap={3} mt={3}>
                                        <AppInput
                                             label="Enter package code"
                                             value={values.code}
                                             onChange={handleChange("code")}
                                             onBlur={handleBlur("code")}
                                             error={touched.code && !values.code}
                                             helperText={touched.code && errors.code}
                                        />
                                        <AppInput
                                             label="Enter package theme"
                                             value={values.theme}
                                             onChange={handleChange("theme")}
                                             onBlur={handleBlur("theme")}
                                             error={touched.theme && !values.theme}
                                             helperText={touched.theme && errors.theme}
                                        />
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
                                             <MenuItem value="" selected>
                                                  <em>None</em>
                                             </MenuItem>
                                             {subCategory?.data.map(({ displayName, _id, CategoryId }) => (
                                                  <MenuItem key={_id} value={_id}>
                                                       <Typography textTransform="capitalize">
                                                            {displayName} {CategoryId.displayName}
                                                       </Typography>
                                                  </MenuItem>
                                             ))}
                                        </AppInput>
                                   )}
                                   <AppButton type="submit" disabled={isSubmitting} sx={{ marginTop: 3 }}>
                                        Upload tour package
                                   </AppButton>
                              </form>
                         )}
                    </Formik>
               </AppContainer>
          </DefaultLayout>
     );
};
