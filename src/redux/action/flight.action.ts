import { createAsyncThunk } from "@reduxjs/toolkit";
import FlightService from "../../service/flight.service";

export const GetFlightQueryAction = createAsyncThunk("flight/all", async (_, { rejectWithValue }) => {
     try {
          const data = await FlightService.GetFlightQuery();
          return data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});
