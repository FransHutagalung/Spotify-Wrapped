import './index.css'
import React from "react";
import ReactDOM from "react-dom/client";
import { router } from './router/routes';
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
);
