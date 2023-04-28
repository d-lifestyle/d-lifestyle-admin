import { createAsyncThunk } from "@reduxjs/toolkit";

import mainCategory from "../../services/main-category.service";
import { NewMainCategoryProps, UpdateMainCategoryProps } from "../../interface/";

const GetAllMainCategory = createAsyncThunk("mainCategory/all", async (state, { rejectWithValue }) => {
     try {
          const data = await mainCategory.GetMainCategory();
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const GetMainCategoryWithId = createAsyncThunk("mainCategory/by-id", async (props: string, { rejectWithValue }) => {
     try {
          const data = await mainCategory.GetMainCategoryById(props);
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const AddNewMainCategory = createAsyncThunk(
     "mainCategory/new",
     async (props: NewMainCategoryProps, { rejectWithValue }) => {
          try {
               const data = await mainCategory.AddMainCategory(props);
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

const UpdateMainCategoryById = createAsyncThunk(
     "mainCategory/update",
     async (props: UpdateMainCategoryProps, { rejectWithValue }) => {
          try {
               const data = await mainCategory.UpdateMainCategoryById(props);
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

const DeleteMainCategoryById = createAsyncThunk("mainCategory/delete", async (props: string, { rejectWithValue }) => {
     try {
          const data = await mainCategory.DeleteMainCategoryById(props);
          return await data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export {
     AddNewMainCategory,
     GetAllMainCategory,
     GetMainCategoryWithId,
     UpdateMainCategoryById,
     DeleteMainCategoryById,
};
