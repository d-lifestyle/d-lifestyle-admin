import { createSlice } from "@reduxjs/toolkit";
import { AddNewCategory, GetAllCategory, GetCategoryById } from "../action";
import { CategoriesProps } from "../../interface";
import { useSelector } from "react-redux";
import { RootState } from "..";

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
     single: {} as CategoriesProps,
};

const CategorySlice = createSlice({
     name: "category",
     initialState: InitialMenuState,
     reducers: {
          clearSingleCategory: (state) => {
               state.single = {} as CategoriesProps;
          },
     },
     extraReducers: (builder) => {
          builder
               .addCase(GetAllCategory.fulfilled, (state, action) => {
                    state.data = action.payload;
                    state.loading = false;
               })
               .addCase(GetAllCategory.pending, (state) => {
                    state.loading = true;
               })
               .addCase(GetAllCategory.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
          builder
               .addCase(GetCategoryById.fulfilled, (state, action) => {
                    state.single = {} as CategoriesProps;
                    state.single = action.payload;
               })
               .addCase(GetCategoryById.pending, (state) => {
                    state.loading = true;
               })
               .addCase(GetCategoryById.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
     },
});

export const CategoryReducer = CategorySlice.reducer;
export const { clearSingleCategory } = CategorySlice.actions;
export const useCategorySelector = () =>
     useSelector((state: RootState) => {
          return state.category;
     });
