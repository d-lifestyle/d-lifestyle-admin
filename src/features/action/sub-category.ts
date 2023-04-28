import { createAsyncThunk } from "@reduxjs/toolkit";

import subCategory from "../../services/sub-category.service";
import { NewSubCategoryProps, UpdateSubCategoryProps } from "../../interface/sub-category.interface";

const GetAllSubCategory = createAsyncThunk("subcategory/all", async (state, { rejectWithValue }) => {
     try {
          const data = await subCategory.GetSubCategory();
          console.log(data.data.data);
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const GetSubCategoryWithId = createAsyncThunk("subcategory/by-id", async (props: string, { rejectWithValue }) => {
     try {
          const data = await subCategory.GetSubCategoryById(props);
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const AddNewSubCategory = createAsyncThunk(
     "subcategory/new",
     async (props: NewSubCategoryProps, { rejectWithValue }) => {
          try {
               const data = await subCategory.AddSubCategory(props);
               return data.data.data;
          } catch (err: any) {
               if (err.response) {
                    return rejectWithValue(err.response.data.message);
               } else {
                    return rejectWithValue(err.message);
               }
          }
     }
);

const UpdateSubCategoryById = createAsyncThunk(
     "subcategory/update",
     async (props: UpdateSubCategoryProps, { rejectWithValue }) => {
          try {
               const data = await subCategory.UpdateSubCategoryById(props);
               return data.data.data;
          } catch (err: any) {
               if (err.response) {
                    return rejectWithValue(err.response.data.message);
               } else {
                    return rejectWithValue(err.message);
               }
          }
     }
);

const DeleteSubCategoryById = createAsyncThunk("subcategory/delete", async (props: string, { rejectWithValue }) => {
     try {
          const data = await subCategory.DeleteSubCategoryById(props);
          return await data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const SubCategoryWithCategoryId = createAsyncThunk(
     "subcategory/category",
     async (props: string, { rejectWithValue }) => {
          try {
               const data = await subCategory.GetSubCategoryWithCategoryId(props);
               console.log("sub category", await data.data.data);
               return await data.data.data;
          } catch (err: any) {
               if (err.response) {
                    return rejectWithValue(err.response.data.message);
               } else {
                    return rejectWithValue(err.message);
               }
          }
     }
);

export {
     AddNewSubCategory,
     DeleteSubCategoryById,
     GetAllSubCategory,
     GetSubCategoryWithId,
     UpdateSubCategoryById,
     SubCategoryWithCategoryId,
};
