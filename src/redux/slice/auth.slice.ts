import { createSlice } from "@reduxjs/toolkit";
import { GetAdminContentAction, LogOutAction, LoginAction } from "../action";
import { RootState } from "../store";
import { useSelector } from "react-redux";

interface Props {
     email: string;
     password: string;
     firstName: string;
     lastName: string;
}

export interface AuthSliceProps {
     user: Props;
     authenticated: boolean;
     token: string;
     loading?: boolean;
     error: string;
     content: any;
}

const InitialAuthState: AuthSliceProps = {
     authenticated: false,
     user: {} as Props,
     token: "",
     error: "",
     content: {} as any,
};

const AuthSlice = createSlice({
     initialState: InitialAuthState,
     name: "auth",
     reducers: {
          GlobalLogin: (state, action) => {
               const parsedItems = JSON.parse(action.payload.user as any);
               state.authenticated = true;
               state.token = JSON.parse(action.payload.token as any);
               if (parsedItems) {
                    state.user = {
                         email: parsedItems?.email,
                         password: parsedItems?.password,
                         firstName: parsedItems?.firstName,
                         lastName: parsedItems?.lastName,
                    };
               }
          },
     },
     extraReducers(builder) {
          builder
               .addCase(LoginAction.fulfilled, (state) => {
                    state.loading = false;
               })
               .addCase(LoginAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(LoginAction.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
               });
          builder.addCase(LogOutAction.fulfilled, (state) => {
               state.authenticated = false;
               state.token = "";
               state.user = {} as Props;
               localStorage.removeItem("user");
               localStorage.removeItem("token");
          });
          builder
               .addCase(GetAdminContentAction.fulfilled, (state, action) => {
                    state.content = action.payload.data;
                    state.loading = false;
               })
               .addCase(GetAdminContentAction.pending, (state) => {
                    state.loading = true;
               })
               .addCase(GetAdminContentAction.rejected, (state, action) => {
                    state.error = (action.payload as any).data as string;
               });
     },
});

export const AuthReducer = AuthSlice.reducer;
export const { GlobalLogin } = AuthSlice.actions;
export const useAuthSelector = () =>
     useSelector((state: RootState) => {
          return state.auth;
     });
