import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../../layout";
import { AppButton, AppNoData, AppTitleBar, Loader } from "../../../component";
import { DeleteCruiseAction, ListCruiseAction, useAppDispatch, useCruiseSelector } from "../../../redux";
import {
     Box,
     IconButton,
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
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { enqueueSnackbar } from "notistack";

export const CruiseTable = () => {
     const cruise = useCruiseSelector();
     const dispatch = useAppDispatch();
     const { palette } = useTheme();
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
               await dispatch(ListCruiseAction());
          })();
     }, []);

     const DeleteCategory = async (id: string) => {
          const data = await dispatch(DeleteCruiseAction(id));
          if (data.type === "cruise/delete/fulfilled") {
               await dispatch(ListCruiseAction());
               return enqueueSnackbar(data.payload.data, { variant: "success" });
          }
          if (data.type === "cruise/delete/rejected") {
               enqueueSnackbar(data.payload.data, { variant: "error" });
          }
     };
     return (
          <DefaultLayout pagetitle="Accommodation table">
               <AppTitleBar
                    title="Manage Cruise packages"
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
                              activetitle: "cruise",
                         },
                    ]}
               />
               {cruise.data.length !== 0 && (
                    <Box mt={5}>
                         <Typography>Actions : </Typography>
                         <Box display="flex" gap={3} mt={3}>
                              <AppButton onClick={() => navigate("/new/cruise")}>New Cruise</AppButton>
                              <AppButton>Export CSV / Excel</AppButton>
                              <AppButton color="error">Delete All Records</AppButton>
                         </Box>
                         <TableContainer component={Paper} sx={{ mt: 5 }}>
                              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                   <TableHead sx={{ bgcolor: palette.primary.light }}>
                                        <TableRow>
                                             <TableCell>Sr No.</TableCell>
                                             <TableCell align="left">Images</TableCell>
                                             <TableCell align="left">Name</TableCell>
                                             <TableCell align="left">Departure</TableCell>
                                             <TableCell align="left">Itinerary & Sailing Type</TableCell>
                                             <TableCell align="left">Category</TableCell>
                                             <TableCell align="left">Uploaded on</TableCell>
                                             <TableCell align="left">Actions</TableCell>
                                        </TableRow>
                                   </TableHead>
                                   <TableBody>
                                        {cruise?.data
                                             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                             .map(
                                                  (
                                                       {
                                                            SubCategory,
                                                            departure,
                                                            itinerary,
                                                            sailingType,
                                                            displayName,
                                                            image,
                                                            createdAt,
                                                            _id,
                                                       },
                                                       i: number
                                                  ) => (
                                                       <TableRow
                                                            key={i}
                                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                       >
                                                            <TableCell component="th" scope="row" width={75}>
                                                                 {i + 1}
                                                            </TableCell>
                                                            <TableCell align="left" width={150}>
                                                                 <img src={image} width="100%" alt={image} />
                                                            </TableCell>
                                                            <TableCell align="left" width={300}>
                                                                 <Typography variant="body1" textTransform="capitalize">
                                                                      {displayName ? displayName : "N/A"}
                                                                 </Typography>
                                                            </TableCell>
                                                            <TableCell>
                                                                 <Typography variant="body2" color="gray">
                                                                      {departure.from}
                                                                      {departure.to}
                                                                 </Typography>
                                                            </TableCell>
                                                            <TableCell align="left" width={300}>
                                                                 <Typography variant="body1" textTransform="capitalize">
                                                                      {itinerary ? itinerary : "N/A"}, {sailingType}
                                                                 </Typography>
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                 <Typography textTransform="capitalize">
                                                                      {SubCategory ? SubCategory?.displayName : "N/A"}
                                                                 </Typography>
                                                            </TableCell>
                                                            <TableCell align="left" width={150}>
                                                                 <Typography variant="caption">
                                                                      {moment(createdAt).format("lll")}
                                                                 </Typography>
                                                            </TableCell>
                                                            <TableCell align="left" width={150}>
                                                                 <Box display="flex" flexDirection="row" gap={3}>
                                                                      <IconButton
                                                                           color="primary"
                                                                           onClick={() =>
                                                                                navigate(`/update/category/${_id}`, {
                                                                                     replace: true,
                                                                                })
                                                                           }
                                                                      >
                                                                           <AiFillEdit />
                                                                      </IconButton>
                                                                      <IconButton
                                                                           color="error"
                                                                           onClick={() => DeleteCategory(_id as string)}
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
                                   count={cruise.data.length}
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

               {cruise.loading && !cruise.data.length && <Loader />}
               {!cruise.loading && !cruise.data.length && <AppNoData dataTitle="cruise" pathName="cruise" />}
          </DefaultLayout>
     );
};
