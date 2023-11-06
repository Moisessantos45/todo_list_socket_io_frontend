import { createBrowserRouter } from "react-router-dom";

import React from "react";
import Layout from "./Layouts/Layout";
import Home from "./home/Home";
import TodoList from "./pages/TodoList";
import LayoutUser from "./Layouts/LayoutUser";
import FormRegistrer from "./pages/FormRegistrer";
import FormLogin from "./pages/FormLogin";

const App = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "register",
        element: <FormRegistrer />,
      },
      {
        path: "login",
        element: <FormLogin />,
      },
    ],
  },
  {
    path: "/tareas/:idUser",
    element: <LayoutUser />,
    children: [
      {
        index: true,
        element: <TodoList />,
      },
    ],
  },
]);

export default App;
