import { createSlice } from "@reduxjs/toolkit";
import { SubCategoryProps } from "../../interface/sub-category.interface";
import { GetAllMainCategory, GetMainCategoryWithId } from "../action";
import { useSelector } from "react-redux";
import { MainCategoryProps } from "../../interface";
import { RootState } from "..";

interface InitialMainCategoryProps {
     loading: boolean;
     data: MainCategoryProps[];
     error?: string;
     single?: MainCategoryProps;
     success?: string;
     categoryData?: SubCategoryProps[];
}

const InitialMainCategoryState: InitialMainCategoryProps = {
     loading: false,
     data: [],
};

const MainCategorySlice = createSlice({
     name: "mainCategory",
     initialState: InitialMainCategoryState,
     reducers: {},
     extraReducers: {
          [GetAllMainCategory.fulfilled.type]: (state, action) => {
               state.data = action.payload;
               state.loading = false;
          },
          [GetAllMainCategory.pending.type]: (state) => {
               state.loading = true;
          },
          [GetAllMainCategory.rejected.type]: (state, action) => {
               state.error = action.payload;
          },
          [GetMainCategoryWithId.fulfilled.type]: (state, action) => {
               state.single = action.payload;
               state.loading = false;
          },

          [GetMainCategoryWithId.pending.type]: (state) => {
               state.loading = true;
          },

          [GetMainCategoryWithId.rejected.type]: (state, action) => {
               state.error = action.payload;
               state.loading = false;
          },
     },
});

export const MainCategoryReducer = MainCategorySlice.reducer;
// export const { } = SubCategorySlice.actions
export const useMainCategorySelector = () =>
     useSelector((state: RootState) => {
          return state.mainCategory;
     });
