import React, { useEffect } from "react";
import { DefaultLayout } from "../../../layout";
import { AppButton, AppContainer, AppInput, AppTitleBar } from "../../../component";
import { Formik } from "formik";
import { NewBlogProps } from "../../../interface";
import { BlogValidationSchema } from "../../../validation";
import { Box } from "@mui/system";
import { useAppDispatch, useBlogSelector } from "../../../redux";

import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { ListBlogByIdAction, UpdateBlogByIdAction, UploadBlogAction } from "../../../redux/action/blog.action";
import { FormLabel, Typography } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import parse from "html-react-parser";
import { Editor } from "react-simple-wysiwyg";
import { AuthValidations } from "../../../utils";

export const NewBlog = () => {
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     const params = useParams();
     const blog = useBlogSelector();

     useEffect(() => {
          if (params.id) {
               (async () => {
                    await dispatch(ListBlogByIdAction(params.id as string));
               })();
          }
     }, [dispatch, params]);

     const SendRequest = async (e: NewBlogProps) => {
          if (params.id) {
               const data = await dispatch(
                    UpdateBlogByIdAction({
                         data: {
                              body: e.body,
                              images: e.images,
                              label: e.label,
                         },
                         id: params.id,
                    })
               );
               if (data.type === "blog/update/fulfilled") {
                    navigate("/table/blogs", { replace: true });
                    console.log(data.payload);
                    return enqueueSnackbar(data.payload.data, { variant: "success" });
               }
               if (data.type === "blog/update/rejected") {
                    AuthValidations(data);
                    return enqueueSnackbar(data.payload.data, { variant: "success" });
               }
          } else {
               const data = await dispatch(UploadBlogAction(e));
               if (data.type === "blog/new/fulfilled") {
                    console.log(data.payload);

                    enqueueSnackbar(data.payload.data, { variant: "success" });
                    return navigate("/table/blogs", { replace: true });
               }
               if (data.type === "blog/new/rejected") {
                    console.log(data.payload);
                    return enqueueSnackbar(data.payload.data, { variant: "success" });
               }
          }
     };
     console.log("DATA", blog.single);
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
               <AppContainer width="100%">
                    <Typography variant="h4">Provide details to upload</Typography>
                    <Formik
                         enableReinitialize
                         initialValues={
                              {
                                   body: blog?.single ? blog.single.body : "",
                                   images: blog.single ? blog.single.images : "",
                                   label: blog.single ? blog.single.label : "",
                              } as NewBlogProps
                         }
                         validationSchema={BlogValidationSchema}
                         onSubmit={SendRequest}
                    >
                         {({ handleBlur, handleChange, handleSubmit, values, touched, errors }) => (
                              <form onSubmit={handleSubmit}>
                                   {values?.images?.length > 0 && (
                                        <Box>
                                             <img src={values.images} width="100%" alt={values.images} />
                                        </Box>
                                   )}
                                   <Box>
                                        <AppInput
                                             label="Write your blog title"
                                             helperText={touched.label && errors.label}
                                             error={touched.label && !values.label}
                                             value={values.label as string}
                                             onChange={handleChange("label")}
                                             onBlur={handleBlur("label")}
                                        />
                                   </Box>
                                   <Box>
                                        <AppInput
                                             label="Write your image URL"
                                             helperText={touched.images && errors.images}
                                             error={touched.images && !values.images}
                                             value={values.images as string}
                                             onChange={handleChange("images")}
                                             onBlur={handleBlur("images")}
                                        />
                                   </Box>
                                   <Box mt={3}>
                                        <FormLabel>Enter blog description</FormLabel>
                                        <Editor
                                             placeholder="Entered description will be show to user"
                                             value={values.body}
                                             onChange={handleChange("body")}
                                             onBlur={handleBlur("body")}
                                             containerProps={{
                                                  style: {
                                                       marginTop: 6,
                                                       height: "300px",
                                                       borderRadius: 0,
                                                       overflow: "scroll",
                                                  },
                                             }}
                                        />
                                        {touched.body && (
                                             <Typography variant="caption" textTransform="uppercase" color="error">
                                                  {errors.body}
                                             </Typography>
                                        )}
                                   </Box>
                                   <Box mt={3} display="flex" justifyContent="end">
                                        <AppButton sx={{ paddingLeft: 10, paddingRight: 10 }} type="submit">
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
