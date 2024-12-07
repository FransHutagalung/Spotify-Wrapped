import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import App from "../App";
import ImageRender from "../components/ImageRender";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/user",
        element: <App />
    },
    {
        path: "/render",
        element: <ImageRender />
    },

]);