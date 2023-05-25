import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../../../layout";
import { AppButton, AppImageView, AppInput, AppTitleBar } from "../../../../component";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../features";
import {
     addAccommodationImages,
     removeAccommodationImage,
     emptyAccommodationImage,
     useAccommodationSelector,
     useSubCategorySelector,
} from "../../../../features/slice";
import {
     AddNewAccommodation,
     GetAccommodationById,
     GetAllSubCategory,
     UpdateAccommodationById,
} from "../../../../features/action";
import { SubCategoryProps } from "../../../../interface";

import { useNavigate, useParams } from "react-router-dom";
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

const CreateAccommodation = () => {
     const params = useParams();

     interface NewAccommodationFormProps {
          city: string;
          description: string;
          displayName: string;
          image: string;
          title: string;
          state: string;
          SubCategory: string;
     }
     const dispatch = useDispatch<AppDispatch>();
     const subcategories = useSubCategorySelector();
     const accommodationSelect = useAccommodationSelector();
     const theme = useTheme();

     const [accommodation, setAccommodation] = useState<NewAccommodationFormProps>({
          city: accommodationSelect.single ? accommodationSelect.single.city : "",
          displayName: accommodationSelect.single ? accommodationSelect.single.displayName : "",
          state: accommodationSelect.single ? accommodationSelect.single.state : "",
          SubCategory: accommodationSelect.single ? accommodationSelect.single.SubCategory : "",
          image: "",
          title: "",
          description: accommodationSelect.single ? accommodationSelect.single.description : "",
     });
     const { palette } = useTheme();
     const navigate = useNavigate();

     const getSubCategory = async () => {
          return await dispatch(GetAllSubCategory());
     };

     useEffect(() => {
          (async () => {
               if (params.id) {
                    await dispatch(GetAccommodationById(params.id));
               }
               await getSubCategory();
          })();
     }, [dispatch]);

     const handleSubmit = async () => {
          if (params.id) {
               const data = await dispatch(
                    UpdateAccommodationById({
                         data: {
                              city: accommodation.city,
                              description: accommodation.description,
                              displayName: accommodation.displayName,
                              state: accommodation.state,
                              SubCategory: accommodation.SubCategory,
                              image: accommodationSelect.images,
                         },
                         id: params.id,
                    })
               );
               if (data.type === "accommodation/update/fulfilled") {
                    enqueueSnackbar(data.payload, { variant: "success" });
                    navigate("/manage/accommodation", { replace: true });
                    dispatch(emptyAccommodationImage());
               } else if (data.type === "accommodation/update/rejected") {
                    enqueueSnackbar(data.payload, { variant: "error" });
               }
          } else {
               const data = await dispatch(
                    AddNewAccommodation({
                         city: accommodation.city,
                         description: accommodation.description,
                         displayName: accommodation.displayName,
                         state: accommodation.state,
                         SubCategory: accommodation.SubCategory,
                         image: accommodationSelect.images,
                    })
               );
               if (data.type === "accommodation/new/fulfilled") {
                    enqueueSnackbar(data.payload, { variant: "success" });
                    navigate("/manage/accommodation", { replace: true });
                    dispatch(emptyAccommodationImage());
               } else if (data.type === "accommodation/new/rejected") {
                    enqueueSnackbar(data.payload, { variant: "error" });
               }
          }
     };

     return (
          <DefaultLayout pagetitle="Create accommodation">
               <AppTitleBar
                    title="Create accommodation"
                    breadcrubms={[
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "home",
                         },
                         {
                              pagepath: "/add/category",
                              activepage: false,
                              activetitle: "create",
                         },
                         {
                              pagepath: "/manage/accommodation",
                              activepage: true,
                              activetitle: "accommodation",
                         },
                    ]}
               />

               <Box width="100%" border={`2px solid ${palette.grey[400]}`} p={3} margin="auto" borderRadius={1} mt={5}>
                    <Grid container spacing={3}>
                         <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                              <Box>
                                   <AppInput
                                        label="Enter Accommodation Name"
                                        value={accommodation?.displayName}
                                        onChange={(e) => {
                                             setAccommodation({
                                                  city: accommodation.city,
                                                  state: accommodation.state,
                                                  SubCategory: accommodation.SubCategory,
                                                  description: accommodation.description,
                                                  image: accommodation.image,
                                                  displayName: e.target.value,
                                                  title: accommodation.title,
                                             });
                                        }}
                                   />
                              </Box>
                         </Grid>
                         <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                              <Grid container spacing={2}>
                                   {accommodationSelect?.images?.map(({ image, title }: any, i: number) => (
                                        <AppImageView
                                             key={i}
                                             image={image}
                                             title={title}
                                             dispatch={dispatch}
                                             i={i}
                                             removeImage={removeAccommodationImage}
                                        />
                                   ))}
                              </Grid>
                              <Box>
                                   <Box display="flex" gap={3}>
                                        <AppInput
                                             label="Add Image URL"
                                             value={accommodation?.image}
                                             onChange={(e) => {
                                                  setAccommodation({
                                                       city: accommodation.city,
                                                       state: accommodation.state,
                                                       SubCategory: accommodation.SubCategory,
                                                       description: accommodation.description,
                                                       image: e.target.value,
                                                       displayName: accommodation.displayName,
                                                       title: accommodation.title,
                                                  });
                                             }}
                                        />
                                        <AppInput
                                             label="Add Image title"
                                             value={accommodation?.title}
                                             onChange={(e) => {
                                                  setAccommodation({
                                                       city: accommodation.city,
                                                       state: accommodation.state,
                                                       SubCategory: accommodation.SubCategory,
                                                       description: accommodation.description,
                                                       image: accommodation.image,
                                                       displayName: accommodation.displayName,
                                                       title: e.target.value,
                                                  });
                                             }}
                                        />
                                   </Box>
                                   <AppButton
                                        sx={{ mt: 2 }}
                                        onClick={() => {
                                             dispatch(
                                                  addAccommodationImages({
                                                       title: accommodation.title,
                                                       image: accommodation.image,
                                                  })
                                             );
                                             setAccommodation({
                                                  city: accommodation.city,
                                                  state: accommodation.state,
                                                  SubCategory: accommodation.SubCategory,
                                                  description: accommodation.description,
                                                  image: accommodation.image,
                                                  displayName: accommodation.displayName,
                                                  title: accommodation.image,
                                             });
                                        }}
                                        size="small"
                                   >
                                        add images
                                   </AppButton>
                              </Box>
                         </Grid>

                         <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                              <Box display="flex" alignItems="center" gap={2}>
                                   <LabelOutlined style={{ color: theme.palette.grey[600] }} />
                                   <label htmlFor="support" style={{ fontSize: 16, color: theme.palette.grey[600] }}>
                                        Description
                                   </label>
                              </Box>
                              <Editor
                                   name="description"
                                   onChange={(e) => {
                                        setAccommodation({
                                             city: accommodation.city,
                                             state: accommodation.state,
                                             SubCategory: accommodation.SubCategory,
                                             displayName: accommodation.displayName,
                                             description: e.target.value,
                                             image: accommodation.image,
                                             title: accommodation.title,
                                        });
                                   }}
                                   value={accommodation.description}
                                   containerProps={{
                                        style: {
                                             height: "300px",
                                             marginTop: theme.spacing(2),
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
                              <Box display="flex" gap={3}>
                                   <AppInput
                                        label="Enter City"
                                        value={accommodation?.city}
                                        onChange={(e) => {
                                             setAccommodation({
                                                  city: e.target.value,
                                                  state: accommodation.state,
                                                  SubCategory: accommodation.SubCategory,
                                                  displayName: accommodation.displayName,
                                                  description: accommodation.description,
                                                  image: accommodation.image,
                                                  title: accommodation.title,
                                             });
                                        }}
                                   />
                                   <AppInput
                                        label="Enter State"
                                        value={accommodation?.state}
                                        onChange={(e) => {
                                             setAccommodation({
                                                  city: accommodation.city,
                                                  state: e.target.value,
                                                  SubCategory: accommodation.SubCategory,
                                                  displayName: accommodation.displayName,
                                                  description: accommodation.description,
                                                  image: accommodation.image,
                                                  title: accommodation.title,
                                             });
                                        }}
                                   />
                              </Box>
                         </Grid>

                         <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                              <FormControl variant="outlined" fullWidth sx={{ mt: 1 }}>
                                   <InputLabel id="new-sub-category">Select Sub Category</InputLabel>
                                   <Select
                                        labelId="new-sub-category"
                                        id="new-sub-category"
                                        value={accommodation?.SubCategory}
                                        onChange={(e) => {
                                             setAccommodation({
                                                  city: accommodation.city,
                                                  state: accommodation.state,
                                                  SubCategory: e.target.value,
                                                  displayName: accommodation.displayName,
                                                  description: accommodation.description,
                                                  image: accommodation.image,
                                                  title: accommodation.title,
                                             });
                                        }}
                                   >
                                        <MenuItem value="none">
                                             <em>None</em>
                                        </MenuItem>
                                        {subcategories?.data?.map((element: SubCategoryProps) => (
                                             <MenuItem value={element._id} key={element._id}>
                                                  <Typography textTransform="capitalize">
                                                       {element?.name} - {element?.CategoryId?.name}
                                                  </Typography>
                                             </MenuItem>
                                        ))}
                                   </Select>
                              </FormControl>
                         </Grid>
                    </Grid>
                    <Box display="flex" flexDirection="row" gap={3} mt={3}>
                         <AppButton fullWidth variant="text" color="error" type="button" onClick={() => navigate(-1)}>
                              cancel
                         </AppButton>
                         <AppButton size="large" fullWidth type="button" onClick={handleSubmit}>
                              Submit
                         </AppButton>
                    </Box>
               </Box>
          </DefaultLayout>
     );
};

export default CreateAccommodation;
