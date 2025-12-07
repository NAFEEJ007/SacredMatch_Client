import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Biodatas from "../pages/Biodatas/Biodatas";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import PrivateRoute from "./PrivateRoute";
import BiodataDetails from "../pages/BiodataDetails/BiodataDetails";
import Checkout from "../pages/Checkout/Checkout";
import DashboardLayout from "../layout/DashboardLayout";
import EditBiodata from "../pages/Dashboard/EditBiodata";
import ViewBiodata from "../pages/Dashboard/ViewBiodata";
import MyContactRequest from "../pages/Dashboard/MyContactRequest";
import MyFavourites from "../pages/Dashboard/MyFavourites";
import GotMarried from "../pages/Dashboard/GotMarried";
import AdminHome from "../pages/Dashboard/AdminHome";
import ManageUsers from "../pages/Dashboard/ManageUsers";
import ApprovedPremium from "../pages/Dashboard/ApprovedPremium";
import ApprovedContactRequest from "../pages/Dashboard/ApprovedContactRequest";
import AdminRoute from "./AdminRoute";
import SuccessStory from "../pages/SuccessStory/SuccessStory";
import AdminSuccessStory from "../pages/Dashboard/AdminSuccessStory";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "biodatas",
        element: <Biodatas />,
      },
      {
        path: "biodatas/:id",
        element: <PrivateRoute><BiodataDetails /></PrivateRoute>,
        loader: ({params}) => fetch(`${import.meta.env.VITE_API_URL}/biodatas/${params.id}`)
      },
      {
        path: "checkout/:biodataId",
        element: <PrivateRoute><Checkout /></PrivateRoute>,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "success-stories",
        element: <SuccessStory />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
        {
            path: "edit-biodata",
            element: <EditBiodata />
        },
        {
            path: "view-biodata",
            element: <ViewBiodata />
        },
        {
            path: "my-contact-request",
            element: <MyContactRequest />
        },
        {
            path: "my-favourites",
            element: <MyFavourites />
        },
        {
            path: "got-married",
            element: <GotMarried />
        },
        // Admin Routes
        {
            path: "admin-home",
            element: <AdminRoute><AdminHome /></AdminRoute>
        },
        {
            path: "manage-users",
            element: <AdminRoute><ManageUsers /></AdminRoute>
        },
        {
            path: "approved-premium",
            element: <AdminRoute><ApprovedPremium /></AdminRoute>
        },
        {
            path: "approved-contact-request",
            element: <AdminRoute><ApprovedContactRequest /></AdminRoute>
        },
        {
            path: "admin-success-story",
            element: <AdminRoute><AdminSuccessStory /></AdminRoute>
        }
    ]
  }
]);
