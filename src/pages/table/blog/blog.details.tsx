import React, { useEffect } from "react";
import { DefaultLayout } from "../../../layout";
import { useParams } from "react-router-dom";
import { ClearState, store, useAppDispatch, useBlogSelector } from "../../../redux";
import { ListBlogByIdAction } from "../../../redux/action/blog.action";
import { AppButton, AppTitleBar } from "../../../component";
import { Box, Typography } from "@mui/material";

export const BlogDetails = () => {
     const params = useParams();
     const dispatch = useAppDispatch();
     const blog = useBlogSelector();
     useEffect(() => {
          (async () => {
               if (!params.id) {
                    dispatch(ClearState());
               }
               if (params.id) {
                    await dispatch(ListBlogByIdAction(params.id));
               }
          })();
     }, []);
     return (
          <DefaultLayout pagetitle="blog details">
               <AppTitleBar
                    title="Manage blogs"
                    breadcrubms={[
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "Home",
                         },
                         {
                              pagepath: "/table/blogs",
                              activepage: false,
                              activetitle: "table",
                         },
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: `${blog.single.label}`,
                         },
                    ]}
               />
               <Box my={5}>
                    <img src={blog.single.images} width="100%" alt={blog.single.label} />
                    <Typography style={{ marginTop: 10 }} variant="h5">
                         {blog.single.label}
                    </Typography>
                    <p dangerouslySetInnerHTML={{ __html: JSON.parse(blog.single.body) }} />
                    <Box display="flex" gap={3} mt={3} justifyContent="end">
                         <AppButton color="error">Delete this blog</AppButton>
                         <AppButton>edit this blog</AppButton>
                    </Box>
               </Box>
          </DefaultLayout>
     );
};
