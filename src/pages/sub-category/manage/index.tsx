import React, { useEffect, useState } from "react";

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

import { DefaultLayout } from "../../../layout";
import { AppButton, AppTitleBar } from "../../../component";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../features";
import { useSubCategorySelector } from "../../../features/slice";
import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { DeleteSubCategoryById, GetAllSubCategory } from "../../../features/action";
import { SubCategoryProps } from "../../../interface/sub-category.interface";
import { useNavigate } from "react-router-dom";

export const ManageSubCategory = () => {
     const subcategories = useSubCategorySelector();
     const navigate = useNavigate();
     const dispatch = useDispatch<AppDispatch>();

     const getAllSubCategory = async () => {
          await dispatch(GetAllSubCategory());
     };

     useEffect(() => {
          (async () => {
               await getAllSubCategory();
          })();
     }, []);

     const { palette } = useTheme();

     const [rowsPerPage, setRowsPerPage] = useState<number>(10);
     const [page, setPage] = React.useState(0);
     const handleChangePage = (event: unknown, newPage: number) => {
          setPage(newPage);
     };

     const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
     };

     const DeleteSubCategory = async (id: string) => {
          await dispatch(DeleteSubCategoryById(id));
          await getAllSubCategory();
     };
     console.log(subcategories.data);
     return (
          <DefaultLayout pagetitle="Manage Sub Category">
               <AppTitleBar
                    title="Manage Sub Category"
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
                              pagepath: "/sub-category/manage",
                              activepage: true,
                              activetitle: "sub category",
                         },
                    ]}
               />
               <Box mt={3} display="flex" flexDirection="row" gap={3} alignItems="center" justifyContent="end">
                    <AppButton onClick={() => navigate("/add/sub-category", { replace: true })}>
                         Create new sub category
                    </AppButton>
               </Box>
               {subcategories.data.length !== 0 && (
                    <TableContainer component={Paper} sx={{ mt: 5 }}>
                         <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead sx={{ bgcolor: palette.primary.light }}>
                                   <TableRow>
                                        <TableCell>Sr No.</TableCell>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Main Category</TableCell>
                                        <TableCell align="left">Parent Category</TableCell>
                                        <TableCell align="left">Uploaded At</TableCell>
                                        <TableCell align="left">Actions</TableCell>
                                   </TableRow>
                              </TableHead>
                              <TableBody>
                                   {subcategories?.data
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(({ CategoryId, name, createdAt, _id }: SubCategoryProps, i: number) => (
                                             <TableRow
                                                  key={i}
                                                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                             >
                                                  <TableCell component="th" scope="row">
                                                       {i + 1}
                                                  </TableCell>
                                                  <TableCell align="left">
                                                       <Typography variant="body1" textTransform="capitalize">
                                                            {name}
                                                       </Typography>
                                                  </TableCell>
                                                  <TableCell align="left">
                                                       <Typography textTransform="capitalize">
                                                            {CategoryId?.name}
                                                       </Typography>
                                                  </TableCell>

                                                  <TableCell align="left">
                                                       <Typography textTransform="capitalize">
                                                            {CategoryId?.parentCategory?.displayName}
                                                       </Typography>
                                                  </TableCell>
                                                  <TableCell align="left">{moment(createdAt).format("lll")}</TableCell>
                                                  <TableCell align="left">
                                                       <Box display="flex" flexDirection="row" gap={3}>
                                                            <AppButton startIcon={<AiFillEdit />}>edit</AppButton>
                                                            <AppButton
                                                                 onClick={() => DeleteSubCategory(_id as string)}
                                                                 startIcon={<AiFillDelete />}
                                                                 color="error"
                                                            >
                                                                 delete
                                                            </AppButton>
                                                       </Box>
                                                  </TableCell>
                                             </TableRow>
                                        ))}
                              </TableBody>
                         </Table>
                         <TablePagination
                              rowsPerPageOptions={[5, 10, 25]}
                              component="div"
                              count={subcategories.data.length}
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
               {!subcategories.loading && !subcategories.data.length && (
                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                         <Typography mt={3} variant="h6">
                              No sub category found
                         </Typography>

                         <AppButton onClick={() => navigate("/add/sub-category", { replace: true })}>
                              Create new sub category
                         </AppButton>
                    </Box>
               )}
          </DefaultLayout>
     );
};
