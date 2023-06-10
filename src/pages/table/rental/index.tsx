import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../../layout";
import { AppButton, AppNoData, AppTitleBar, Loader } from "../../../component";
import { useAppDispatch, useRentalSelector } from "../../../redux";
import { DeleteRentalAction, ListRentalAction } from "../../../redux/action/rental.action";
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
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { enqueueSnackbar } from "notistack";

export const RentalTable = () => {
     const rental = useRentalSelector();
     const dispatch = useAppDispatch();
     const navigate = useNavigate();
     const { palette } = useTheme();

     useEffect(() => {
          (async () => {
               await dispatch(ListRentalAction());
          })();
     }, []);

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

     const DeleteRental = async (id: string) => {
          const data = await dispatch(DeleteRentalAction(id));
          if (data.type === "rental/delete/fulfilled") {
               enqueueSnackbar(data.payload.data, { variant: "success" });
               dispatch(ListRentalAction());
               return navigate("/table/rental", { replace: true });
          }
          if (data.type === "rental/delete/rejected") {
               enqueueSnackbar(data.payload, { variant: "error" });
          }
     };

     return (
          <DefaultLayout pagetitle="Manage your rentals">
               <AppTitleBar
                    title="Manage rental services"
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
                              activetitle: "rental service",
                         },
                    ]}
               />
               {rental?.data?.length !== 0 && (
                    <Box mt={5}>
                         <Typography>Actions : </Typography>
                         <Box display="flex" gap={3} mt={3}>
                              <AppButton onClick={() => navigate("/new/rental")}>New Car record</AppButton>
                              <AppButton
                                   onClick={() => {
                                        navigate("/enquiry/car-enquiries");
                                   }}
                              >
                                   View Records
                              </AppButton>
                              <AppButton color="error">Delete All Records</AppButton>
                         </Box>
                         <TableContainer component={Paper} sx={{ mt: 5 }}>
                              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                   <TableHead sx={{ bgcolor: palette.primary.light }}>
                                        <TableRow>
                                             <TableCell>Sr No.</TableCell>
                                             <TableCell align="left">Images</TableCell>
                                             <TableCell align="left">Name</TableCell>
                                             <TableCell align="left">Category</TableCell>
                                             <TableCell align="left">Uploaded on</TableCell>
                                             <TableCell align="left">Actions</TableCell>
                                        </TableRow>
                                   </TableHead>
                                   <TableBody>
                                        {rental?.data
                                             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                             .map(
                                                  (
                                                       {
                                                            SubCategory,
                                                            image,
                                                            createdAt,
                                                            _id,
                                                            carRentalName,
                                                            location,
                                                            options,
                                                            peopleAllowed,
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
                                                                 <img
                                                                      src={image[0]?.image}
                                                                      width="100%"
                                                                      alt={image[0]?.title}
                                                                 />
                                                            </TableCell>
                                                            <TableCell align="left" width={300}>
                                                                 <Typography variant="body1" textTransform="capitalize">
                                                                      {carRentalName}
                                                                 </Typography>
                                                                 <Typography variant="body2" color="gray">
                                                                      {location.from} - {location.to}
                                                                 </Typography>
                                                            </TableCell>
                                                            <TableCell align="left">
                                                                 <Typography variant="body2" textTransform="capitalize">
                                                                      {SubCategory ? SubCategory?.displayName : "N/A"}
                                                                 </Typography>
                                                                 <Typography variant="body2" textTransform="capitalize">
                                                                      {SubCategory
                                                                           ? SubCategory?.CategoryId?.displayName
                                                                           : "N/A"}
                                                                 </Typography>
                                                                 <Typography variant="body2" textTransform="capitalize">
                                                                      {SubCategory
                                                                           ? SubCategory?.CategoryId?.parentCategory
                                                                                  ?.displayName
                                                                           : "N/A"}
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
                                                                                navigate(
                                                                                     `/update/accommodation/${_id}`,
                                                                                     {
                                                                                          replace: true,
                                                                                     }
                                                                                )
                                                                           }
                                                                      >
                                                                           <AiFillEdit />
                                                                      </IconButton>
                                                                      <IconButton
                                                                           color="error"
                                                                           onClick={() => DeleteRental(_id as string)}
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
                                   count={rental.data.length}
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

               {rental.loading && !rental.data.length && <Loader />}
               {!rental.loading && !rental.data.length && <AppNoData dataTitle="Rental service" pathName="rental" />}
          </DefaultLayout>
     );
};
