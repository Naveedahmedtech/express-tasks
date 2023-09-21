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

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route
      path='/'
      element={<Header />}
    >
    <Route index path='/' element={<Tasks />} />
    </Route>
  ))
  

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
