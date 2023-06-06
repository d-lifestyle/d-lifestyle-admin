import { createAsyncThunk } from "@reduxjs/toolkit";
import BlogService from "../../service/blog.service";
import { NewBlogProps, UpdateBlogProps } from "../../interface";

export const ListBlogsAction = createAsyncThunk("blog/all", async (_, { rejectWithValue }) => {
     try {
          const data = await BlogService.ListBlogs();
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const ListBlogByIdAction = createAsyncThunk("blog/id", async (props: string, { rejectWithValue }) => {
     try {
          const data = await BlogService.ListBlogsById(props);
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const UpdateBlogByIdAction = createAsyncThunk(
     "blog/update",
     async (props: UpdateBlogProps, { rejectWithValue }) => {
          try {
               const data = await BlogService.UpdateBlogsById({
                    data: {
                         body: JSON.stringify(props.data.body),
                         images: props.data.images,
                         label: props.data.images,
                    },
                    id: props.id,
               });
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

export const UploadBlogAction = createAsyncThunk("blog/new", async (props: NewBlogProps, { rejectWithValue }) => {
     try {
          const data = await BlogService.UploadBlogs({
               body: JSON.stringify(props.body),
               images: props.images,
               label: props.images,
          });
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const DeleteBlogByIdAction = createAsyncThunk("blog/delete", async (props: string, { rejectWithValue }) => {
     try {
          const data = await BlogService.DeleteBlogsById(props);
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});
