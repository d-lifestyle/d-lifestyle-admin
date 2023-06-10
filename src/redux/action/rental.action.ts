import { createAsyncThunk } from "@reduxjs/toolkit";
import { AccommodationProps, NewRentalProps, UpdateAccommodationProps, UpdateRentalProps } from "../../interface";
import RentalService from "../../service/rental.service";

export const ListRentalAction = createAsyncThunk("rental/all", async (_, { rejectWithValue }) => {
     try {
          const data = await RentalService.RentalList();
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const ListRentalByIdAction = createAsyncThunk("rental/id", async (props: string, { rejectWithValue }) => {
     try {
          const data = await RentalService.RentalListById(props);
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const UploadRentalAction = createAsyncThunk("rental/new", async (props: any, { rejectWithValue }) => {
     try {
          const data = await RentalService.UploadRental({
               carRentalName: props.carRentalName,
               image: props.image,
               location: {
                    from: props.from,
                    to: props.to,
               },
               options: props.options,
               peopleAllowed: props.peopleAllowed,
               SubCategory: props.SubCategory,
          });
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const UpdateRentalAction = createAsyncThunk(
     "rental/update",
     async (props: UpdateRentalProps, { rejectWithValue }) => {
          try {
               const data = await RentalService.UpdateRentalById(props);
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

export const DeleteRentalAction = createAsyncThunk("rental/delete", async (props: string, { rejectWithValue }) => {
     try {
          const data = await RentalService.RentalDeleteListById(props);
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});

export const GetRentalEnquiryAction = createAsyncThunk("rental/data", async (_, { rejectWithValue }) => {
     try {
          const data = await RentalService.GetRentalEnquiry();
          return await data.data;
     } catch (err: any) {
          if (err.response) {
               return rejectWithValue(err.response.data.message);
          } else {
               return rejectWithValue(err.message);
          }
     }
});
