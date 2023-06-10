import { createSlice } from "@reduxjs/toolkit";
import { DataStateProps, FlightProps } from "../../interface";
import { GetFlightQueryAction } from "../action";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const InitialFlightState: DataStateProps<FlightProps> = {
     data: [] as FlightProps[],
     error: "",
     loading: false,
     single: {} as FlightProps,
     success: "",
};

const FlightSlice = createSlice({
     name: "flight",
     initialState: InitialFlightState,
     reducers: {},
     extraReducers(builder) {
          builder
               .addCase(GetFlightQueryAction.fulfilled, (state, action) => {
                    state.success = action.payload.data;
               })
               .addCase(GetFlightQueryAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(GetFlightQueryAction.rejected, (state, action) => {
                    state.error = (action.payload as any).data as string;
               });
     },
});

export const FlightReducer = FlightSlice.reducer;
export const useFlightSelector = () =>
     useSelector((state: RootState) => {
          return state.flight;
     });
