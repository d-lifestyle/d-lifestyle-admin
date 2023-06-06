import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../../layout";
import { AppButton, AppNoData, AppTitleBar, Loader } from "../../../component";
import { useAppDispatch, useBlogSelector } from "../../../redux";
import { DeleteBlogByIdAction, ListBlogsAction } from "../../../redux/action/blog.action";
import { Box, Grid, TablePagination, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export const BlogTable = () => {
     const blogs = useBlogSelector();
     const dispatch = useAppDispatch();
     const params = useParams();
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
               await dispatch(ListBlogsAction());
          })();
     }, []);

     const DeleteBlog = async (id: string) => {
          const data = await dispatch(DeleteBlogByIdAction(id));
          if (data.type === "blog/delete/fulfilled") {
               enqueueSnackbar(data.payload.data, { variant: "success" });
               await dispatch(ListBlogsAction());
          }
          if (data.type === "blog/delete/rejected") {
               enqueueSnackbar(data.payload.data, { variant: "error" });
          }
     };

     return (
          <DefaultLayout pagetitle="Manage blogs">
               <AppTitleBar
                    title="Manage blogs"
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
                              activetitle: "blogs",
                         },
                    ]}
               />
               <Box display="flex" justifyContent="end">
                    <AppButton type="button" onClick={() => navigate("/new/blogs")}>
                         Upload new blogs
                    </AppButton>
               </Box>
               {blogs.data.length !== 0 && (
                    <Grid container spacing={3} mt={2}>
                         {blogs.data.map(({ images, label, _id }) => (
                              <Grid item key={_id} xs={12} sm={12} md={6} xl={6} lg={6}>
                                   <Box
                                        sx={{
                                             background: `url(${images})`,
                                             backgroundPosition: "center",
                                             backgroundSize: "cover",
                                             height: "400px",
                                        }}
                                        position="relative"
                                   >
                                        <Box
                                             position="absolute"
                                             bgcolor="rgba(0,0,0,0.5)"
                                             width="100%"
                                             py={2}
                                             px={2}
                                             bottom={0}
                                        >
                                             <Typography variant="h6" color="#fff" sx={{ mt: 2 }}>
                                                  {label}
                                             </Typography>
                                             <Box display="flex" gap={2} mt={2}>
                                                  <AppButton onClick={() => navigate(`/table/blogs/${_id}`)}>
                                                       View details
                                                  </AppButton>
                                                  <AppButton onClick={() => navigate(`/update/blogs/${_id}`)}>
                                                       edit
                                                  </AppButton>
                                                  <AppButton color="error" onClick={() => DeleteBlog(_id as string)}>
                                                       delete
                                                  </AppButton>
                                             </Box>
                                        </Box>
                                   </Box>
                              </Grid>
                         ))}
                    </Grid>
               )}
               {params.id && <Box>{blogs.single.label}</Box>}
               <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={blogs.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
               />
               {blogs.loading && !blogs.data.length && <Loader />}
               {!blogs.loading && !blogs.data.length && <AppNoData dataTitle="Blogs" pathName="blogs" />}
          </DefaultLayout>
     );
};
