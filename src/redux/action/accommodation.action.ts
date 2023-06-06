import { createAsyncThunk } from "@reduxjs/toolkit";
import AccommodationService from "../../service/accommodations";
import { AccommodationProps, UpdateAccommodationProps } from "../../interface";

export const ListAccommodationAction = createAsyncThunk("accommodation/all", async (_, { rejectWithValue }) => {
     try {
          const data = await AccommodationService.AccommodationList();
          return await data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const ListAccommodationByIdAction = createAsyncThunk(
     "accommodation/id",
     async (props: string, { rejectWithValue }) => {
          try {
               const data = await AccommodationService.AccommodationListById(props);
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

export const UploadAccommodationAction = createAsyncThunk(
     "accommodation/new",
     async (props: AccommodationProps, { rejectWithValue }) => {
          try {
               const data = await AccommodationService.UploadAccommodation(props);
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

export const UpdateAccommodationAction = createAsyncThunk(
     "accommodation/update",
     async (props: UpdateAccommodationProps, { rejectWithValue }) => {
          try {
               const data = await AccommodationService.UpdateAccommodationById(props);
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

export const DeleteAccommodationAction = createAsyncThunk(
     "accommodation/delete",
     async (props: string, { rejectWithValue }) => {
          try {
               const data = await AccommodationService.DeleteListById(props);
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
