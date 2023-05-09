import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../../layout";
import { AppButton, AppInput, AppTitleBar } from "../../../component";
import { MainCategoryProps, NewCategoryProps } from "../../../interface";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../features";
import { useCategorySelector, useMainCategorySelector } from "../../../features/slice";
import { AddNewCategory, GetAllMainCategory } from "../../../features/action";
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddCategory = () => {
     const [category, setCategory] = useState<NewCategoryProps>({
          name: "",
          parentCategory: "",
     });
     const categoryData = useCategorySelector();
     const navigate = useNavigate();
     const { palette } = useTheme();
     const dispatch = useDispatch<AppDispatch>();
     const mainCategory = useMainCategorySelector();

     useEffect(() => {
          (async () => {
               await dispatch(GetAllMainCategory());
          })();
     }, [dispatch]);

     const handleSubmit = async () => {
          await dispatch(AddNewCategory(category));
          navigate("/manage/category", { replace: true });
     };

     return (
          <DefaultLayout pagetitle="Add categories">
               <AppTitleBar
                    title="Create Category"
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
                              pagepath: "/manage/category",
                              activepage: true,
                              activetitle: "category",
                         },
                    ]}
               />

               <Box width="60%" border={`2px solid ${palette.grey[400]}`} p={3} margin="auto" borderRadius={1} mt={5}>
                    <Grid container spacing={3}>
                         <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                              {categoryData?.error?.length !== 0 && (
                                   <Typography color="red">{categoryData.error}</Typography>
                              )}
                              <Box>
                                   <AppInput
                                        label="Enter Category Name"
                                        value={category?.name}
                                        onChange={(e) => {
                                             setCategory({
                                                  name: e.target.value,
                                                  parentCategory: category.parentCategory,
                                             });
                                        }}
                                   />
                              </Box>
                         </Grid>
                         <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
                              <FormControl variant="outlined" fullWidth sx={{ mt: 1 }}>
                                   <InputLabel id="new-sub-category">Select Parent Category</InputLabel>
                                   <Select
                                        labelId="new-sub-category"
                                        id="new-sub-category"
                                        name="parentCategory"
                                        value={category?.parentCategory}
                                        onChange={(e) => {
                                             setCategory({
                                                  parentCategory: e.target.value,
                                                  name: category?.name as string,
                                             });
                                        }}
                                   >
                                        <MenuItem value="none">
                                             <em>None</em>
                                        </MenuItem>
                                        {mainCategory.data.map(({ _id, displayName }: MainCategoryProps) => (
                                             <MenuItem value={_id} key={_id}>
                                                  <Typography textTransform="capitalize">{displayName}</Typography>
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

export default AddCategory;
