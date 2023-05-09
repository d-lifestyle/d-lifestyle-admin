import { createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../../services/auth.service";
import { UpdateProfileProps } from "../../../interface";

const GetUserProfile = createAsyncThunk("user/profile", async (_, { rejectWithValue }) => {
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
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export { GetUserProfile, UpdateAdminProfile };
