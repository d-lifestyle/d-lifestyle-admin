import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../../../layout";
import { AppButton, AppTitleBar } from "../../../../component";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../features";
import { useToursTravelSelector } from "../../../../features/slice";
import { DeleteToursTravelById, GetAllToursTravel } from "../../../../features/action";
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
import { ToursTravelProps } from "../../../../interface";
import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { enqueueSnackbar } from "notistack";

const ManageToursTravel = () => {
     const navigate = useNavigate();
     const dispatch = useDispatch<AppDispatch>();
     const toursPackages = useToursTravelSelector();
     const { palette } = useTheme();

     const GetToursPackages = async () => {
          return await dispatch(GetAllToursTravel());
     };

     useEffect(() => {
          (async () => {
               await GetToursPackages();
          })();
     }, [dispatch]);

     const DeleteAccommodation = async (id: string) => {
          const data = await dispatch(DeleteToursTravelById(id));
          await GetToursPackages();
          if (data.type === "toursTravel/delete/fulfilled") {
               enqueueSnackbar(data.payload, { variant: "success" });
          } else if ("toursTravel/delete/rejected") {
               enqueueSnackbar(data.payload, { variant: "success" });
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
          <DefaultLayout pagetitle="ManageToursTravel tours & travel">
               <AppTitleBar
                    title="Manage tours packages"
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
                              pagepath: "/manage/tours-travel",
                              activepage: true,
                              activetitle: "tours packages",
                         },
                    ]}
               />
               <Box mt={3} display="flex" flexDirection="row" gap={3} alignItems="center" justifyContent="end">
                    <AppButton onClick={() => navigate("/add/tours-travel", { replace: true })}>
                         Create new tours packages
                    </AppButton>
               </Box>
               {!toursPackages.loading && toursPackages.data.length !== 0 && (
                    <TableContainer component={Paper} sx={{ mt: 5 }}>
                         <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead sx={{ bgcolor: palette.primary.light }}>
                                   <TableRow>
                                        <TableCell>Sr No.</TableCell>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Sub Category</TableCell>
                                        <TableCell align="left">Uploaded At</TableCell>
                                        <TableCell align="left">Actions</TableCell>
                                   </TableRow>
                              </TableHead>
                              <TableBody>
                                   {toursPackages?.data
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(
                                             (
                                                  { SubCategory, displayName, _id, createdAt }: ToursTravelProps,
                                                  i: number
                                             ) => (
                                                  <TableRow
                                                       key={_id}
                                                       sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                  >
                                                       <TableCell component="th" scope="row">
                                                            {i + 1}
                                                       </TableCell>
                                                       <TableCell align="left" width={250}>
                                                            <Typography variant="body1" textTransform="capitalize">
                                                                 {displayName}
                                                            </Typography>
                                                       </TableCell>
                                                       <TableCell align="left">
                                                            <Typography textTransform="capitalize" variant="caption">
                                                                 Child : {SubCategory.name}
                                                            </Typography>
                                                            <br />
                                                            <Typography textTransform="capitalize" variant="caption">
                                                                 Main : {SubCategory.CategoryId.name}
                                                            </Typography>
                                                            <br />
                                                            <Typography textTransform="capitalize" variant="caption">
                                                                 Parent :
                                                                 {SubCategory.CategoryId.parentCategory.displayName}
                                                            </Typography>
                                                       </TableCell>

                                                       <TableCell align="left">
                                                            {moment(createdAt).format("lll")}
                                                       </TableCell>
                                                       <TableCell align="left">
                                                            <Box display="flex" flexDirection="row" gap={3}>
                                                                 <IconButton
                                                                      onClick={() =>
                                                                           navigate(`/update/tours-travel/${_id}`, {
                                                                                replace: true,
                                                                           })
                                                                      }
                                                                      color="success"
                                                                 >
                                                                      <AiFillEdit />
                                                                 </IconButton>
                                                                 <AppButton
                                                                      onClick={() => DeleteAccommodation(_id as string)}
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
                              rowsPerPageOptions={[5, 10, 25]}
                              component="div"
                              count={toursPackages.data.length}
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
               {toursPackages.loading && (
                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                         <Typography mt={3} variant="h6" color={palette.grey[500]}>
                              Searching data please wait...
                         </Typography>
                    </Box>
               )}
               {!toursPackages.loading && !toursPackages.data.length && (
                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                         <Typography mt={3} variant="h6" color="GrayText">
                              No tours packages found!
                         </Typography>

                         <AppButton sx={{ mt: 3 }} onClick={() => navigate("/add/tours-travel", { replace: true })}>
                              Create tours packages
                         </AppButton>
                    </Box>
               )}
          </DefaultLayout>
     );
};

export default ManageToursTravel;
