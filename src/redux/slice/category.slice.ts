import { createSlice } from "@reduxjs/toolkit";
import { CategoriesProps, DataStateProps } from "../../interface";
import { ListCategoryAction, ListCategoryByIdAction, UpdateCategoryAction, UploadCategoryAction } from "../action";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const InitialState: DataStateProps<CategoriesProps> = {
     data: [] as CategoriesProps[],
     error: "",
     loading: false,
     single: {} as CategoriesProps,
     success: "",
};

const CategorySlice = createSlice({
     initialState: InitialState,
     name: "category",
     reducers: {
          callInitialState: (state) => {
               state.single = {} as CategoriesProps;
          },
     },
     extraReducers(builder) {
          builder
               .addCase(ListCategoryAction.fulfilled, (state, action) => {
                    console.log(action.payload.data);
                    state.data = action.payload.data;
                    state.loading = false;
               })
               .addCase(ListCategoryAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(ListCategoryAction.rejected, (state, action) => {
                    state.error = (action.payload as any).data as string;
               });
          builder
               .addCase(ListCategoryByIdAction.fulfilled, (state, action) => {
                    state.single = action.payload.data;
               })
               .addCase(ListCategoryByIdAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(ListCategoryByIdAction.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
          builder.addCase(UploadCategoryAction.fulfilled, (state, action) => {
               state.success = action.payload.data;
          });
          builder
               .addCase(UpdateCategoryAction.fulfilled, (state, action) => {
                    state.success = action.payload.data;
               })
               .addCase(UpdateCategoryAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(UpdateCategoryAction.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
     },
});

export const CategoryReducer = CategorySlice.reducer;
export const { callInitialState } = CategorySlice.actions;
export const useCategorySelector = () =>
     useSelector((state: RootState) => {
          return state.category;
     });
