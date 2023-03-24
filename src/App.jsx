import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import React from 'react'
//Layout
import { NavBar } from './components/layout/NavBar';
import { Error } from "./components/layout/Error";
//Pages
import { Home } from "./pages/Home";
import { Categories } from "./pages/Categories";
import { Authors } from "./pages/Authors";
import { Search } from './pages/Search';
import { MyRequests } from './pages/MyRequests';
import { Reading } from './pages/Reading';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { BookView } from './pages/BookView';

const router = createBrowserRouter(
  createRoutesFromElements(
      <React.Fragment>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/register' element={<Register/>}></Route>
      <Route element={<NavBar/>}>
        <Route index element={<Home/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/authors" element={<Authors/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/my-requests" element={<MyRequests/>}/>
        <Route path="/reading" element={<Reading/>}/>
        <Route path="/:id" element={<BookView/>}/>
        <Route path="*" element={<Error/>}/>
      </Route>
      </React.Fragment>
  )
)

function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
