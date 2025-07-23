import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ViewStory from './ViewStory.jsx'
import Profile from './Profile.jsx'
import Followers from './followers.jsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />
    },
    {
      path: '/story/:postId/:tot',
      element: <ViewStory />
    },
    {
      path: '/profile',
      element: <Profile />
    },
    {
      path: '/followers',
      element: <Followers />
    },
  ]
)

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
