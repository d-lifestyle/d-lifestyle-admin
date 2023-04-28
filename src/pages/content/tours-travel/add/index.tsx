import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../../../layout";
import { AppButton, AppInput, AppTitleBar } from "../../../../component";
import { SubCategoryProps, ToursTravelProps } from "../../../../interface";
import { useSubCategorySelector } from "../../../../features/slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../features";
import { AddNewToursTravel, GetAllToursTravel } from "../../../../features/action";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const CreateToursTravel = () => {
     const [toursPackage, setToursPackage] = useState<ToursTravelProps>({
          code: "",
          displayName: "",
          duration: "",
          place: "",
          SubCategory: "",
          theme: "",
     });
     const navigate = useNavigate();
     const { palette } = useTheme();
     const subcategories = useSubCategorySelector();
     const dispatch = useDispatch<AppDispatch>();

     const getSubCategory = async () => {
          return await dispatch(GetAllToursTravel());
     };

     useEffect(() => {
          (async () => {
               await getSubCategory();
          })();
          console.log(subcategories.data);
     }, [dispatch]);

     const handleSubmit = async () => {
          await dispatch(AddNewToursTravel(toursPackage));
          navigate("/manage/tours-travel", { replace: true });
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

               <Box width="60%" border={`2px solid ${palette.grey[400]}`} p={3} margin="auto" borderRadius={1} mt={5}>
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
                                        });
                                   }}
                              />
                         </Grid>
                         <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
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
                                        });
                                   }}
                              />
                         </Grid>
                         <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
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
                                        });
                                   }}
                              />
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
                                                  });
                                             }}
                                        />
                                   </Grid>
                              </Grid>
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
