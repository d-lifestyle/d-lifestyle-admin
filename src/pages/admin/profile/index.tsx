import React, { useCallback, useEffect } from "react";
import { DefaultLayout } from "../../../layout";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../features";
import { useUserSelector } from "../../../features/slice";
import { Box, Fab, Typography, useTheme } from "@mui/material";
import { AppButton, AppInput, AppTitleBar } from "../../../component";
import { Formik } from "formik";
import { ProfileFormProps, ProfileValidationSchema } from "../../../validation";
import { LabelOutlined, Navigation } from "@mui/icons-material";
import {
     BtnBold,
     BtnItalic,
     Editor,
     Toolbar,
     BtnBulletList,
     BtnClearFormatting,
     BtnNumberedList,
     BtnLink,
     BtnRedo,
     BtnStrikeThrough,
     BtnStyles,
     BtnUnderline,
     BtnUndo,
} from "react-simple-wysiwyg";
import { enqueueSnackbar } from "notistack";
import { GetUserProfile, UpdateAdminProfile } from "../../../features/action";
import moment from "moment";

export const AdminProfile = () => {
     const dispatch = useDispatch<AppDispatch>();
     const user = useUserSelector();
     const local = JSON.parse(localStorage.getItem("token") as any);
     const theme = useTheme();

     useEffect(() => {
          (async () => {
               await dispatch(GetUserProfile());
          })();
     }, []);

     const UpdateProfile = async (e: any) => {
          await dispatch(
               UpdateAdminProfile({
                    data: e,
                    id: local.user.id,
               })
          );
     };

     return (
          <DefaultLayout pagetitle="Database analytics">
               <AppTitleBar
                    title="Manage your website & account info"
                    breadcrubms={[
                         {
                              pagepath: "/",
                              activepage: false,
                              activetitle: "Home",
                         },
                         {
                              pagepath: "/admin/profile",
                              activepage: false,
                              activetitle: "manage",
                         },
                         {
                              pagepath: "/admin/profile",
                              activepage: true,
                              activetitle: "account",
                         },
                    ]}
               />
               <Box position="relative">
                    <Formik
                         enableReinitialize
                         initialValues={{
                              aboutText: user?.data?.aboutInfo?.aboutText ? user?.data?.aboutInfo?.aboutText : "",
                              address: user?.data?.contactInfo ? user?.data?.contactInfo.address : "",
                              email: user?.data?.email ? user?.data?.email : "",
                              firstName: user?.data?.firstName ? user.data.firstName : "",
                              lastName: user?.data?.lastName ? user.data.lastName : "",
                              logo: user?.data?.aboutInfo?.logo ? user?.data?.aboutInfo?.logo : "",
                              password: user?.data?.password ? user?.data?.password : "",
                              phone: user?.data?.contactInfo?.phone ? user?.data?.contactInfo?.phone : "",
                              privacyPolicy: user?.data?.aboutInfo?.privacyPolicy
                                   ? user?.data?.aboutInfo?.privacyPolicy
                                   : "",
                              slogan: user?.data?.aboutInfo?.slogan ? user?.data?.aboutInfo?.slogan : "",
                              support: user?.data?.aboutInfo?.support ? user?.data?.aboutInfo?.support : "",
                              termsCondition: user?.data?.aboutInfo?.termsCondition
                                   ? user?.data?.aboutInfo?.termsCondition
                                   : "",
                              fbLink: user?.data?.contactInfo?.fbLink ? user?.data?.contactInfo?.fbLink : "",
                              instaLink: user?.data?.contactInfo?.instaLink ? user?.data?.contactInfo?.instaLink : "",
                         }}
                         validationSchema={ProfileValidationSchema}
                         onSubmit={(e) => UpdateProfile(e)}
                    >
                         {({ errors, values, touched, handleBlur, handleChange, handleSubmit }) => (
                              <form onSubmit={handleSubmit}>
                                   <Typography color="GrayText" variant="h6" mt={3}>
                                        Admin Profile
                                   </Typography>
                                   <Box
                                        border={`2px dashed`}
                                        borderColor={theme.palette.primary.main}
                                        p={2}
                                        borderRadius={1}
                                   >
                                        <Box display="flex" gap={3} mb={2}>
                                             <AppInput
                                                  name="lastName"
                                                  size="small"
                                                  placeholder="Last name"
                                                  fullWidth
                                                  label="Last name"
                                                  id="lastName"
                                                  onBlur={handleBlur("lastName")}
                                                  onChange={handleChange("lastName")}
                                                  value={values.lastName}
                                                  error={!values.lastName && (touched.lastName as boolean)}
                                                  helperText={touched.lastName && errors.lastName}
                                             />
                                             <AppInput
                                                  name="firstName"
                                                  size="small"
                                                  placeholder="First name"
                                                  fullWidth
                                                  label="First name"
                                                  id="firstName"
                                                  onBlur={handleBlur("firstName")}
                                                  onChange={handleChange("firstName")}
                                                  value={values.firstName}
                                                  error={!values.firstName && (touched.firstName as boolean)}
                                                  helperText={touched.firstName && errors.firstName}
                                             />
                                        </Box>
                                        <Box>
                                             <AppInput
                                                  name="email"
                                                  size="small"
                                                  placeholder="Enter email address"
                                                  fullWidth
                                                  label="Your email address"
                                                  id="email"
                                                  onBlur={handleBlur("email")}
                                                  onChange={handleChange("email")}
                                                  value={values.email}
                                                  error={!values.email && (touched.email as boolean)}
                                                  helperText={touched.email ? errors.email : "Login email will be this"}
                                             />
                                        </Box>
                                        <Box>
                                             <AppInput
                                                  disabled
                                                  name="password"
                                                  size="small"
                                                  type="password"
                                                  placeholder="Your password"
                                                  fullWidth
                                                  label="Your password"
                                                  onBlur={handleBlur("password")}
                                                  onChange={handleChange("password")}
                                                  value={values.password}
                                                  id="password"
                                                  error={!values.password && (touched.password as boolean)}
                                                  helperText={
                                                       touched.password
                                                            ? errors.password
                                                            : "Your can't see your password for privacy"
                                                  }
                                             />
                                        </Box>
                                        <Box mt={2} display="flex" gap={3}>
                                             <AppInput
                                                  label="Your account type"
                                                  size="small"
                                                  fullWidth
                                                  disabled
                                                  inputProps={{
                                                       style: {
                                                            textTransform: "uppercase",
                                                       },
                                                  }}
                                                  value={user.data.isAdmin ? "administrator" : "user"}
                                                  helperText={"Your account type"}
                                             />
                                             <AppInput
                                                  label="Your account made on"
                                                  size="small"
                                                  fullWidth
                                                  disabled
                                                  value={moment(user.data.createdAt).format("LLL")}
                                             />
                                        </Box>
                                   </Box>
                                   <Typography color="GrayText" variant="h6" mt={3}>
                                        Contact information
                                   </Typography>
                                   <Box
                                        border={`2px dashed`}
                                        borderColor={theme.palette.primary.main}
                                        p={2}
                                        borderRadius={1}
                                   >
                                        <Box mt={2} display="flex" gap={3}>
                                             <AppInput
                                                  name="address"
                                                  size="small"
                                                  placeholder="Head office"
                                                  fullWidth
                                                  label="Head office location"
                                                  id="address"
                                                  onBlur={handleBlur("address")}
                                                  onChange={handleChange("address")}
                                                  value={values.address}
                                                  error={!values.address && (touched.address as boolean)}
                                                  helperText={
                                                       touched.address
                                                            ? errors.address
                                                            : "Bldg no, area name, city, state, pin code, county"
                                                  }
                                             />
                                             <AppInput
                                                  name="phone"
                                                  size="small"
                                                  placeholder="+91 1234567890"
                                                  fullWidth
                                                  label="Contact number"
                                                  id="phone"
                                                  onBlur={handleBlur("phone")}
                                                  onChange={handleChange("phone")}
                                                  value={values.phone}
                                                  error={!values.phone && (touched.phone as boolean)}
                                                  helperText={touched.phone ? errors.phone : "With +91"}
                                             />
                                        </Box>
                                        <Box mt={2}>
                                             <AppInput
                                                  name="instaLink"
                                                  size="small"
                                                  placeholder="Link your instagram account"
                                                  fullWidth
                                                  label="Instagram account"
                                                  onBlur={handleBlur("instaLink")}
                                                  onChange={handleChange("instaLink")}
                                                  value={values.instaLink}
                                                  id="instaLink"
                                             />
                                        </Box>
                                        <Box mt={2}>
                                             <AppInput
                                                  name="fbLink"
                                                  size="small"
                                                  placeholder="Link your facebook account"
                                                  fullWidth
                                                  label="Facebook account"
                                                  onBlur={handleBlur("fbLink")}
                                                  onChange={handleChange("fbLink")}
                                                  value={values.fbLink}
                                                  id="fbLink"
                                             />
                                        </Box>
                                   </Box>
                                   <Typography color="GrayText" variant="h6" mt={3}>
                                        About information
                                   </Typography>
                                   <Box
                                        border={`2px dashed`}
                                        borderColor={theme.palette.primary.main}
                                        p={2}
                                        borderRadius={1}
                                   >
                                        <Box mt={2}>
                                             <Box display="flex" justifyContent="center">
                                                  <img src={values.logo} width="30%" alt="" />
                                             </Box>
                                             <Box display="flex" alignItems="end" gap={3}>
                                                  <AppInput
                                                       name="logo"
                                                       size="small"
                                                       placeholder="Website logo"
                                                       fullWidth
                                                       label="Website logo"
                                                       id="logo"
                                                       onBlur={handleBlur("logo")}
                                                       onChange={handleChange("logo")}
                                                       value={values.logo}
                                                       error={!values.logo && (touched.logo as boolean)}
                                                       helperText={touched.logo && errors.logo}
                                                  />
                                                  <AppInput
                                                       name="slogan"
                                                       size="small"
                                                       placeholder="slogan"
                                                       fullWidth
                                                       label="Website slogan"
                                                       id="slogan"
                                                       onBlur={handleBlur("slogan")}
                                                       onChange={handleChange("slogan")}
                                                       value={values.slogan}
                                                       error={!values.slogan && (touched.slogan as boolean)}
                                                       helperText={touched.slogan && errors.slogan}
                                                  />
                                             </Box>
                                             <Box display="flex" alignItems="center" gap={2} mt={2}>
                                                  <LabelOutlined style={{ color: theme.palette.grey[600] }} />
                                                  <label
                                                       htmlFor="support"
                                                       style={{ fontSize: 18, color: theme.palette.grey[600] }}
                                                  >
                                                       Website About
                                                  </label>
                                             </Box>
                                             <Editor
                                                  onBlur={handleBlur("aboutText")}
                                                  name="aboutText"
                                                  onChange={handleChange("aboutText")}
                                                  value={values.aboutText}
                                                  containerProps={{
                                                       style: {
                                                            height: "300px",
                                                            marginTop: theme.spacing(2),
                                                            borderRadius: 0,
                                                       },
                                                  }}
                                             >
                                                  <Toolbar>
                                                       <BtnBold />
                                                       <BtnItalic />
                                                       <BtnBulletList />
                                                       <BtnClearFormatting />
                                                       <BtnLink />
                                                       <BtnNumberedList />
                                                       <BtnRedo />
                                                       <BtnUndo />
                                                       <BtnStrikeThrough />
                                                       <BtnStyles />
                                                       <BtnUnderline />
                                                  </Toolbar>
                                             </Editor>
                                        </Box>
                                   </Box>
                                   <Box display="flex" alignItems="center" gap={2} mt={2}>
                                        <LabelOutlined style={{ color: theme.palette.grey[600] }} />
                                        <label
                                             htmlFor="support"
                                             style={{ fontSize: 18, color: theme.palette.grey[600] }}
                                        >
                                             Website Terms & Conditions
                                        </label>
                                   </Box>
                                   <Box
                                        border={`2px dashed`}
                                        borderColor={theme.palette.primary.main}
                                        p={2}
                                        borderRadius={1}
                                   >
                                        <Editor
                                             onBlur={handleBlur("termsCondition")}
                                             name="termsCondition"
                                             onChange={handleChange("termsCondition")}
                                             value={values.termsCondition}
                                             containerProps={{
                                                  style: {
                                                       height: "300px",
                                                       marginTop: theme.spacing(2),
                                                       borderRadius: 0,
                                                  },
                                             }}
                                        >
                                             <Toolbar>
                                                  <BtnBold />
                                                  <BtnItalic />
                                                  <BtnBulletList />
                                                  <BtnClearFormatting />
                                                  <BtnLink />
                                                  <BtnNumberedList />
                                                  <BtnRedo />
                                                  <BtnUndo />
                                                  <BtnStrikeThrough />
                                                  <BtnStyles />
                                                  <BtnUnderline />
                                             </Toolbar>
                                        </Editor>
                                   </Box>
                                   <Box display="flex" alignItems="center" gap={2} mt={3}>
                                        <LabelOutlined style={{ color: theme.palette.grey[600] }} />
                                        <label
                                             htmlFor="support"
                                             style={{ fontSize: 18, color: theme.palette.grey[600] }}
                                        >
                                             Website Privacy & Policy
                                        </label>
                                   </Box>
                                   <Box
                                        border={`2px dashed`}
                                        borderColor={theme.palette.primary.main}
                                        p={2}
                                        borderRadius={1}
                                   >
                                        <Editor
                                             onBlur={handleBlur("privacyPolicy")}
                                             name="privacyPolicy"
                                             id="privacyPolicy"
                                             onChange={handleChange("privacyPolicy")}
                                             value={values.privacyPolicy}
                                             containerProps={{
                                                  style: {
                                                       height: "300px",
                                                       marginTop: theme.spacing(2),
                                                       borderRadius: 0,
                                                  },
                                             }}
                                        >
                                             <Toolbar>
                                                  <BtnBold />
                                                  <BtnItalic />
                                                  <BtnBulletList />
                                                  <BtnClearFormatting />
                                                  <BtnLink />
                                                  <BtnNumberedList />
                                                  <BtnRedo />
                                                  <BtnUndo />
                                                  <BtnStrikeThrough />
                                                  <BtnStyles />
                                                  <BtnUnderline />
                                             </Toolbar>
                                        </Editor>
                                   </Box>
                                   <Box display="flex" alignItems="center" gap={2} mt={2}>
                                        <LabelOutlined style={{ color: theme.palette.grey[600] }} />
                                        <label
                                             htmlFor="support"
                                             style={{ fontSize: 18, color: theme.palette.grey[600] }}
                                        >
                                             Website Support
                                        </label>
                                   </Box>
                                   <Box
                                        border={`2px dashed`}
                                        borderColor={theme.palette.primary.main}
                                        p={2}
                                        borderRadius={1}
                                   >
                                        <Editor
                                             onBlur={handleBlur("support")}
                                             name="support"
                                             onChange={handleChange("support")}
                                             value={values.support}
                                             containerProps={{
                                                  style: {
                                                       height: "300px",
                                                       marginTop: theme.spacing(2),
                                                       borderRadius: 0,
                                                  },
                                             }}
                                        >
                                             <Toolbar>
                                                  <BtnBold />
                                                  <BtnItalic />
                                                  <BtnBulletList />
                                                  <BtnClearFormatting />
                                                  <BtnLink />
                                                  <BtnNumberedList />
                                                  <BtnRedo />
                                                  <BtnUndo />
                                                  <BtnStrikeThrough />
                                                  <BtnStyles />
                                                  <BtnUnderline />
                                             </Toolbar>
                                        </Editor>
                                   </Box>
                                   <Fab
                                        variant="extended"
                                        color="primary"
                                        aria-label="add"
                                        type="submit"
                                        sx={{ position: "fixed", bottom: 50, right: 50 }}
                                   >
                                        save changes
                                   </Fab>
                              </form>
                         )}
                    </Formik>
               </Box>
          </DefaultLayout>
     );
};
