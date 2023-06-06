import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewCarouselProps, UpdateCarouselProps } from "../../interface";
import CarouselService from "../../service/carousel.service";

export const ListCarouselAction = createAsyncThunk("carousel/all", async (_, { rejectWithValue }) => {
     try {
          const data = await CarouselService.CarouselList();
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const ListCarouselByIdAction = createAsyncThunk("carousel/id", async (props: string, { rejectWithValue }) => {
     try {
          const data = await CarouselService.CarouselListById(props);
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});
export const UploadCarouselAction = createAsyncThunk("carousel/new", async (props: NewCarouselProps, { rejectWithValue }) => {
     try {
          const data = await CarouselService.UploadCarousel(props);
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const UpdateCarouselByIdAction = createAsyncThunk("carousel/update", async (props: UpdateCarouselProps, { rejectWithValue }) => {
     try {
          const data = await CarouselService.UpdateCarouselById(props);
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});
export const DeleteCarouselByIdAction = createAsyncThunk("carousel/delete", async (props: string, { rejectWithValue }) => {
     try {
          const data = await CarouselService.DeleteCarouselById(props);
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});
