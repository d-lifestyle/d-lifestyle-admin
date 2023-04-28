import { createSlice } from "@reduxjs/toolkit";
import { SubCategoryProps } from "../../interface/sub-category.interface";
import { GetAllSubCategory, GetSubCategoryWithId, SubCategoryWithCategoryId } from "../action";
import { useSelector } from "react-redux";

interface InitialSubCategoryProps {
     loading: boolean;
     data: SubCategoryProps[];
     error?: string;
     single?: SubCategoryProps;
     success?: string;
     categoryData?: SubCategoryProps[];
}

const InitialSubCategoryState: InitialSubCategoryProps = {
     loading: false,
     data: [],
};

const SubCategorySlice = createSlice({
     name: "subcategory",
     initialState: InitialSubCategoryState,
     reducers: {},
     extraReducers: {
          [GetAllSubCategory.fulfilled.type]: (state, action) => {
               state.data = action.payload;
               state.loading = false;
          },
          [GetAllSubCategory.pending.type]: (state) => {
               state.loading = true;
          },
          [GetAllSubCategory.rejected.type]: (state, action) => {
               state.error = action.payload;
          },
          [GetSubCategoryWithId.fulfilled.type]: (state, action) => {
               state.single = action.payload;
               state.loading = false;
          },

          [GetSubCategoryWithId.pending.type]: (state) => {
               state.loading = true;
          },
          [GetSubCategoryWithId.rejected.type]: (state, action) => {
               state.error = action.payload;
               state.loading = false;
          },
          [SubCategoryWithCategoryId.fulfilled.type]: (state, action) => {
               state.categoryData = action.payload;
               state.loading = false;
          },
          [SubCategoryWithCategoryId.pending.type]: (state) => {
               state.loading = true;
          },
          [SubCategoryWithCategoryId.rejected.type]: (state, action) => {
               state.error = action.payload;
          },
     },
});

export const SubCategoryReducer = SubCategorySlice.reducer;
// export const { } = SubCategorySlice.actions
export const useSubCategorySelector = () =>
     useSelector((state: any) => {
          return state.subcategory;
     });
