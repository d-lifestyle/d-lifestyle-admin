import {
     Box,
     Paper,
     Table,
     TableBody,
     TableCell,
     TableContainer,
     TableHead,
     TablePagination,
     TableRow,
     Typography,
     useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../../layout";
import { AppButton, AppTitleBar } from "../../../component";
import { useCarouselSelector } from "../../../features/slice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../features";
import { DeleteCarouselById, GetAllCarousel } from "../../../features/action";

import { useNavigate } from "react-router-dom";
import { CarouselProps } from "../../../interface";
import moment from "moment";
import { AiFillDelete } from "react-icons/ai";

const ManageCarousel = () => {
     const carousel = useCarouselSelector();
     const dispatch = useDispatch<AppDispatch>();
     const navigate = useNavigate();
     const [rowsPerPage, setRowsPerPage] = useState<number>(10);

     const [page, setPage] = React.useState(0);

     const { palette, shadows } = useTheme();
     const getAllCarousel = async () => {
          await dispatch(GetAllCarousel());
     };

     useEffect(() => {
          (async () => {
               await getAllCarousel();
          })();
     }, [dispatch]);

     const handleChangePage = (event: unknown, newPage: number) => {
          setPage(newPage);
     };

     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
     };
     const deleteCarousel = async (id: string) => {
          await dispatch(DeleteCarouselById(id));
          await getAllCarousel();
     };

     return (
          <DefaultLayout pagetitle="Manage banners">
               <AppTitleBar
                    title="Manage carousels"
                    breadcrubms={[
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "Home",
                         },
                         {
                              pagepath: "/content/manage",
                              activepage: false,
                              activetitle: "manage",
                         },
                         {
                              pagepath: "/manage/carousel",
                              activepage: true,
                              activetitle: "carousel",
                         },
                    ]}
               />
               <Box mt={3} display="flex" flexDirection="row" gap={3} alignItems="center" justifyContent="end">
                    <AppButton onClick={() => navigate("/add/carousel", { replace: true })}>
                         Create new carousel
                    </AppButton>
               </Box>
               {!carousel.loading && carousel.data?.length !== 0 && (
                    <Box>
                         <TableContainer component={Paper} sx={{ mt: 5 }}>
                              <Table aria-label="simple table">
                                   <TableHead sx={{ bgcolor: palette.primary.light }}>
                                        <TableRow>
                                             <TableCell>Sr No.</TableCell>
                                             <TableCell align="left">Images</TableCell>
                                             <TableCell align="left">Title</TableCell>
                                             <TableCell align="left">Upload On</TableCell>
                                             <TableCell align="left">Actions</TableCell>
                                        </TableRow>
                                   </TableHead>
                                   <TableBody>
                                        {carousel.data
                                             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                             .map(
                                                  (
                                                       { dataAlt, dataImage, _id, createdAt }: CarouselProps,
                                                       i: number
                                                  ) => (
                                                       <TableRow
                                                            key={i + 1}
                                                            sx={{
                                                                 "&:last-child td, &:last-child th": { border: 0 },
                                                            }}
                                                       >
                                                            <TableCell scope="row" width={50}>
                                                                 {i + 1}
                                                            </TableCell>
                                                            <TableCell align="left" width={150}>
                                                                 <img
                                                                      src={dataImage}
                                                                      width="100%"
                                                                      style={{
                                                                           borderRadius: 10,
                                                                           boxShadow: shadows[15],
                                                                      }}
                                                                      alt={dataAlt}
                                                                 />
                                                            </TableCell>
                                                            <TableCell align="left" width={400}>
                                                                 <Typography variant="h6" fontWeight="300">
                                                                      {dataAlt}
                                                                 </Typography>
                                                            </TableCell>
                                                            <TableCell align="left" width={300}>
                                                                 <Typography
                                                                      fontWeight="300"
                                                                      variant="subtitle1"
                                                                      textTransform="capitalize"
                                                                 >
                                                                      {moment(createdAt).format("lll")}
                                                                 </Typography>
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                 <Box display="flex" flexDirection="row" gap={3}>
                                                                      <AppButton>edit</AppButton>
                                                                      <AppButton
                                                                           onClick={() => deleteCarousel(_id as string)}
                                                                           startIcon={<AiFillDelete />}
                                                                           color="error"
                                                                      >
                                                                           delete
                                                                      </AppButton>
                                                                 </Box>
                                                            </TableCell>
                                                       </TableRow>
                                                  )
                                             )}
                                   </TableBody>
                              </Table>
                              <TablePagination
                                   rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
                                   component="div"
                                   count={carousel?.data?.length}
                                   sx={{
                                        bgcolor: palette.primary.light,
                                   }}
                                   rowsPerPage={rowsPerPage}
                                   page={page}
                                   onPageChange={handleChangePage}
                                   onRowsPerPageChange={handleChangeRowsPerPage}
                              />
                         </TableContainer>
                    </Box>
               )}

               {!carousel.loading && !carousel.data.length && (
                    <Box display="flex" mt={5} justifyContent="center" flexDirection="column" alignItems="center">
                         <Typography mt={2} variant="h5" color={palette.grey[500]}>
                              no data found
                         </Typography>
                         <Typography mt={2} variant="h5" color={palette.grey[500]}>
                              Start adding from following...
                         </Typography>
                         <AppButton sx={{ mt: 2 }} onClick={() => navigate("/content/add-new/carousel")}>
                              create new carousel
                         </AppButton>
                    </Box>
               )}
               {carousel.loading && (
                    <Box textAlign="center">
                         <Typography variant="h4">Searching data</Typography>
                    </Box>
               )}
          </DefaultLayout>
     );
};

export default ManageCarousel;
