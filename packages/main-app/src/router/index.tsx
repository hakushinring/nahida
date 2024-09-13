import React from 'react'
import { createBrowserRouter  } from "react-router-dom"
import Home from "../container/home"
import About from "../container/about"
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "about",
      element: <About />,
    },
  ]
)

export default router
