import React from 'react'
import ReactDOM from 'react-dom/client'
import { PATHS } from './paths'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {CafeHomepage }from './components/Home'
import { LoginPage } from './components/LoginPage'
import { ErrorPage } from './components/ErrorPage'

const router = createBrowserRouter([
    {
        path: PATHS.home,
        element: <CafeHomepage />,
        errorElement: <ErrorPage />
    },
    {
        path: PATHS.menu,
        element: <div>Menu</div>,
        errorElement: <ErrorPage />
    },
    {
        path: PATHS.about,
        element: <div>About</div>,
        errorElement: <ErrorPage />
    },
    {
        path: PATHS.contact,
        element: <div>Contact</div>,
        errorElement: <ErrorPage />
    },
    {
        path: PATHS.login,
        element: <LoginPage />,
        errorElement: <ErrorPage />
    },
    {
        path: PATHS.register,
        element: <div>Register</div>,
        errorElement: <ErrorPage />
    },
    {
        path: "*",
        element: <ErrorPage />
    }
])

const Index = (): React.JSX.Element =>{
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Index />)