import React, { useReducer } from 'react'
import { RouterProvider  } from "react-router-dom"
import { QueryClient, QueryClientProvider } from 'react-query'
import GlobalModel, { GlobalContext } from './global-model'
import router from './router'

const queryClient = new QueryClient()

export default function App () {
  const [state, dispatch] = useReducer(GlobalModel.reducer, GlobalModel.state)

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContext.Provider value={{ state, dispatch }}>
        <RouterProvider router={router} />
      </GlobalContext.Provider>
    </QueryClientProvider >
  )
}
