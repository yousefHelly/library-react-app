import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import React from 'react'
//Layout
import { NavBar } from './components/layout/NavBar';
import { Error } from "./components/layout/Error";
//Pages
import { Home } from "./pages/Home";
import { Categories } from "./pages/Categories/Categories";
import { Search } from './pages/Search';
import { MyRequests } from './pages/MyRequests';
import { Reading } from './pages/Reading';
import { Login } from './pages/Login';
import { BookView } from './pages/BookView';
import { Settings } from './pages/Settings/Settings';
import { SettingsProfile } from './pages/Settings/SettingsProfile';
import { SettingsHistory } from "./pages/Settings/SettingsHistory";
import { SettingsAccountStatus } from "./pages/Settings/SettingsAccountStatus";
import { CategoryAllBooks } from "./pages/Categories/CategoryAllBooks";
import { Authors } from './pages/Authors/Authors';
import { AuthorProfile } from "./pages/Authors/AuthorProfile";

const router = createBrowserRouter(
  createRoutesFromElements(
      <React.Fragment>
      <Route path='/login' element={<Login/>}></Route>
      <Route element={<NavBar/>}>
        <Route index element={<Home/>}/>
        <Route path="/categories">
          <Route index element={<Categories/>}/>
          <Route path=":category" element={<CategoryAllBooks/>}/>
        </Route>
        <Route path="/authors">
          <Route index element={<Authors/>}/>
          <Route path=":author" element={<AuthorProfile/>}/>
        </Route>
        <Route path="/search" element={<Search/>}/>
        <Route path="/my-requests" element={<MyRequests/>}/>
        <Route path="/reading" element={<Reading/>}/>
        <Route path="/:id" element={<BookView/>}/>
        <Route path="*" element={<Error/>}/>
        <Route path="/settings" element={<Settings/>}>
          <Route path="search-history" element={<SettingsHistory/>} />
          <Route path="profile" element={<SettingsProfile/>}/>
          <Route path="account-status" element={<SettingsAccountStatus/>} />
        </Route>
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
