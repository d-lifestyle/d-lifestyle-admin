import React, { useEffect, useState } from "react";

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
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import {
     DeleteSubCategoryAction,
     ListSubCategoryAction,
     useAppDispatch,
     useSubCategorySelector,
} from "../../../../redux";
import { AppButton, AppNoData, AppTitleBar, Loader } from "../../../../component";
import { DefaultLayout } from "../../../../layout";
import { enqueueSnackbar } from "notistack";

export const SubCategoryTable = () => {
     const subCategories = useSubCategorySelector();
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
               await dispatch(ListSubCategoryAction());
          })();
     }, []);

     const DeleteCategory = async (id: string) => {
          const data = await dispatch(DeleteSubCategoryAction(id));
          if (data.type === "sub_category/delete/fulfilled") {
               await dispatch(ListSubCategoryAction());
               enqueueSnackbar(data.payload.data, { variant: "success" });
               return navigate("/table/sub-category", { replace: true });
          }
          if (data.type === "sub_category/delete/rejected") {
               enqueueSnackbar(data.payload, { variant: "error" });
          }
     };

     return (
          <DefaultLayout pagetitle="Sub categories table">
               <AppTitleBar
                    title="Manage sub categories"
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
                              activetitle: "sub categories",
                         },
                    ]}
               />
               {subCategories.data.length !== 0 && (
                    <Box mt={5}>
                         <Typography>Actions : </Typography>
                         <Box display="flex" gap={3} mt={3}>
                              <AppButton onClick={() => navigate("/new/sub-category")}>
                                   Upload new sub category
                              </AppButton>
                              <AppButton>Export CSV / Excel</AppButton>
                              <AppButton color="error">Delete All Records</AppButton>
                         </Box>
                         <TableContainer component={Paper} sx={{ mt: 5 }}>
                              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                   <TableHead sx={{ bgcolor: palette.primary.light }}>
                                        <TableRow>
                                             <TableCell>Sr No.</TableCell>
                                             <TableCell align="left">Sub Category</TableCell>
                                             <TableCell align="left">Normal Category</TableCell>
                                             <TableCell align="left">Uploaded on</TableCell>
                                             <TableCell align="left">Actions</TableCell>
                                        </TableRow>
                                   </TableHead>
                                   <TableBody>
                                        {subCategories?.data
                                             .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                             .map(({ _id, displayName, createdAt, CategoryId }, i: number) => (
                                                  <TableRow
                                                       key={i}
                                                       sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                  >
                                                       <TableCell component="th" scope="row" width={75}>
                                                            {i + 1}
                                                       </TableCell>

                                                       <TableCell align="left" width={200}>
                                                            <Typography variant="body1" textTransform="capitalize">
                                                                 {displayName}
                                                            </Typography>
                                                       </TableCell>

                                                       <TableCell align="left" width={200}>
                                                            <Typography variant="body1" textTransform="capitalize">
                                                                 {CategoryId?.displayName}
                                                            </Typography>
                                                       </TableCell>

                                                       <TableCell align="left" width={300}>
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
                                             ))}
                                   </TableBody>
                              </Table>
                              <TablePagination
                                   rowsPerPageOptions={[5, 10, 25]}
                                   component="div"
                                   count={subCategories.data.length}
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

               {subCategories.loading && !subCategories.data.length && <Loader />}
               {!subCategories.loading && !subCategories.data.length && (
                    <AppNoData dataTitle="sub category" pathName="sub-category" />
               )}
          </DefaultLayout>
     );
};
