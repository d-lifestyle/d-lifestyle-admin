import { createAsyncThunk } from "@reduxjs/toolkit";

import carouselService from "../../services/carousel.service";
import { NewCarouselProps, UpdateCarouselProps } from "../../interface";

const GetAllCarousel = createAsyncThunk("carousel/all", async (state, { rejectWithValue }) => {
     try {
          const data = await carouselService.GetCarousel();
          return await data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const GetCarouselById = createAsyncThunk("carousel/by-id", async (props: string, { rejectWithValue }) => {
     try {
          const data = await carouselService.GetCarouselById(props);
          console.log(data.data.data);
          return await data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const AddNewCarousel = createAsyncThunk("carousel/new", async (props: NewCarouselProps, { rejectWithValue }) => {
     try {
          const data = await carouselService.AddCarousel(props);
          return await data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const UpdateCarouselById = createAsyncThunk(
     "carousel/update",
     async (props: UpdateCarouselProps, { rejectWithValue }) => {
          try {
               const data = await carouselService.UpdateCarouselById(props);
               return await data.data.data;
          } catch (err: any) {
               if (err.response) {
                    return rejectWithValue(err.response.data.message);
               } else {
                    return rejectWithValue(err.message);
               }
          }
     }
);

const DeleteCarouselById = createAsyncThunk("carousel/delete", async (props: string, { rejectWithValue }) => {
     try {
          const data = await carouselService.DeleteCarouselById(props);
          return await data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export { GetCarouselById, GetAllCarousel, AddNewCarousel, UpdateCarouselById, DeleteCarouselById };
