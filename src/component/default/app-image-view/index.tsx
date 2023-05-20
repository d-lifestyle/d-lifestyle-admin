import { Box, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { AppButton } from "../app-button";

export interface AppImageViewProps {
     image: string;
     title: string;
     dispatch: any;
     removeImage: any;
     i: number;
}

export const AppImageView: FC<AppImageViewProps> = ({ dispatch, image, removeImage, title, i }) => {
     return (
          <Grid item xs={12} sm={12} md={12} xl={6} lg={6}>
               <Box position="relative" mb={10}>
                    <img src={image} width="100%" alt={title} />
                    <Box
                         position="absolute"
                         width="100%"
                         bgcolor="rgba(0,0,0,0.5)"
                         top={0}
                         py={3}
                         px={2}
                         display="flex"
                         justifyContent="space-between"
                         alignItems="center"
                    >
                         <Typography color="#fff" variant="h6" textTransform="capitalize">
                              {title}
                         </Typography>
                         <AppButton
                              onClick={() => {
                                   dispatch(removeImage(i));
                              }}
                         >
                              remove
                         </AppButton>
                    </Box>
               </Box>
          </Grid>
     );
};
