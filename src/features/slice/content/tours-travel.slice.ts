import { createSlice } from "@reduxjs/toolkit";

import { useSelector } from "react-redux";
import { ToursTravelProps } from "../../../interface";
import { GetAllToursTravel } from "../../action";

interface InitialToursTravelProps {
     loading: boolean;
     data: ToursTravelProps[];
     error: string;
     success: string;
}

const InitialToursTravelState: InitialToursTravelProps = {
     loading: false,
     data: [],
     error: "",
     success: "",
};

const CarouselSlice = createSlice({
     name: "toursTravel",
     initialState: InitialToursTravelState,
     reducers: {},
     extraReducers(builder) {
          builder
               .addCase(GetAllToursTravel.fulfilled, (state, action) => {
                    state.data = action.payload;
                    state.loading = false;
               })
               .addCase(GetAllToursTravel.pending, (state) => {
                    state.loading = true;
               })
               .addCase(GetAllToursTravel.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
     },
});

export const ToursTravelReducer = CarouselSlice.reducer;
// export const {} = CarouselSlice.actions
export const useToursTravelSelector = () =>
     useSelector((state: any) => {
          return state.toursTravel;
     });
