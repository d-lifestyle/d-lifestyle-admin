import React from "react";

import { Circle } from "@mui/icons-material";
import { Box, useTheme, Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export interface AppTitleBarProps {
     title: string;
     breadcrubms?: {
          pagepath: string;
          activetitle?: string;
          activepage?: boolean;
     }[];
}

export const AppTitleBar: React.FC<AppTitleBarProps> = ({
     title,
     breadcrubms,
}) => {
     const { palette } = useTheme();
     return (
          <React.Fragment>
               <Typography
                    variant="h3"
                    sx={{ marginTop: 3, textTransform: "capitalize" }}
               >
                    {title}
               </Typography>
               {breadcrubms && (
                    <Breadcrumbs
                         sx={{ marginTop: 2, textTransform: "capitalize" }}
                         separator={
                              <Circle
                                   fontSize="small"
                                   style={{ fontSize: 5 }}
                              />
                         }
                         aria-label="breadcrumb"
                    >
                         {breadcrubms.map(
                              ({ pagepath, activepage, activetitle }, i) => (
                                   <Box key={i}>
                                        {!activepage && (
                                             <Link
                                                  style={{
                                                       textDecoration: "none",
                                                       color: palette.grey[700],
                                                       textTransform:
                                                            "capitalize",
                                                       fontWeight: 500,
                                                  }}
                                                  to={pagepath}
                                             >
                                                  {activetitle}
                                             </Link>
                                        )}
                                        {activepage && (
                                             <Box
                                                  textTransform="capitalize"
                                                  color={palette.grey[500]}
                                             >
                                                  {activetitle}
                                             </Box>
                                        )}
                                   </Box>
                              )
                         )}
                    </Breadcrumbs>
               )}
          </React.Fragment>
     );
};
