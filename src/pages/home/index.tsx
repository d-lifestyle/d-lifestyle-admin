import { Button, Grid, Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { MediumCard } from "../../component";
import { DefaultLayout } from "../../layout";
import {
     useAccommodationSelector,
     useCarouselSelector,
     useCategorySelector,
     useMainCategorySelector,
     useSubCategorySelector,
     useToursTravelSelector,
} from "../../features/slice";
import { BiCarousel, BiCategoryAlt, BiJoystickAlt } from "react-icons/bi";
import { MdOutlineCategory, MdTravelExplore } from "react-icons/md";
import { BsCardChecklist } from "react-icons/bs";

export const Dashboard = () => {
     const { palette, spacing } = useTheme();
     const carousel = useCarouselSelector();
     const mainCategory = useMainCategorySelector();
     const category = useCategorySelector();
     const subCategory = useSubCategorySelector();
     const accommodation = useAccommodationSelector();
     const toursPackage = useToursTravelSelector();
     return (
          <DefaultLayout pagetitle="Homepage">
               <Grid container sm={12} rowGap={spacing(3)} spacing={3}>
                    <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                         <Box
                              bgcolor={palette.primary.light}
                              px={spacing(5)}
                              py={spacing(6)}
                              borderRadius={spacing(2)}
                              display="flex"
                              alignItems="center"
                              gap={spacing(5)}
                         >
                              <Box flex={1}>
                                   <Box>
                                        <Typography variant="h4">Welcome Back,</Typography>
                                        <Typography variant="h4">Admin</Typography>
                                   </Box>
                                   <Box my={spacing(3)}>
                                        <Typography variant="body2">
                                             To sculpt a head of hair with scissors is an art form. It’s in pursuit of
                                             art.
                                        </Typography>
                                   </Box>
                                   <Button
                                        variant="contained"
                                        // size="small"
                                        color="primary"
                                   >
                                        Settings
                                   </Button>
                              </Box>
                              <img
                                   width="30%"
                                   src="https://minimal-assets-api.vercel.app/assets/illustrations/illustration_components.png"
                                   alt=""
                              />
                         </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}></Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                         <MediumCard
                              icon={<BiCarousel size={50} />}
                              title="Carousel items"
                              value={carousel.data.length}
                         />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                         <MediumCard
                              icon={<MdOutlineCategory size={50} />}
                              title="Parent Category items"
                              value={mainCategory.data.length}
                         />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                         <MediumCard
                              icon={<BsCardChecklist size={50} />}
                              title="Category items"
                              value={category.data.length}
                         />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                         <MediumCard
                              icon={<BiCategoryAlt size={50} />}
                              title="Sub Category items"
                              value={subCategory.data.length}
                         />
                    </Grid>
               </Grid>
               <Box mt={5}>
                    <Typography variant="h5">Content</Typography>
               </Box>
               <Grid container spacing={3} mt={1}>
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                         <MediumCard
                              icon={<MdTravelExplore size={50} />}
                              title="Accommodations"
                              value={accommodation.data.length}
                         />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                         <MediumCard
                              icon={<BiJoystickAlt size={50} />}
                              title="Tour Packages"
                              value={toursPackage.data.length}
                         />
                    </Grid>
               </Grid>
          </DefaultLayout>
     );
};
