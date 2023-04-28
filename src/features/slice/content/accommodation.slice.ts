import { createSlice } from "@reduxjs/toolkit";

import { useSelector } from "react-redux";
import { AccommodationProps } from "../../../interface";
import { GetAllAccommodation } from "../../action";

interface InitialAccommodationProps {
     loading: boolean;
     data: AccommodationProps[];
     error: string;
     success: string;
}

const InitialAccommodationState: InitialAccommodationProps = {
     loading: false,
     data: [],
     error: "",
     success: "",
};

const CarouselSlice = createSlice({
     name: "accommodation",
     initialState: InitialAccommodationState,
     reducers: {},
     extraReducers(builder) {
          builder
               .addCase(GetAllAccommodation.fulfilled, (state, action) => {
                    state.data = action.payload;
                    state.loading = false;
               })
               .addCase(GetAllAccommodation.pending, (state) => {
                    state.loading = true;
               })
               .addCase(GetAllAccommodation.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
     },
});

export const AccommodationReducer = CarouselSlice.reducer;
// export const {} = CarouselSlice.actions
export const useAccommodationSelector = () =>
     useSelector((state: any) => {
          return state.accommodation;
     });
