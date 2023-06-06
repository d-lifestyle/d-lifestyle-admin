import { createSlice } from "@reduxjs/toolkit";
import { DataStateProps } from "./accommodation.slice";
import { BlogProps } from "../../interface";
import { ListBlogByIdAction, ListBlogsAction } from "../action/blog.action";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const InitialState: DataStateProps<BlogProps> = {
     data: [] as BlogProps[],
     error: "",
     loading: false,
     single: {} as BlogProps,
     success: "",
     image: [],
};

const BlogSlice = createSlice({
     initialState: InitialState,
     name: "blog",
     reducers: {
          ClearState: (state) => {
               state.single = {} as BlogProps;
          },
     },
     extraReducers(builder) {
          builder
               .addCase(ListBlogsAction.fulfilled, (state, action) => {
                    state.data = action.payload.data;
                    state.loading = false;
               })
               .addCase(ListBlogsAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(ListBlogsAction.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
          builder
               .addCase(ListBlogByIdAction.fulfilled, (state, action) => {
                    state.single = action.payload.data;
               })
               .addCase(ListBlogByIdAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(ListBlogByIdAction.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
     },
});

export const BlogReducer = BlogSlice.reducer;
export const { ClearState } = BlogSlice.actions;
export const useBlogSelector = () =>
     useSelector((state: RootState) => {
          return state.blog;
     });
