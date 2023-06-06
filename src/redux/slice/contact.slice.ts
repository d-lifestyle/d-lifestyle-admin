import { createSlice } from "@reduxjs/toolkit";
import { ContactFormProps, ContactProps, DataStateProps } from "../../interface";
import { GetContactAction } from "../action";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const InitialState: DataStateProps<ContactFormProps> = {
     data: [] as ContactFormProps[],
     error: "",
     loading: false,
     single: {} as ContactFormProps,
     success: "",
};

const ContactSlice = createSlice({
     initialState: InitialState,
     name: "contact",
     reducers: {},
     extraReducers(builder) {
          builder
               .addCase(GetContactAction.fulfilled, (state, action) => {
                    state.data = action.payload.data;
                    state.loading = true;
               })
               .addCase(GetContactAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(GetContactAction.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
     },
});

export const ContactReducer = ContactSlice.reducer;
export const useContactSelector = () =>
     useSelector((state: RootState) => {
          return state.contact;
     });
