import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../../layout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../features";
import { useCategorySelector } from "../../../features/slice";
import { DeleteCategoryById, GetAllCategory } from "../../../features/action";
import { AppButton, AppTitleBar } from "../../../component";
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
} from "@mui/material";
import { CategoriesProps } from "../../../interface";
import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const ManageCategory = () => {
     const dispatch = useDispatch<AppDispatch>();
     const categories = useCategorySelector();
     const navigate = useNavigate();
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

     useEffect(() => {
          (async () => {
               await dispatch(GetAllCategory());
          })();
     }, [dispatch]);

     const DeleteCategory = async (id: string) => {
          await dispatch(DeleteCategoryById(id));
          await dispatch(GetAllCategory());
     };

     return (
          <DefaultLayout pagetitle="Manage categories">
               <AppTitleBar
                    title="Manage Category"
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
                              pagepath: "/manage/category",
                              activepage: true,
                              activetitle: "category",
                         },
                    ]}
               />
               <Box mt={3} display="flex" flexDirection="row" gap={3} alignItems="center" justifyContent="end">
                    <AppButton onClick={() => navigate("/add/category", { replace: true })}>
                         Create new sub category
                    </AppButton>
               </Box>
               {categories.data.length !== 0 && (
                    <TableContainer component={Paper} sx={{ mt: 5 }}>
                         <Table sx={{ minWidth: 650 }} aria-label="simple table">
                              <TableHead sx={{ bgcolor: palette.primary.light }}>
                                   <TableRow>
                                        <TableCell>Sr No.</TableCell>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Parent Category</TableCell>
                                        <TableCell align="left">Uploaded At</TableCell>
                                        <TableCell align="left">Actions</TableCell>
                                   </TableRow>
                              </TableHead>
                              <TableBody>
                                   {categories?.data
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map(({ name, createdAt, _id, parentCategory }: CategoriesProps, i: number) => (
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
                                                            {parentCategory?.displayName}
                                                       </Typography>
                                                  </TableCell>
                                                  <TableCell align="left">{moment(createdAt).format("lll")}</TableCell>
                                                  <TableCell align="left">
                                                       <Box display="flex" flexDirection="row" gap={3}>
                                                            <AppButton startIcon={<AiFillEdit />}>edit</AppButton>
                                                            <AppButton
                                                                 onClick={() => DeleteCategory(_id as string)}
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
                              count={categories.data.length}
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
               {!categories.loading && !categories.data.length && (
                    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                         <Typography mt={3} variant="h6" color={palette.grey[500]}>
                              No sub category found
                         </Typography>

                         <AppButton onClick={() => navigate("/add/category", { replace: true })}>
                              Create new sub category
                         </AppButton>
                    </Box>
               )}
          </DefaultLayout>
     );
};

export default ManageCategory;
