import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import CreateProduct from "./Pages/CreateProducts";
import RemoveProduct from "./Pages/RemoveProducts";
import Logout from "./Pages/Logout";
import OrderHistory from "./Pages/OrderHistory";
import UpdateProduct from "./Pages/UpdateProducts";

export const router = createBrowserRouter([

    {
        path: "/",
        element: <App />
    },

    {
        path: "/Products",
        element: <Products />
    },
    
    {
        path: "/Cart",
        element: <Cart />
    },
    
    {
        path: "/Signup",
        element: <Signup />
    },
    
    {
        path: "/Login",
        element: <Login />
    },

    {
        path: "/CreateProducts",
        element: <CreateProduct />
    },

    {
        path: "/RemoveProducts",
        element: <RemoveProduct />
    },

    {
        path: "/UpdateProducts",
        element: <UpdateProduct />
    },

    {
        path: "/Logout",
        element: <Logout />
    },

    {
        path: "/OrderHistory",
        element: <OrderHistory />
    },
    
]);