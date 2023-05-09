import React from "react";

const DashboardPage = React.lazy(() => import("./pages/home/index"));
const LoginPage = React.lazy(() => import("./pages/login/index"));
const AddCarouselPage = React.lazy(() => import("./pages/carousel/add/index"));
const ManageCarouselPage = React.lazy(() => import("./pages/carousel/manage/index"));
const AddSubCategoryPage = React.lazy(() => import("./pages/sub-category/add/index"));
const ManageSubCategoryPage = React.lazy(() => import("./pages/sub-category/manage/index"));
const AddCategoryPage = React.lazy(() => import("./pages/category/add/index"));
const ManageCategoryPage = React.lazy(() => import("./pages/category/manage/index"));
const ManageMainCategoryPage = React.lazy(() => import("./pages/main-category/manage/index"));
const AddMainCategoryPage = React.lazy(() => import("./pages/main-category/add/index"));
const ManageAccommodationPage = React.lazy(() => import("./pages/content/accommodation/manage/index"));
const AddAccommodationPage = React.lazy(() => import("./pages/content/accommodation/add/index"));
const ManageToursTravelPage = React.lazy(() => import("./pages/content/tours-travel/manage/index"));
const AddToursTravelPage = React.lazy(() => import("./pages/content/tours-travel/add/index"));
const AdminUserPage = React.lazy(() => import("./pages/admin/user/index"));
const DatabaseAnalyticsPage = React.lazy(() => import("./pages/analytics/database/index"));
const WebPageAnalyticsPage = React.lazy(() => import("./pages/analytics/webpage/index"));
const AdminProfilePage = React.lazy(() => import("./pages/admin/profile/index"));

export {
     AddAccommodationPage,
     AddCarouselPage,
     AddCategoryPage,
     AddMainCategoryPage,
     AddSubCategoryPage,
     AddToursTravelPage,
     AdminProfilePage,
     AdminUserPage,
     DashboardPage,
     DatabaseAnalyticsPage,
     LoginPage,
     ManageAccommodationPage,
     ManageCarouselPage,
     ManageCategoryPage,
     ManageMainCategoryPage,
     ManageSubCategoryPage,
     ManageToursTravelPage,
     WebPageAnalyticsPage,
};
