import { createAsyncThunk } from "@reduxjs/toolkit";
import EnquiryService from "../../services/enquiry.service";

export const GetAllEnquiryAction = createAsyncThunk("general/enquiry", async (_, { rejectWithValue }) => {
     try {
          const data = await EnquiryService.GetAllEnquiry();
          return data.data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const MakeEnquiryFavoriteAction = createAsyncThunk(
     "general/enquiry_favorite",
     async (props: string, { rejectWithValue }) => {
          try {
               const data = await EnquiryService.MakeEnquiryFavorite(props);
               return data.data.data;
          } catch (err: any) {
               if (err.response) {
                    return rejectWithValue(err.response.data.message);
               } else {
                    return rejectWithValue(err.message);
               }
          }
     }
);

export const DeleteEnquiryAction = createAsyncThunk(
     "general/enquiry_delete",
     async (props: string, { rejectWithValue }) => {
          try {
               const data = await EnquiryService.DeleteEnquiry(props);
               return data.data.data;
          } catch (err: any) {
               if (err.response) {
                    return rejectWithValue(err.response.data.message);
               } else {
                    return rejectWithValue(err.message);
               }
          }
     }
);
