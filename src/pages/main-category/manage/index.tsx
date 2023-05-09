import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../../layout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../features";
import { useMainCategorySelector } from "../../../features/slice";
import { DeleteMainCategoryById, GetAllMainCategory } from "../../../features/action";
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
import { AppButton, AppTitleBar } from "../../../component";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { MainCategoryProps } from "../../../interface";

const ManageMainCategory = () => {
     const dispatch = useDispatch<AppDispatch>();
     const mainCategory = useMainCategorySelector();
     const navigate = useNavigate();

     const GetAllMain = async () => {
          await dispatch(GetAllMainCategory());
     };

     useEffect(() => {
          (async () => {
               await GetAllMain();
          })();
     }, [dispatch]);

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

     const DeleteMainCategory = async (id: string) => {
          await dispatch(DeleteMainCategoryById(id));
          await GetAllMain();
     };

     return (
          <DefaultLayout pagetitle="Manage main category">
               <AppTitleBar
                    title="Manage main Category"
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
                              pagepath: "/add/main-category",
                              activepage: true,
                              activetitle: "parent category",
                         },
                    ]}
               />
               <Box mt={3} display="flex" flexDirection="row" gap={3} alignItems="center" justifyContent="end">
                    <AppButton onClick={() => navigate("/add/main-category", { replace: true })}>
                         Create new sub category
                    </AppButton>
               </Box>
               {mainCategory.data.length !== 0 && (
                    <TableContainer component={Paper} sx={{ mt: 5 }}>
                         <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead sx={{ bgcolor: palette.primary.light }}>
                                   <TableRow>
                                        <TableCell>Sr No.</TableCell>
                                        <TableCell align="left">Parent Categories</TableCell>
                                        <TableCell align="left">Uploaded At</TableCell>
                                        <TableCell align="left">Actions</TableCell>
                                   </TableRow>
                              </TableHead>
                              <TableBody>
                                   {mainCategory?.data
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(({ displayName, createdAt, _id }: MainCategoryProps, i: number) => (
                                             <TableRow
                                                  key={_id}
                                                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                             >
                                                  <TableCell component="th" scope="row">
                                                       <Typography fontWeight="300">{i + 1}</Typography>
                                                  </TableCell>
                                                  <TableCell align="left">
                                                       <Typography fontWeight="500" textTransform="capitalize">
                                                            {displayName}
                                                       </Typography>
                                                  </TableCell>

                                                  <TableCell align="left">
                                                       <Typography>{moment(createdAt).format("lll")}</Typography>
                                                  </TableCell>
                                                  <TableCell align="left">
                                                       <Box display="flex" flexDirection="row" gap={3}>
                                                            <AppButton startIcon={<AiFillEdit />}>edit</AppButton>
                                                            <AppButton
                                                                 onClick={() => DeleteMainCategory(_id as string)}
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
                              count={mainCategory.data.length}
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
               {!mainCategory.loading && mainCategory.data.length === 0 && (
                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                         <Typography mt={3} variant="h6" color={palette.grey[500]}>
                              No main category found
                         </Typography>

                         <AppButton onClick={() => navigate("/add/main-category", { replace: true })}>
                              Create new sub category
                         </AppButton>
                    </Box>
               )}
          </DefaultLayout>
     );
};

export default ManageMainCategory;
