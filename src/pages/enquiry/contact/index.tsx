import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../../layout";
import { GetContactAction, MakeContactFavoriteAction, useAppDispatch, useContactSelector } from "../../../redux";
import { AppTitleBar, Loader } from "../../../component";
import { Card, CardActions, CardContent, Grid, IconButton, TablePagination, Typography, useTheme } from "@mui/material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { enqueueSnackbar } from "notistack";

export const ContactEnquiry = () => {
     const contact = useContactSelector();
     const dispatch = useAppDispatch();
     const { palette } = useTheme();

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
               await dispatch(GetContactAction());
          })();
     }, []);

     const MakeFavorite = async (id: string) => {
          const data = await dispatch(MakeContactFavoriteAction(id));
          if (data.type === "contact/favorite/fulfilled") {
               enqueueSnackbar(data.payload.data, { variant: "success" });
               await dispatch(GetContactAction());
          }
          if (data.type === "contact/favorite/rejected") {
               enqueueSnackbar(data.type, { variant: "error" });
          }
     };

     return (
          <DefaultLayout pagetitle="Manage contact of your customer's">
               <AppTitleBar
                    title="Manage customer contacts"
                    breadcrubms={[
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "Home",
                         },
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "enquiry",
                         },
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "manage customer contact",
                         },
                    ]}
               />
               <Grid container spacing={3} mt={2}>
                    {contact.data
                         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                         .map(({ email, favorite, name, phone, _id, body, createdAt, placeToVisit }) => (
                              <Grid item xs={12} sm={12} md={6} xl={4} lg={4} key={_id}>
                                   <Card>
                                        <CardContent>
                                             <Typography sx={{ fontSize: 14 }} color="primary" gutterBottom>
                                                  {name}
                                             </Typography>
                                             <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                  {email}, {phone}
                                             </Typography>
                                             <Typography variant="body2" color="grey">
                                                  {placeToVisit}
                                                  <br />
                                                  Message - {body ? body : "no message"}
                                             </Typography>
                                        </CardContent>
                                        <CardActions>
                                             <IconButton
                                                  onClick={() => {
                                                       MakeFavorite(_id as string);
                                                  }}
                                             >
                                                  {favorite ? (
                                                       <AiFillHeart color={palette.primary.main} />
                                                  ) : (
                                                       <AiOutlineHeart />
                                                  )}
                                             </IconButton>
                                        </CardActions>
                                   </Card>
                              </Grid>
                         ))}
               </Grid>

               <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={contact.data.length}
                    sx={{
                         mt: 5,
                    }}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
               />

               {contact.loading && !contact.data.length && <Loader />}
               {!contact.loading && !contact.data.length && <div>No data found</div>}
          </DefaultLayout>
     );
};
