import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginProps } from "../../interface";
import AuthService from "../../service/auth.service";

export const LoginAction = createAsyncThunk("auth/login", async (props: LoginProps, { rejectWithValue }) => {
     try {
          const data = await AuthService.Login({
               email: props.email,
               password: props.password,
          });
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const LogOutAction = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
     try {
          const data = await AuthService.Logout();
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const GetAdminContentAction = createAsyncThunk("auth/content", async (_, { rejectWithValue }) => {
     try {
          const data = await AuthService.GetAdminContent();
          return data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});
