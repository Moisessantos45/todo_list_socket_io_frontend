import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'
import { AppProvider } from './context/AppProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
    <RouterProvider router={App}/>
    </AppProvider>
    {/* <App /> */}
  </React.StrictMode>,
)
