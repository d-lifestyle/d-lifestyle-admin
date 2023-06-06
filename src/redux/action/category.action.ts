import { createAsyncThunk } from "@reduxjs/toolkit";
import CategoryService from "../../service/categories";
import { NewCategoryProps, UpdateCategoryProps } from "../../interface";

export const ListCategoryAction = createAsyncThunk("category/all", async (_, { rejectWithValue }) => {
     try {
          const data = await CategoryService.CategoryList();
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const ListCategoryByIdAction = createAsyncThunk("category/id", async (props: string, { rejectWithValue }) => {
     try {
          const data = await CategoryService.CategoryListById(props);
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const UploadCategoryAction = createAsyncThunk(
     "category/new",
     async (props: NewCategoryProps, { rejectWithValue }) => {
          try {
               const data = await CategoryService.UploadCategory(props);
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

export const UpdateCategoryAction = createAsyncThunk(
     "category/update",
     async (props: UpdateCategoryProps, { rejectWithValue }) => {
          try {
               const data = await CategoryService.UpdateCategory(props);
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

export const DeleteCategoryAction = createAsyncThunk("category/delete", async (props: string, { rejectWithValue }) => {
     try {
          const data = await CategoryService.DeleteCategory(props);
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});
