import { Box, Typography, useTheme } from "@mui/material";
import React, { FC } from "react";
import { ImFilesEmpty } from "react-icons/im";
import { AppButton } from "../app-button";
import { useNavigate } from "react-router-dom";

export interface AppNoDataProps {
     dataTitle: string;
     pathName: string;
}

export const AppNoData: FC<AppNoDataProps> = ({ dataTitle, pathName }) => {
     const navigate = useNavigate();
     const { palette } = useTheme();
     return (
          <Box height="70vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
               <ImFilesEmpty size={150} color={palette.grey[500]} />
               <Typography variant="h6" color="gray" sx={{ my: 3 }}>
                    No files found for {dataTitle}...
               </Typography>
               <AppButton onClick={() => navigate(`/new/${pathName}`)}>create new package</AppButton>
          </Box>
     );
};
