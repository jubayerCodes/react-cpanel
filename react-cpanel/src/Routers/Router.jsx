import React from 'react';

import Home from '../Pages/Home/Home';
import MainLayout from '../Layouts/MainLayout';
import Post from '../Pages/Post/Post';
import { createBrowserRouter } from 'react-router';

// Updated router using 'Component' for the newer API
const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,  // Use Component instead of element
    children: [
      {
        index: true,  // Represents the '/' path
        Component: Home,  // Use Component here
      },
      {
        path: "/posts/:id",
        Component: Post,  // Use Component here
        loader: async ({ params }) => {
          const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
          return response.json();  // Return the post data
        }
      }
    ]
  },
]);

export default router;