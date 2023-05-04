import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../../services/auth.service";
import { UpdateProfileProps } from "../../../interface";

const GetUserProfile = createAsyncThunk("user/profile", async (x, { rejectWithValue }) => {
     try {
          const data = await AuthService.Profile();
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

const UpdateAdminProfile = createAsyncThunk("user/update", async (props: UpdateProfileProps, { rejectWithValue }) => {
     try {
          const data = await AuthService.UpdateAdminProfile({
               data: props.data,
               id: props.id,
          });
          console.log("success my data", data.data.data);
          return data.data.data;
     } catch (err: any) {
          console.log("err my data", err);
          if (err.response) {
               console.log("axios error", err.response.data.message);
               return rejectWithValue(err.response.data.message);
          } else {
               console.log("normal error", err.message);
               return rejectWithValue(err.message);
          }
     }
});

export { GetUserProfile, UpdateAdminProfile };
