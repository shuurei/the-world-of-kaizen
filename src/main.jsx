import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '@/App'
import './global.styles.css'

import Home from '@/routes/Home'
import Progression from '@/routes/Progression'
import Story from '@/routes/Story'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home /> 
      },
      {
        path: '/progression',
        element: <Progression /> 
      },
      {
        path: '/story?/:chapterId',
        element: <Story />
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);