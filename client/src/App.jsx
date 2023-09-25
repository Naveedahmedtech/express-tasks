import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Header from './components/Layout/Header';
import Tasks from './components/Tasks/Tasks';
import './index.css';
import View from './components/Tasks/View';
import Add from './components/Tasks/Add';
import Update from './components/Tasks/update';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route
      path='/'
      element={<Header />}
      errorElement={<h1>We're right back soon...🥰</h1>}
    >
    <Route index path='/' element={<Tasks />} />
    <Route index path='/task-view/:id' element={<View />} />
    <Route index path='/add-task' element={<Add />} />
    <Route index path='/update-task/:id' element={<Update />} />
    </Route>
  ))
  

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
