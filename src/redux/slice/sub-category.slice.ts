import { createSlice } from "@reduxjs/toolkit";
import { DataStateProps, SubCategoryProps } from "../../interface";
import { ListCategoryAction, ListSubCategoryAction, ListSubCategoryByIdAction } from "../action";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const InitialState: DataStateProps<SubCategoryProps> = {
     data: [] as SubCategoryProps[],
     error: "",
     loading: false,
     single: {} as SubCategoryProps,
     success: "",
};

const SubCategorySlice = createSlice({
     initialState: InitialState,
     name: "sub_category",
     reducers: {},
     extraReducers(builder) {
          builder
               .addCase(ListSubCategoryAction.fulfilled, (state, action) => {
                    state.data = action.payload.data;
                    state.loading = false;
               })
               .addCase(ListCategoryAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(ListSubCategoryAction.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
          builder
               .addCase(ListSubCategoryByIdAction.fulfilled, (state, action) => {
                    console.log(action.payload.data);
                    state.single = action.payload.data;
               })
               .addCase(ListSubCategoryByIdAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(ListSubCategoryByIdAction.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
     },
});

export const SubCategoryReducer = SubCategorySlice.reducer;
export const useSubCategorySelector = () =>
     useSelector((state: RootState) => {
          return state.sub_category;
     });
