import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../../../layout";
import { AppButton, AppImageView, AppInput, AppTitleBar } from "../../../../component";
import { SubCategoryProps } from "../../../../interface";
import {
     addToursPackageImages,
     emptyToursPackageImage,
     removeToursPackageImage,
     useSubCategorySelector,
     useToursTravelSelector,
} from "../../../../features/slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../features";
import { AddNewToursTravel, GetAllToursTravel } from "../../../../features/action";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
     BtnBold,
     BtnBulletList,
     BtnClearFormatting,
     BtnItalic,
     BtnLink,
     BtnNumberedList,
     BtnRedo,
     BtnStrikeThrough,
     BtnStyles,
     BtnUnderline,
     BtnUndo,
     Editor,
     Toolbar,
} from "react-simple-wysiwyg";
import { LabelOutlined } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";

interface ToursTravelFormProps {
     code: string;
     displayName: string;
     duration: string;
     place: string;
     SubCategory: string;
     theme: string;
     description: string;
     images: string;
     title: string;
}

const CreateToursTravel = () => {
     const [toursPackage, setToursPackage] = useState<ToursTravelFormProps>({
          code: "",
          displayName: "",
          duration: "",
          place: "",
          SubCategory: "",
          theme: "",
          description: "",
          images: "",
          title: "",
     });
     const navigate = useNavigate();
     const { palette, spacing } = useTheme();
     const subcategories = useSubCategorySelector();
     const toursPackageSelector = useToursTravelSelector();
     const dispatch = useDispatch<AppDispatch>();

     const getSubCategory = async () => {
          return await dispatch(GetAllToursTravel());
     };

     useEffect(() => {
          (async () => {
               await getSubCategory();
          })();
     }, [dispatch]);

     const handleSubmit = async () => {
          const data = await dispatch(
               AddNewToursTravel({
                    code: toursPackage.code,
                    description: toursPackage.description,
                    displayName: toursPackage.displayName,
                    duration: toursPackage.duration,
                    images: toursPackageSelector.images,
                    place: toursPackage.place,
                    SubCategory: toursPackage.SubCategory,
                    theme: toursPackage.theme,
               })
          );
          if (data.type === "toursTravel/new/fulfilled") {
               enqueueSnackbar(data.payload, { variant: "success" });
               dispatch(emptyToursPackageImage());
               navigate("/manage/tours-travel", { replace: true });
          } else if (data.type === "toursTravel/new/rejected") {
               enqueueSnackbar(data.payload, { variant: "error" });
          }
     };

     const addPackageImage = () => {
          dispatch(
               addToursPackageImages({
                    image: toursPackage.images,
                    title: toursPackage.title,
               })
          );
     };

     return (
          <DefaultLayout pagetitle="AddToursTravel tours & travel">
               <AppTitleBar
                    title="Create tours packages"
                    breadcrubms={[
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "home",
                         },
                         {
                              pagepath: "/add/tours-travel",
                              activepage: false,
                              activetitle: "create",
                         },
                         {
                              pagepath: "/manage/tours-travel",
                              activepage: true,
                              activetitle: "tours & packages",
                         },
                    ]}
               />

               <Box border={`2px solid ${palette.grey[400]}`} p={3} margin="auto" borderRadius={1} mt={5}>
                    <Grid container spacing={3}>
                         <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                              <AppInput
                                   label="Enter Package Name"
                                   value={toursPackage?.displayName}
                                   onChange={(e) => {
                                        setToursPackage({
                                             displayName: e.target.value,
                                             code: toursPackage.code,
                                             duration: toursPackage.duration,
                                             place: toursPackage.place,
                                             SubCategory: toursPackage.SubCategory,
                                             theme: toursPackage.theme,
                                             description: toursPackage.description,
                                             images: toursPackage.images,
                                             title: toursPackage.title,
                                        });
                                   }}
                              />
                         </Grid>
                         <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                              {toursPackageSelector.images.map(({ title, image }: any, i: number) => (
                                   <AppImageView
                                        dispatch={dispatch}
                                        i={i}
                                        image={image}
                                        removeImage={removeToursPackageImage}
                                        title={title}
                                   />
                              ))}
                              <Box display="flex" mt={3} gap={3}>
                                   <AppInput
                                        label="Enter image URL"
                                        value={toursPackage?.images}
                                        onChange={(e) => {
                                             setToursPackage({
                                                  displayName: toursPackage.displayName,
                                                  code: toursPackage.code,
                                                  duration: toursPackage.duration,
                                                  place: toursPackage.place,
                                                  SubCategory: toursPackage.SubCategory,
                                                  theme: toursPackage.theme,
                                                  description: toursPackage.description,
                                                  images: e.target.value,
                                                  title: toursPackage.title,
                                             });
                                        }}
                                   />
                                   <AppInput
                                        label="Enter image title"
                                        value={toursPackage?.title}
                                        onChange={(e) => {
                                             setToursPackage({
                                                  displayName: toursPackage.displayName,
                                                  code: toursPackage.code,
                                                  duration: toursPackage.duration,
                                                  place: toursPackage.place,
                                                  SubCategory: toursPackage.SubCategory,
                                                  theme: toursPackage.theme,
                                                  description: toursPackage.description,
                                                  images: toursPackage.images,
                                                  title: e.target.value,
                                             });
                                        }}
                                   />
                              </Box>
                              <AppButton size="small" onClick={addPackageImage}>
                                   add image
                              </AppButton>
                         </Grid>
                         <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                              <Box display="flex" gap={3}>
                                   <AppInput
                                        label="Enter Package Code"
                                        value={toursPackage?.code}
                                        onChange={(e) => {
                                             setToursPackage({
                                                  code: e.target.value,
                                                  displayName: toursPackage.displayName,
                                                  duration: toursPackage.duration,
                                                  place: toursPackage.place,
                                                  SubCategory: toursPackage.SubCategory,
                                                  theme: toursPackage.theme,
                                                  description: toursPackage.description,
                                                  images: toursPackage.images,
                                                  title: toursPackage.title,
                                             });
                                        }}
                                   />
                                   <AppInput
                                        label="Enter Package Duration"
                                        value={toursPackage?.duration}
                                        onChange={(e) => {
                                             setToursPackage({
                                                  duration: e.target.value,
                                                  code: toursPackage.code,
                                                  displayName: toursPackage.displayName,
                                                  place: toursPackage.place,
                                                  SubCategory: toursPackage.SubCategory,
                                                  theme: toursPackage.theme,
                                                  description: toursPackage.description,
                                                  images: toursPackage.images,
                                                  title: toursPackage.title,
                                             });
                                        }}
                                   />
                              </Box>
                         </Grid>
                         <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                              <Grid container spacing={4}>
                                   <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
                                        <AppInput
                                             label="Enter Package Place"
                                             value={toursPackage?.place}
                                             onChange={(e) => {
                                                  setToursPackage({
                                                       place: e.target.value,
                                                       code: toursPackage.code,
                                                       displayName: toursPackage.displayName,
                                                       duration: toursPackage.duration,
                                                       SubCategory: toursPackage.SubCategory,
                                                       theme: toursPackage.theme,
                                                       description: toursPackage.description,
                                                       images: toursPackage.images,
                                                       title: toursPackage.title,
                                                  });
                                             }}
                                        />
                                   </Grid>
                                   <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
                                        <AppInput
                                             label="Enter Package Theme"
                                             value={toursPackage?.theme}
                                             onChange={(e) => {
                                                  setToursPackage({
                                                       theme: e.target.value,
                                                       duration: toursPackage.duration,
                                                       code: toursPackage.code,
                                                       displayName: toursPackage.displayName,
                                                       place: toursPackage.place,
                                                       SubCategory: toursPackage.SubCategory,
                                                       description: toursPackage.description,
                                                       images: toursPackage.images,
                                                       title: toursPackage.title,
                                                  });
                                             }}
                                        />
                                   </Grid>
                              </Grid>
                         </Grid>
                         <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                              <Box display="flex" alignItems="center" gap={2}>
                                   <LabelOutlined style={{ color: palette.grey[600] }} />
                                   <label htmlFor="support" style={{ fontSize: 16, color: palette.grey[600] }}>
                                        Package Description
                                   </label>
                              </Box>
                              <Editor
                                   name="description"
                                   onChange={(e) => {
                                        setToursPackage({
                                             theme: toursPackage.theme,
                                             duration: toursPackage.duration,
                                             code: toursPackage.code,
                                             displayName: toursPackage.displayName,
                                             place: toursPackage.place,
                                             SubCategory: toursPackage.SubCategory,
                                             description: e.target.value,
                                             images: toursPackage.images,
                                             title: toursPackage.title,
                                        });
                                   }}
                                   value={toursPackage.description}
                                   containerProps={{
                                        style: {
                                             height: "300px",
                                             marginTop: spacing(2),
                                             borderRadius: 0,
                                        },
                                   }}
                              >
                                   <Toolbar>
                                        <BtnBold />
                                        <BtnItalic />
                                        <BtnBulletList />
                                        <BtnClearFormatting />
                                        <BtnLink />
                                        <BtnNumberedList />
                                        <BtnRedo />
                                        <BtnUndo />
                                        <BtnStrikeThrough />
                                        <BtnStyles />
                                        <BtnUnderline />
                                   </Toolbar>
                              </Editor>
                         </Grid>
                         <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                              <FormControl variant="outlined" fullWidth sx={{ mt: 1 }}>
                                   <InputLabel id="new-sub-category">Select Sub Category</InputLabel>
                                   <Select
                                        labelId="new-sub-category"
                                        id="new-sub-category"
                                        value={toursPackage?.SubCategory}
                                        onChange={(e) => {
                                             setToursPackage({
                                                  SubCategory: e.target.value,
                                                  code: toursPackage.code,
                                                  displayName: toursPackage.displayName,
                                                  duration: toursPackage.duration,
                                                  place: toursPackage.place,
                                                  theme: toursPackage.theme,
                                                  description: toursPackage.description,
                                                  images: toursPackage.images,
                                                  title: toursPackage.title,
                                             });
                                        }}
                                   >
                                        <MenuItem value="none">
                                             <em>None</em>
                                        </MenuItem>
                                        {subcategories.data.map((element: SubCategoryProps) => (
                                             <MenuItem value={element?._id} key={element?._id}>
                                                  <Typography textTransform="capitalize">
                                                       {element?.name} - {element?.CategoryId?.name} -{" "}
                                                       {element?.CategoryId?.parentCategory?.displayName}
                                                  </Typography>
                                             </MenuItem>
                                        ))}
                                   </Select>
                              </FormControl>
                         </Grid>
                    </Grid>
                    <Box display="flex" flexDirection="row" gap={3} mt={3}>
                         <AppButton fullWidth variant="text" color="error" type="button" onClick={() => navigate(-1)}>
                              back
                         </AppButton>
                         <AppButton size="large" fullWidth type="button" onClick={handleSubmit}>
                              Submit
                         </AppButton>
                    </Box>
               </Box>
          </DefaultLayout>
     );
};

export default CreateToursTravel;
