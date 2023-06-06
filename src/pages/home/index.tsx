import React, { useEffect } from "react";
import { DefaultLayout } from "../../layout";
import { Box, Grid, Typography } from "@mui/material";
import {
     useAccommodationSelector,
     useCarouselSelector,
     useCategorySelector,
     useCruiseSelector,
     useSubCategorySelector,
     useTourPackageSelector,
     useContactSelector,
     useAppDispatch,
     ListCategoryAction,
     ListSubCategoryAction,
     ListAccommodationAction,
     ListToursPackageAction,
     ListCruiseAction,
     GetContactAction,
     useBlogSelector,
} from "../../redux";
import { MediumCard } from "../../component";
import { BiCarousel, BiHotel, BiMessageAlt } from "react-icons/bi";
import { MdTravelExplore } from "react-icons/md";
import { RiShipLine } from "react-icons/ri";
import { AiOutlineOrderedList, AiOutlineUnorderedList } from "react-icons/ai";
import { BsListStars, BsPen } from "react-icons/bs";
import { batch } from "react-redux";
import { ListCarouselAction } from "../../redux/action/carousel.action";
import { ListBlogByIdAction, ListBlogsAction } from "../../redux/action/blog.action";

export const Homepage = () => {
     const dispatch = useAppDispatch();

     const carousel = useCarouselSelector();
     const category = useCategorySelector();
     const subCategory = useSubCategorySelector();
     const accommodation = useAccommodationSelector();
     const toursPackage = useTourPackageSelector();
     const cruise = useCruiseSelector();
     const contactQueries = useContactSelector();
     const blog = useBlogSelector();

     useEffect(() => {
          (async () => {
               batch(() => {
                    dispatch(ListCarouselAction());
                    dispatch(ListCategoryAction());
                    dispatch(ListSubCategoryAction());
                    dispatch(ListAccommodationAction());
                    dispatch(ListToursPackageAction());
                    dispatch(ListCruiseAction());
                    dispatch(GetContactAction());
                    dispatch(ListBlogsAction());
               });
          })();
     }, [dispatch]);

     return (
          <DefaultLayout pagetitle="Dashboard">
               <Box mt={3} mb={2}>
                    <Typography variant="body1" textTransform="uppercase" color="gray">
                         general content
                    </Typography>
               </Box>
               <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                         <MediumCard
                              path="/table/slider"
                              title="website slider"
                              value={carousel.data.length}
                              icon={<BiCarousel size={75} />}
                         />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                         <MediumCard
                              path="/table/blogs"
                              title="website blogs"
                              value={blog.data.length}
                              icon={<BsPen size={75} />}
                         />
                    </Grid>
               </Grid>
               <Box mt={3} mb={2}>
                    <Typography variant="body1" textTransform="uppercase" color="gray">
                         Content
                    </Typography>
               </Box>
               <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                         <MediumCard
                              path="/table/accommodations"
                              title="accommodations"
                              value={accommodation.data.length}
                              icon={<BiHotel size={75} />}
                         />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                         <MediumCard
                              path="/table/travel-packages"
                              title="tours packages"
                              value={toursPackage.data.length}
                              icon={<MdTravelExplore size={75} />}
                         />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                         <MediumCard
                              path="/table/cruise"
                              title="Cruise"
                              value={cruise.data.length}
                              icon={<RiShipLine size={75} />}
                         />
                    </Grid>
               </Grid>

               <Box mt={3} mb={2}>
                    <Typography variant="body1" textTransform="uppercase" color="gray">
                         categories
                    </Typography>
               </Box>
               <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                         <MediumCard
                              path="/table/normal-category"
                              title="normal category"
                              value={category.data.length}
                              icon={<AiOutlineOrderedList size={75} />}
                         />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                         <MediumCard
                              path="/table/sub-category"
                              title="Sub category"
                              value={subCategory.data.length}
                              icon={<BsListStars size={75} />}
                         />
                    </Grid>
               </Grid>
               <Box mt={3} mb={2}>
                    <Typography variant="body1" textTransform="uppercase" color="gray">
                         enquiries
                    </Typography>
               </Box>
               <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
                         <MediumCard
                              path="/enquiry/user-contacts"
                              title="contact enquiry"
                              value={contactQueries.data.length}
                              icon={<BiMessageAlt size={75} />}
                         />
                    </Grid>
               </Grid>
          </DefaultLayout>
     );
};
