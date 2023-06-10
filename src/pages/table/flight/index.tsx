import React, { useEffect } from "react";
import { DefaultLayout } from "../../../layout";
import { AppTitleBar } from "../../../component";
import { GetFlightQueryAction, useAppDispatch, useFlightSelector } from "../../../redux";

export const FlightTable = () => {
     const dispatch = useAppDispatch();
     const flight = useFlightSelector();

     useEffect(() => {
          (async () => {
               await dispatch(GetFlightQueryAction());
          })();
     }, [dispatch]);
     console.log(flight.data);

     return (
          <DefaultLayout pagetitle="Manage flight queries from here">
               <AppTitleBar
                    title="Manage flight queries"
                    breadcrubms={[
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "Home",
                         },
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "table",
                         },
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "flight queries",
                         },
                    ]}
               />
          </DefaultLayout>
     );
};
