import { createAsyncThunk } from "@reduxjs/toolkit";
import SubCategoryService from "../../service/sub-category";
import { NewSubCategoryProps, UpdateSubCategoryProps } from "../../interface";

export const ListSubCategoryAction = createAsyncThunk("sub_category/all", async (_, { rejectWithValue }) => {
     try {
          const data = await SubCategoryService.SubCategoryList();
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const ListSubCategoryByIdAction = createAsyncThunk(
     "sub_category/id",
     async (props: string, { rejectWithValue }) => {
          try {
               const data = await SubCategoryService.SubCategoryListById(props);
               return await data.data;
          } catch (err: any) {
               if (err.response) {
                    return rejectWithValue(err.response.data.message);
               } else {
                    return rejectWithValue(err.message);
               }
          }
     }
);

export const ListSubCategoryByCategoryIdAction = createAsyncThunk(
     "sub_category/categoryData",
     async (categoryId: string, { rejectWithValue }) => {
          try {
               const data = await SubCategoryService.ListSubCategoriesByCategoryId(categoryId);
               return data.data;
          } catch (err: any) {
               if (err.response) {
                    return rejectWithValue(err.response.data.message);
               } else {
                    return rejectWithValue(err.message);
               }
          }
     }
);

export const UploadSubCategoryAction = createAsyncThunk(
     "sub_category/new",
     async (props: NewSubCategoryProps, { rejectWithValue }) => {
          try {
               const data = await SubCategoryService.UploadSubCategory(props);
               return await data.data;
          } catch (err: any) {
               if (err.response) {
                    return rejectWithValue(err.response.data.message);
               } else {
                    return rejectWithValue(err.message);
               }
          }
     }
);

export const UpdateSubCategoryAction = createAsyncThunk(
     "sub_category/update",
     async (props: UpdateSubCategoryProps, { rejectWithValue }) => {
          try {
               const data = await SubCategoryService.UpdateSubCategory(props);
               return await data.data;
          } catch (err: any) {
               if (err.response) {
                    return rejectWithValue(err.response.data.message);
               } else {
                    return rejectWithValue(err.message);
               }
          }
     }
);

export const DeleteSubCategoryAction = createAsyncThunk(
     "sub_category/delete",
     async (props: string, { rejectWithValue }) => {
          try {
               const data = await SubCategoryService.DeleteSubCategory(props);
               return await data.data;
          } catch (err: any) {
               if (err.response) {
                    return rejectWithValue(err.response.data.message);
               } else {
                    return rejectWithValue(err.message);
               }
          }
     }
);
