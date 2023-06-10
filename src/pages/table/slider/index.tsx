import React, { useEffect, useState } from "react";

import { Box, Grid, IconButton, TablePagination, Typography, useTheme } from "@mui/material";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useCarouselSelector } from "../../../redux";
import { DeleteCarouselByIdAction, ListCarouselAction } from "../../../redux/action/carousel.action";
import { DefaultLayout } from "../../../layout";
import { AppButton, AppNoData, AppTitleBar, Loader } from "../../../component";
import { enqueueSnackbar } from "notistack";

export const SliderTable = () => {
     const carousel = useCarouselSelector();
     const dispatch = useAppDispatch();
     const { palette, shadows } = useTheme();
     const navigate = useNavigate();

     // Pagination state
     const [rowsPerPage, setRowsPerPage] = useState<number>(10);
     const [page, setPage] = React.useState(0);

     const handleChangePage = (event: unknown, newPage: number) => {
          setPage(newPage);
     };

     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
     };

     useEffect(() => {
          (async () => {
               await dispatch(ListCarouselAction());
          })();
     }, [dispatch]);

     const DeleteCarousel = async (id: string) => {
          const data = await dispatch(DeleteCarouselByIdAction(id));
          if (data.type === "carousel/delete/fulfilled") {
               await dispatch(ListCarouselAction());
               return enqueueSnackbar(data.payload.data, { variant: "success" });
          }
          if (data.type === "carousel/delete/rejected") {
               return enqueueSnackbar(data.payload.data, { variant: "error" });
          }
     };
     return (
          <DefaultLayout pagetitle="Slider table">
               <AppTitleBar
                    title="Manage slider"
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
                              activetitle: "slider",
                         },
                    ]}
               />
               {carousel.data.length !== 0 && (
                    <Box mt={5}>
                         <Typography>Actions : </Typography>
                         <Box display="flex" gap={3} mt={3}>
                              <AppButton onClick={() => navigate("/new/slider")}>Upload new slider</AppButton>
                              <AppButton>Export CSV / Excel</AppButton>
                              <AppButton color="error">Delete All Records</AppButton>
                         </Box>
                         <Grid container spacing={3} mt={5}>
                              {carousel.data.map(({ dataAlt, dataImage, _id }) => (
                                   <Grid item key={_id} xs={12} sm={12} md={6} xl={4} lg={4}>
                                        <Box
                                             boxShadow={shadows[10]}
                                             display="flex"
                                             justifyContent="center"
                                             alignItems="center"
                                             position="relative"
                                        >
                                             <img src={dataImage} width="100%" alt={dataImage} />
                                             <Box
                                                  position="absolute"
                                                  bottom={10}
                                                  right={10}
                                                  px={5}
                                                  py={2}
                                                  bgcolor="rgba(0,0,0,0.5)"
                                             >
                                                  <Typography textTransform="capitalize" color="#fff">
                                                       {dataAlt}
                                                  </Typography>
                                             </Box>
                                        </Box>
                                   </Grid>
                              ))}
                         </Grid>
                    </Box>
               )}
               <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={carousel.data.length}
                    sx={{
                         bgcolor: "grey",
                         marginTop: 5,
                    }}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
               />

               {carousel.loading && !carousel.data.length && <Loader />}
               {!carousel.loading && !carousel.data.length && <AppNoData dataTitle="slider" pathName="slider" />}
          </DefaultLayout>
     );
};
