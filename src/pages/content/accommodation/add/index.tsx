import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../../../layout";
import { AppButton, AppInput, AppTitleBar } from "../../../../component";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../features";
import { useSubCategorySelector } from "../../../../features/slice";
import { AddNewAccommodation, GetAllSubCategory } from "../../../../features/action";
import { AccommodationProps, SubCategoryProps } from "../../../../interface";

import { useNavigate } from "react-router-dom";

export const CreateAccommodation = () => {
     const dispatch = useDispatch<AppDispatch>();
     const subcategories = useSubCategorySelector();
     const [accommodation, setAccommodation] = useState<AccommodationProps>({
          city: "",
          displayName: "",
          state: "",
          SubCategory: "",
     });
     const { palette } = useTheme();
     const navigate = useNavigate();

     const getSubCategory = async () => {
          return await dispatch(GetAllSubCategory());
     };

     useEffect(() => {
          (async () => {
               await getSubCategory();
          })();
     }, [dispatch]);

     const handleSubmit = async () => {
          await dispatch(AddNewAccommodation(accommodation));
          navigate("/manage/accommodation", { replace: true });
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

               <Box width="60%" border={`2px solid ${palette.grey[400]}`} p={3} margin="auto" borderRadius={1} mt={5}>
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
                                                  displayName: e.target.value,
                                             });
                                        }}
                                   />
                              </Box>
                         </Grid>
                         <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                              <AppInput
                                   label="Enter State"
                                   value={accommodation?.state}
                                   onChange={(e) => {
                                        setAccommodation({
                                             city: e.target.validationMessage,
                                             state: e.target.value,
                                             SubCategory: accommodation.SubCategory,
                                             displayName: accommodation.displayName,
                                        });
                                   }}
                              />
                         </Grid>
                         <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                              <AppInput
                                   label="Enter City"
                                   value={accommodation?.city}
                                   onChange={(e) => {
                                        setAccommodation({
                                             city: e.target.value,
                                             state: accommodation.state,
                                             SubCategory: accommodation.SubCategory,
                                             displayName: accommodation.displayName,
                                        });
                                   }}
                              />
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
