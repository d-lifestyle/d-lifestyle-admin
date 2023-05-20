import React, { useEffect } from "react";
import { DefaultLayout } from "../../../layout";
import { AppButton, AppInput, AppTitleBar } from "../../../component";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import { CarouselInitial, CarouselValidateSchema } from "../../../validation";
import { NewCarouselProps } from "../../../interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../features";
import { AddNewCarousel, GetCarouselById, GetCategoryById, UpdateCarouselById } from "../../../features/action";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useCarouselSelector } from "../../../features/slice";

const AddCarousel = () => {
     const { shadows, palette, breakpoints } = useTheme();
     const params = useParams();

     const dispatch = useDispatch<AppDispatch>();
     const navigate = useNavigate();
     const carousel = useCarouselSelector();

     const CreateCarouselData = async (e: NewCarouselProps) => {
          if (params.id) {
               const data = await dispatch(
                    UpdateCarouselById({
                         data: e,
                         id: params.id,
                    })
               );
               if (data.type === "carousel/update/rejected") {
                    enqueueSnackbar(data.payload, { variant: "error" });
               }
               if (data.type === "carousel/update/fulfilled") {
                    enqueueSnackbar(data.payload, { variant: "success" });
                    navigate("/manage/carousel", { replace: true });
               }
          } else {
               const data = await dispatch(AddNewCarousel(e));
               if (data.type === "carousel/new/rejected") {
                    enqueueSnackbar(data.payload, { variant: "error" });
               }

               if (data.type === "carousel/new/fulfilled") {
                    enqueueSnackbar(data.payload, { variant: "success" });
                    navigate("/manage/carousel", { replace: true });
               }
          }
     };
     useEffect(() => {
          (async () => {
               if (params.id) {
                    await dispatch(GetCarouselById(params.id));
               }
          })();
     }, []);
     return (
          <DefaultLayout pagetitle="Create new banner">
               <AppTitleBar
                    title={`${params.id ? "update" : "create"} carousels for website`}
                    breadcrubms={[
                         {
                              pagepath: "home",
                              activepage: false,
                              activetitle: "Home",
                         },
                         {
                              pagepath: "/content/manage",
                              activepage: false,
                              activetitle: "content",
                         },
                         {
                              pagepath: "/content/manage",
                              activepage: false,
                              activetitle: "manage",
                         },
                         {
                              pagepath: "/content/add-new/carousels",
                              activepage: true,
                              activetitle: "carousels",
                         },
                    ]}
               />
               <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                    <Box
                         width={breakpoints.values.md ? "100%" : "70%"}
                         mt={5}
                         boxShadow={shadows[15]}
                         borderRadius={1}
                         p={3}
                         border={`2px solid ${palette.grey[400]}`}
                    >
                         <Formik
                              enableReinitialize
                              initialValues={{
                                   dataAlt: carousel.single ? carousel.single.dataAlt : "",
                                   dataImage: carousel.single ? carousel.single.dataImage : "",
                              }}
                              validationSchema={CarouselValidateSchema}
                              onSubmit={CreateCarouselData}
                         >
                              {({ values, errors, touched, handleBlur, handleChange, handleSubmit, isSubmitting }) => (
                                   <form onSubmit={handleSubmit}>
                                        <Grid container spacing={0}>
                                             <Box justifyContent="center" width="100%" alignItems="center">
                                                  {values.dataImage ? (
                                                       <img src={values.dataImage} alt={values.dataAlt} width="50%" />
                                                  ) : (
                                                       <Typography textAlign="center">
                                                            Entered URL will preview here
                                                       </Typography>
                                                  )}
                                             </Box>
                                             <Grid item xs={12} sm={12}>
                                                  <AppInput
                                                       fullWidth
                                                       margin="dense"
                                                       label="Paste image URL here!"
                                                       value={values.dataImage}
                                                       onChange={handleChange("dataImage")}
                                                       onBlur={handleBlur("dataImage")}
                                                       error={!values.dataImage && touched.dataImage}
                                                       helperText={touched.dataImage && errors.dataImage}
                                                  />
                                             </Grid>
                                             <Grid sx={{ mt: 2 }} item xs={12} sm={12}>
                                                  <AppInput
                                                       fullWidth
                                                       margin="dense"
                                                       label="Enter image title"
                                                       value={values.dataAlt}
                                                       onChange={handleChange("dataAlt")}
                                                       onBlur={handleBlur("dataAlt")}
                                                       error={!values.dataAlt && touched.dataAlt}
                                                       helperText={touched.dataAlt && errors.dataAlt}
                                                  />
                                             </Grid>
                                        </Grid>
                                        <Box mt={2} display="flex" flexDirection="row" justifyContent="end">
                                             <AppButton disabled={isSubmitting} type="submit">
                                                  {!params.id ? "Create" : "update"} carousel
                                             </AppButton>
                                        </Box>
                                   </form>
                              )}
                         </Formik>
                    </Box>
               </Box>
          </DefaultLayout>
     );
};

export default AddCarousel;
