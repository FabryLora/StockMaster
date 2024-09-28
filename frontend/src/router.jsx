import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import HomePage from "./views/HomePage.jsx";
import Login from "./views/Login.jsx";
import Productos from "./views/Productos.jsx";
import Signup from "./views/Signup.jsx";
import Ventas from "./views/Ventas.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/productos",
                element: <Navigate to={"/"} />,
            },
            {
                path: "/",
                element: <Productos />,
            },
            {
                path: "/ventas",
                element: <Ventas />,
            },
        ],
    },

    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/home",
                element: <HomePage />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
]);

export default router;
