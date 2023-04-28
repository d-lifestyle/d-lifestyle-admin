import { createSlice } from "@reduxjs/toolkit";
import { AddNewCategory, GetAllCategory, GetCategoryById } from "../action";
import { CategoriesProps } from "../../interface";
import { useSelector } from "react-redux";

interface InitialMenuProps {
     loading: boolean;
     data: CategoriesProps[];
     error?: string;
     success?: string;
     single?: CategoriesProps;
}

const InitialMenuState: InitialMenuProps = {
     loading: false,
     data: [],
     error: "",
     success: "",
};

const CategorySlice = createSlice({
     name: "category",
     initialState: InitialMenuState,
     reducers: {},
     extraReducers: {
          [GetAllCategory.fulfilled.type]: (state, action) => {
               state.data = action.payload;
               state.loading = false;
          },
          [GetAllCategory.pending.type]: (state) => {
               state.loading = true;
          },
          [GetAllCategory.rejected.type]: (state, action) => {
               state.error = action.payload as string;
          },
          [GetCategoryById.fulfilled.type]: (state, action) => {
               state.single = action.payload;
               state.loading = true;
          },
          [GetCategoryById.pending.type]: (state) => {
               state.loading = true;
          },
          [GetCategoryById.rejected.type]: (state, action) => {
               state.error = action.payload as string;
          },
          [AddNewCategory.fulfilled.type]: (state, action) => {
               console.log(action.payload);
               state.success = action.payload;
               state.loading = false;
               state.error = "";
          },
          [AddNewCategory.pending.type]: (state) => {
               state.loading = true;
          },
          [AddNewCategory.rejected.type]: (state, action) => {
               state.error = action.payload;
               state.loading = false;
          },
     },
});

export const CategoryReducer = CategorySlice.reducer;
// export const {} = MenuSlice.actions
export const useCategorySelector = () =>
     useSelector((state: any) => {
          return state.category;
     });
