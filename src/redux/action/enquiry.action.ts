import { createAsyncThunk } from "@reduxjs/toolkit";
import { EnquiryFormProps } from "../../interface";
import EnquiryService from "../../service/enquiry";

export const MakeEnquiryAction = createAsyncThunk(
     "enquiry/make",
     async ({ checkIn, checkOut, dataId, email, fullName, phone, body }: EnquiryFormProps, { rejectWithValue }) => {
          try {
               const data = await EnquiryService.MakeEnquiry({
                    checkIn,
                    checkOut,
                    dataId,
                    email,
                    fullName,
                    phone,
                    body,
               });
               return await data.data;
          } catch (err: any) {
               if (err.response) {
                    return rejectWithValue(err.response.data.message);
               } else {
                    return rejectWithValue(err.message);
               }
          }
     }
);
