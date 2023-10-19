import React from "react";
import ReactDOM from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import QueueComponent from "./components/QueueComponent.tsx";
import TimelineComponent from "./components/TimelineComponent.tsx";
import "./index.css";

const router = createHashRouter([
  {
    path: "/",
    element: <QueueComponent />,
  },
  {
    path: "/timeline",
    element: <TimelineComponent />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
);
