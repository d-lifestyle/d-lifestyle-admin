import { createAsyncThunk } from "@reduxjs/toolkit";
import { NewToursTravelProps, UpdateToursTravelProps } from "../../../interface";
import toursTravelServices from "../../../services/content/tours-travel.service";

const GetAllToursTravel = createAsyncThunk("toursTravel/all", async (state, { rejectWithValue }) => {
     try {
          const data = await toursTravelServices.GetToursTravel();
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const GetToursTravelById = createAsyncThunk("toursTravel/by-id", async (props: string, { rejectWithValue }) => {
     try {
          const data = await toursTravelServices.GetToursTravelById(props);
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const AddNewToursTravel = createAsyncThunk(
     "toursTravel/new",
     async (props: NewToursTravelProps, { rejectWithValue }) => {
          try {
               const data = await toursTravelServices.AddToursTravel(props);
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

const UpdateToursTravelById = createAsyncThunk(
     "toursTravel/update",
     async (props: UpdateToursTravelProps, { rejectWithValue }) => {
          try {
               const data = await toursTravelServices.UpdateToursTravelById(props);
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

const DeleteToursTravelById = createAsyncThunk("toursTravel/delete", async (props: string, { rejectWithValue }) => {
     try {
          const data = await toursTravelServices.DeleteToursTravelById(props);
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export { GetToursTravelById, GetAllToursTravel, AddNewToursTravel, UpdateToursTravelById, DeleteToursTravelById };
