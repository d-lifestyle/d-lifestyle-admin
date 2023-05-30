import React, { useEffect, useState } from "react";

import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Typography, useTheme } from "@mui/material";

import { DefaultLayout } from "../../../layout";
import { AppButton, AppInput, AppTitleBar } from "../../../component";
import { useCategorySelector, useSubCategorySelector } from "../../../features/slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../features";
import { AddNewSubCategory, GetAllCategory, GetSubCategoryWithId } from "../../../features/action";
import { NewSubCategoryProps } from "../../../interface/sub-category.interface";
import { CategoriesProps } from "../../../interface";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const AddSubCategory = () => {
  const params = useParams()
  const categories = useCategorySelector();
  const subCategory = useSubCategorySelector()
  const { palette } = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [newSubCategory, setNewSubCategory] = useState<NewSubCategoryProps>();
  const [error, setError] = useState<string>("");

  const getAllCategories = async () => {
    await dispatch(GetAllCategory());
  };

  useEffect(() => {
    (async () => {

      await getAllCategories();
      if (params.id) {
        await dispatch(GetSubCategoryWithId(params.id))
      }
    })();
  }, []);

  const handleSubmit = async () => {
    if (!newSubCategory?.name || !newSubCategory?.CategoryId) {
      setError("all field is required");
    } else {
      const data = await dispatch(
        AddNewSubCategory({
          CategoryId: newSubCategory?.CategoryId as string,
          name: newSubCategory?.name as string,
        })
      );
      if (data.type === "subcategory/new/fulfilled") {
        enqueueSnackbar(data.payload, { variant: "success" });
        return navigate("/manage/sub-category", { replace: true });
      }
      if (data.type === "subcategory/new/rejected") {
        enqueueSnackbar(data.payload, { variant: "error" });
      }
    }
  };

  return (
    <DefaultLayout pagetitle="Manage menu">
      <AppTitleBar
        title="manage sub categories"
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
            pagepath: "/content/add",
            activepage: false,
            activetitle: "manage",
          },
          {
            pagepath: "/content/add-new/sub-category",
            activepage: true,
            activetitle: "sub category",
          },
        ]}
      />
      <Box width="60%" border={`2px solid ${palette.grey[400]}`} p={3} margin="auto" borderRadius={1} mt={5}>
        {error && (
          <Typography variant="body2" color="error" textTransform="capitalize">
            {error}
          </Typography>
        )}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
            <Box>
              <AppInput
                label="Enter sub category name"
                value={subCategory?.single?.name ? subCategory?.single?.name : newSubCategory?.name}
                onChange={(e) => {
                  setNewSubCategory({
                    CategoryId: newSubCategory?.CategoryId as string,
                    name: e.target.value,
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
                value={subCategory?.single?._id ? subCategory?.single?._id : newSubCategory?.CategoryId}
                onChange={(e) => {
                  setNewSubCategory({
                    CategoryId: subCategory?.single?._id && e.target.value,
                    name: newSubCategory?.name as string,
                  });
                }}
              >
                <MenuItem value="none">
                  <em>None</em>
                </MenuItem>
                {categories.data.map(({ _id, name }: CategoriesProps) => (
                  <MenuItem value={_id} key={_id}>
                    <Typography textTransform="capitalize">{name}</Typography>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box display="flex" flexDirection="row" gap={3} mt={3}>
          <AppButton
            fullWidth
            variant="text"
            color="error"
            type="button"
            onClick={() => navigate("/content/add")}
          >
            back
          </AppButton>
          <AppButton size="large" fullWidth type="button" onClick={() => handleSubmit()}>
            Submit
          </AppButton>
        </Box>
      </Box>
    </DefaultLayout>
  );
};

export default AddSubCategory;
