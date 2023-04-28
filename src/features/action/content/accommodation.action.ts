import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewAccommodationProps, UpdateAccommodationProps } from "../../../interface";
import accommodationService from "../../../services/content/accommodation.server";

const GetAllAccommodation = createAsyncThunk("accommodation/all", async (state, { rejectWithValue }) => {
     try {
          const data = await accommodationService.GetAccommodation();
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const GetAccommodationById = createAsyncThunk("accommodation/by-id", async (props: string, { rejectWithValue }) => {
     try {
          const data = await accommodationService.GetAccommodationById(props);
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const AddNewAccommodation = createAsyncThunk(
     "accommodation/new",
     async (props: NewAccommodationProps, { rejectWithValue }) => {
          try {
               const data = await accommodationService.AddAccommodation(props);
               return data.data.data;
          } catch (err: any) {
               if (err.response) {
                    return rejectWithValue(err.response.data.message);
               } else {
                    return rejectWithValue(err.message);
               }
          }
     }
);

const UpdateAccommodationById = createAsyncThunk(
     "accommodation/update",
     async (props: UpdateAccommodationProps, { rejectWithValue }) => {
          try {
               const data = await accommodationService.UpdateAccommodationById(props);
               return data.data.data;
          } catch (err: any) {
               if (err.response) {
                    return rejectWithValue(err.response.data.message);
               } else {
                    return rejectWithValue(err.message);
               }
          }
     }
);

const DeleteAccommodationById = createAsyncThunk("accommodation/delete", async (props: string, { rejectWithValue }) => {
     try {
          const data = await accommodationService.DeleteAccommodationById(props);
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export {
     GetAccommodationById,
     GetAllAccommodation,
     AddNewAccommodation,
     UpdateAccommodationById,
     DeleteAccommodationById,
};
