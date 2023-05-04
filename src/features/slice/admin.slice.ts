import { createSlice } from "@reduxjs/toolkit";
import { UserDataProps } from "../../interface";
import { DeleteUser, GetAdminUsers } from "../action";
import { useSelector } from "react-redux";

interface InitialUserProps {
     loading: boolean;
     data: any[];
     error: string;
     success: string;
}

const InitialUserState: InitialUserProps = {
     data: [],
     error: "",
     loading: false,
     success: "",
};

const AdminSlice = createSlice({
     name: "admin",
     initialState: InitialUserState,
     reducers: {},
     extraReducers({ addCase }) {
          addCase(GetAdminUsers.fulfilled, (state, action) => {
               state.data = action.payload;
               state.loading = false;
          })
               .addCase(GetAdminUsers.pending, (state) => {
                    state.loading = true;
               })
               .addCase(GetAdminUsers.rejected, (state, action) => {
                    state.error = action.payload as string;
               })
               .addCase(DeleteUser.fulfilled, (state, action) => {
                    state.success = action.payload;
                    state.loading = false;
               })
               .addCase(DeleteUser.pending, (state) => {
                    state.loading = true;
               })

               .addCase(DeleteUser.rejected, (state, action) => {
                    state.error = action.payload as string;
               });
     },
});

export const AdminReducer = AdminSlice.reducer;
export const useAdminSelector = () =>
     useSelector((state: any) => {
          return state.admin;
     });
