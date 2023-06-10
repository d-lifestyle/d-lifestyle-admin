import React, { useEffect } from "react";
import { DefaultLayout } from "../../../layout";
import { AppButton, AppContainer, AppInput, AppTitleBar } from "../../../component";
import { Formik } from "formik";
import { NewCarouselProps } from "../../../interface";
import { CarouselValidateSchema } from "../../../validation";
import { Box } from "@mui/system";
import { useAppDispatch, useCarouselSelector } from "../../../redux";
import {
     ListCarouselByIdAction,
     UpdateCarouselByIdAction,
     UploadCarouselAction,
} from "../../../redux/action/carousel.action";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { AuthValidations } from "../../../utils";

export const NewCarousel = () => {
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     const params = useParams();
     const carousel = useCarouselSelector();

     useEffect(() => {
          (async () => {
               await dispatch(ListCarouselByIdAction(params.id as string));
          })();
     }, [dispatch, params]);

     const SendRequest = async (e: NewCarouselProps) => {
          if (params.id) {
               const data = await dispatch(
                    UpdateCarouselByIdAction({
                         data: e,
                         id: params.id,
                    })
               );
               if (data.type === "carousel/update/fulfilled") {
                    navigate("/table/slider", { replace: true });
                    return enqueueSnackbar(data.payload.data, { variant: "success" });
               }
               if (data.type === "carousel/update/rejected") {
                    AuthValidations(data);
                    return enqueueSnackbar(data.payload.data, { variant: "success" });
               }
          } else {
               const data = await dispatch(UploadCarouselAction(e));
               if (data.type === "carousel/new/fulfilled") {
                    navigate("/table/slider", { replace: true });
                    return enqueueSnackbar(data.payload.data, { variant: "success" });
               }
               if (data.type === "carousel/new/rejected") {
                    AuthValidations(data);
                    return enqueueSnackbar(data.payload.data, { variant: "success" });
               }
          }
     };
     return (
          <DefaultLayout pagetitle="upload Carousel">
               <AppTitleBar
                    title="Upload new Carousel"
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
                              activetitle: "upload new Carousel",
                         },
                    ]}
               />
               <AppContainer>
                    <Formik
                         enableReinitialize
                         initialValues={
                              {
                                   dataAlt: carousel.single ? carousel.single.dataAlt : "",
                                   dataImage: carousel.single ? carousel.single.dataImage : "",
                              } as NewCarouselProps
                         }
                         validationSchema={CarouselValidateSchema}
                         onSubmit={SendRequest}
                    >
                         {({ handleBlur, handleChange, handleSubmit, values, touched, errors }) => (
                              <form onSubmit={handleSubmit}>
                                   {values?.dataImage?.length !== 0 && (
                                        <Box>
                                             <img src={values.dataImage} width="100%" alt={values.dataAlt} />
                                        </Box>
                                   )}
                                   <Box>
                                        <AppInput
                                             label="Write your image URL"
                                             helperText={touched.dataImage && errors.dataImage}
                                             error={touched.dataImage && !values.dataImage}
                                             value={values.dataImage as string}
                                             onChange={handleChange("dataImage")}
                                             onBlur={handleBlur("dataImage")}
                                        />
                                   </Box>
                                   <Box>
                                        <AppInput
                                             label="Write your image title"
                                             helperText={touched.dataAlt && errors.dataAlt}
                                             error={touched.dataAlt && !values.dataAlt}
                                             value={values.dataAlt as string}
                                             onChange={handleChange("dataAlt")}
                                             onBlur={handleBlur("dataAlt")}
                                        />
                                   </Box>
                                   <Box mt={1}>
                                        <AppButton fullWidth type="submit">
                                             submit
                                        </AppButton>
                                   </Box>
                              </form>
                         )}
                    </Formik>
               </AppContainer>
          </DefaultLayout>
     );
};
