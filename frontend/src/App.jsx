import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

const router=createBrowserRouter([
{
  path:'/',
  element:<div><Login/></div>
},
{
  path:'/register',
  element:<div><Register/></div>
},
{
  path:'/dashboard',
  element:<div> <Dashboard/></div>
}
])
function App() {
  
  return (
    <div>
        <RouterProvider router={router}/>
    </div>
  );
}

export default App;
