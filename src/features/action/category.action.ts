import { createAsyncThunk } from "@reduxjs/toolkit";

import categoryService from "../../services/category.service";
import { NewCategoryProps, UpdateCategoryProps } from "../../interface";

const GetAllCategory = createAsyncThunk("menu/all", async (state, { rejectWithValue }) => {
     try {
          const data = await categoryService.GetCategory();
          return await data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const GetCategoryById = createAsyncThunk("menu/by-id", async (props: string, { rejectWithValue }) => {
     try {
          const data = await categoryService.GetCategoryById(props);
          return await data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const AddNewCategory = createAsyncThunk("menu/new", async (props: NewCategoryProps, { rejectWithValue }) => {
     try {
          const data = await categoryService.AddCategory({
               name: props.name,
               parentCategory: props.parentCategory,
          });
          return await data.data.data;
     } catch (err: any) {
          if (err.response) {
               if (err.response.data.message.message) {
                    return rejectWithValue(await err.response.data.message.message);
               } else {
                    return rejectWithValue(await err.response.data.message);
               }
          } else {
               return rejectWithValue(await err.message);
          }
     }
});

const UpdateCategoryById = createAsyncThunk("menu/update", async (props: UpdateCategoryProps, { rejectWithValue }) => {
     try {
          const data = await categoryService.UpdateCategoryById(props);
          return await data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const DeleteCategoryById = createAsyncThunk("menu/delete", async (props: string, { rejectWithValue }) => {
     try {
          const data = await categoryService.DeleteCategoryById(props);
          return await data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               console.log(err.message);
               return rejectWithValue(err.message);
          }
     }
});

export { GetCategoryById, GetAllCategory, AddNewCategory, UpdateCategoryById, DeleteCategoryById };
