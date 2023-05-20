import { createSlice } from "@reduxjs/toolkit";
import { GetContactAction } from "../action";
import { ContactFormProps, EnquiryFormProps } from "../../interface";
import { useSelector } from "react-redux";
import { RootState } from "..";
import { GetAllEnquiryAction } from "../action/enquiry.action";

const GeneralSlice = createSlice({
     initialState: {
          contacts: [] as ContactFormProps[],
          enquiry: [] as EnquiryFormProps[],
          error: "",
          loading: false,
     },
     name: "general",
     reducers: {},
     extraReducers(builder) {
          builder
               .addCase(GetContactAction.fulfilled, (state, action) => {
                    state.contacts = action.payload;
                    state.loading = false;
               })
               .addCase(GetContactAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(GetContactAction.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
          builder
               .addCase(GetAllEnquiryAction.fulfilled, (state, action) => {
                    state.enquiry = action.payload;
                    state.loading = false;
               })
               .addCase(GetAllEnquiryAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(GetAllEnquiryAction.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
     },
});

export const GeneralReducer = GeneralSlice.reducer;
// export const {} = GeneralSlice.actions
export const useGeneralSelector = () =>
     useSelector((state: RootState) => {
          return state.general;
     });
