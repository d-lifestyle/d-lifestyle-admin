import { createSlice } from "@reduxjs/toolkit";
import { CruisePackageProps, DataStateProps } from "../../interface";
import { DeleteCruiseAction, ListCruiseAction, ListCruiseByIdAction, UpdateCruiseAction } from "../action";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const InitialState: DataStateProps<CruisePackageProps> = {
     data: [] as CruisePackageProps[],
     error: "",
     loading: false,
     single: {} as CruisePackageProps,
     success: "",
};

const CruiseSlice = createSlice({
     initialState: InitialState,
     name: "cruise",
     reducers: {},
     extraReducers(builder) {
          builder
               .addCase(ListCruiseAction.fulfilled, (state, action) => {
                    state.data = action.payload.data;
                    state.loading = false;
               })
               .addCase(ListCruiseAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(ListCruiseAction.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
          builder
               .addCase(ListCruiseByIdAction.fulfilled, (state, action) => {
                    state.single = action.payload;
               })
               .addCase(ListCruiseByIdAction.pending, (state, action) => {
                    state.loading = true;
               })
               .addCase(ListCruiseByIdAction.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
          builder.addCase(UpdateCruiseAction.fulfilled, (state) => {
               state.loading = true;
          });

          builder.addCase(DeleteCruiseAction.fulfilled, (state) => {
               state.loading = true;
          });
     },
});

export const CruiseReducer = CruiseSlice.reducer;
export const useCruiseSelector = () =>
     useSelector((state: RootState) => {
          return state.cruise;
     });
