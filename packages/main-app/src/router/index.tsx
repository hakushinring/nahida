import React from 'react'
import { createBrowserRouter  } from "react-router-dom"
import { Layout } from '@nahida/components'

const loador = (path) => {
  return async () => {
    return { Component: (await import(path)).default as () => React.JSX.Element }
  }
}

const router = createBrowserRouter(
  [
    {
      path: "/portal",
      element: <Layout />,
      children: [
        {
          path: "home",
          lazy: loador('../container/home'),
        },
      ]
    },
    // {
    //   path: "about",
    //   // element: <About />,
    //   lazy: async () => {
    //     let YourComponent = await import('../container/home');
    //     return { Component: YourComponent.default };
    //   },
    // },
  ]
)

export default router
