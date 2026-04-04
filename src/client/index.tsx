import React from 'react'
import ReactDOM from 'react-dom/client'
import { PATHS } from './paths'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: PATHS.home,
        element: <div>Home</div>
    },
    {
        path: PATHS.menu,
        element: <div>Menu</div>
    },
    {
        path: PATHS.about,
        element: <div>About</div>
    },
    {
        path: PATHS.contact,
        element: <div>Contact</div>
    },
    {
        path: PATHS.login,
        element: <div>Login</div>
    },
    {
        path: PATHS.register,
        element: <div>Register</div>

    }
])
const Index = (): React.JSX.Element =>{
    return (
        <React.StrictMode>
            <div>
            <RouterProvider router={router} />
            </div>
        </React.StrictMode>
    )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<Index />)