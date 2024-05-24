import { createBrowserRouter } from "react-router-dom";
import MainRoute from "../Layout/MainRoute";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import OurShop from "../Pages/OurShop/OurShop/OurShop";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Cart from "../Pages/Dashboard/Cart/Cart";
import PrivateRoute from "../Routes/PrivateRoute";
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainRoute></MainRoute>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'menu',
                element: <Menu></Menu>
            },
            {
                path: 'shop/:category',
                element: <OurShop></OurShop>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            //user routes
            {
                path: "cart",
                element: <Cart></Cart>
            },

            //admin routes
            {
                path: "allUsers",
                element: <AllUsers></AllUsers>
            }
        ]
    }
]);