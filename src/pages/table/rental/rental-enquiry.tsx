import React, { useEffect } from "react";
import { DefaultLayout } from "../../../layout";
import { useAppDispatch, useRentalSelector } from "../../../redux";
import { GetRentalEnquiryAction } from "../../../redux/action/rental.action";

export const RentalEnquiry = () => {
     const carEnquiries = useRentalSelector();
     const dispatch = useAppDispatch();

     useEffect(() => {
          (async () => {
               await dispatch(GetRentalEnquiryAction());
          })();
     }, []);

     return (
          <DefaultLayout pagetitle="Car Rental Customer's">
               {carEnquiries.data.map(({ carRentalName }) => (
                    <div>{carRentalName}</div>
               ))}
          </DefaultLayout>
     );
};
