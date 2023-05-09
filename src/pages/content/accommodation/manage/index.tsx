import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../../../layout";
import { AppButton, AppTitleBar } from "../../../../component";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../features";
import { DeleteAccommodationById, GetAllAccommodation } from "../../../../features/action";
import { useAccommodationSelector } from "../../../../features/slice";
import {
     Box,
     Paper,
     Table,
     TableContainer,
     TableCell,
     TableHead,
     TableBody,
     TableRow,
     Typography,
     TablePagination,
     useTheme,
     IconButton,
} from "@mui/material";
import { AccommodationProps } from "../../../../interface";
import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { enqueueSnackbar } from "notistack";

export const ManageAccommodation = () => {
     const navigate = useNavigate();
     const dispatch = useDispatch<AppDispatch>();
     const accommodation = useAccommodationSelector();
     const { palette } = useTheme();

     const GetAccommodation = async () => {
          return await dispatch(GetAllAccommodation());
     };

     useEffect(() => {
          (async () => {
               await GetAccommodation();
          })();
     }, [dispatch]);

     const DeleteAccommodation = async (id: string) => {
          const data = await dispatch(DeleteAccommodationById(id));
          if (data.type === "accommodation/delete/fulfilled") {
               await dispatch(GetAccommodation);
               enqueueSnackbar(data.payload, { variant: "success" });
          } else if (data.type === "accommodation/delete/rejected") {
               enqueueSnackbar(data.payload, { variant: "error" });
          }
     };

     const [rowsPerPage, setRowsPerPage] = useState<number>(10);
     const [page, setPage] = React.useState(0);
     const handleChangePage = (event: unknown, newPage: number) => {
          setPage(newPage);
     };

     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
     };

     return (
          <DefaultLayout pagetitle="Manage accommodation">
               <AppTitleBar
                    title="Manage Accommodation"
                    breadcrubms={[
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "home",
                         },
                         {
                              pagepath: "/content/manage",
                              activepage: false,
                              activetitle: "manage",
                         },
                         {
                              pagepath: "/manage/accommodation",
                              activepage: true,
                              activetitle: "accommodation",
                         },
                    ]}
               />

               <Box mt={3} display="flex" flexDirection="row" gap={3} alignItems="center" justifyContent="end">
                    <AppButton onClick={() => navigate("/add/accommodation", { replace: true })}>
                         Create new accommodation
                    </AppButton>
               </Box>
               {accommodation.data.length !== 0 && (
                    <TableContainer component={Paper} sx={{ mt: 5 }}>
                         <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead sx={{ bgcolor: palette.primary.light }}>
                                   <TableRow>
                                        <TableCell>Sr No.</TableCell>
                                        <TableCell align="left">Images</TableCell>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Category</TableCell>
                                        <TableCell align="left">Uploaded At</TableCell>
                                        <TableCell align="left">Actions</TableCell>
                                   </TableRow>
                              </TableHead>
                              <TableBody>
                                   {accommodation?.data
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(
                                             (
                                                  {
                                                       createdAt,
                                                       _id,
                                                       image,
                                                       SubCategory,
                                                       displayName,
                                                  }: AccommodationProps,
                                                  i: number
                                             ) => (
                                                  <TableRow
                                                       key={_id}
                                                       sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                  >
                                                       <TableCell component="th" scope="row">
                                                            {i + 1}
                                                       </TableCell>
                                                       <TableCell align="left" width={400}>
                                                            {image.length && (
                                                                 <img
                                                                      style={{ borderRadius: 10 }}
                                                                      src={image[0]?.image}
                                                                      width="100%"
                                                                      alt={image[0]?.title}
                                                                 />
                                                            )}
                                                       </TableCell>
                                                       <TableCell align="left" width={250}>
                                                            <Typography
                                                                 noWrap
                                                                 variant="body1"
                                                                 textTransform="capitalize"
                                                            >
                                                                 {displayName}
                                                            </Typography>
                                                       </TableCell>

                                                       <TableCell width={250}>
                                                            <Typography textTransform="capitalize" variant="caption">
                                                                 Child : {SubCategory?.name}
                                                            </Typography>
                                                            <br />
                                                            <Typography textTransform="capitalize" variant="caption">
                                                                 Main : {SubCategory?.CategoryId?.name}
                                                            </Typography>
                                                            <br />
                                                            <Typography textTransform="capitalize" variant="caption">
                                                                 Parent :
                                                                 {SubCategory.CategoryId.parentCategory.displayName}
                                                            </Typography>
                                                       </TableCell>

                                                       <TableCell align="left" width={200}>
                                                            <Typography variant="caption">
                                                                 {moment(createdAt).format("lll")}
                                                            </Typography>
                                                       </TableCell>
                                                       <TableCell align="left">
                                                            <Box display="flex" flexDirection="row" gap={3}>
                                                                 <IconButton color="success">
                                                                      <AiFillEdit />
                                                                 </IconButton>
                                                                 <IconButton
                                                                      onClick={() => DeleteAccommodation(_id as string)}
                                                                      color="error"
                                                                 >
                                                                      <AiFillDelete />
                                                                 </IconButton>
                                                            </Box>
                                                       </TableCell>
                                                  </TableRow>
                                             )
                                        )}
                              </TableBody>
                         </Table>
                         <TablePagination
                              rowsPerPageOptions={[5, 10, 25]}
                              component="div"
                              count={accommodation.data.length}
                              sx={{
                                   bgcolor: palette.primary.light,
                              }}
                              rowsPerPage={rowsPerPage}
                              page={page}
                              onPageChange={handleChangePage}
                              onRowsPerPageChange={handleChangeRowsPerPage}
                         />
                    </TableContainer>
               )}
               {accommodation.loading && (
                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                         <Typography mt={3} variant="h6">
                              Searching data please wait...
                         </Typography>
                    </Box>
               )}
               {!accommodation.loading && !accommodation.data.length && (
                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                         <Typography mt={3} variant="h6" color="GrayText">
                              No accommodation found!
                         </Typography>

                         <AppButton sx={{ mt: 3 }} onClick={() => navigate("/add/accommodation", { replace: true })}>
                              Create accommodation
                         </AppButton>
                    </Box>
               )}
          </DefaultLayout>
     );
};
