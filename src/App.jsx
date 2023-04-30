import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import React from 'react'
//Layout
import { NavBar } from './components/layout/NavBar';
import { Error } from "./components/layout/Error";
import { Admin } from './pages/Admin/Admin';
import { Settings } from './pages/Settings/Settings';
import { RequestsLayout } from "./pages/Admin/Requests/RequestsLayout";
//Pages
import { Home } from "./pages/Home";
import { Categories } from "./pages/Categories/Categories";
import { Search } from './pages/Search';
import { MyRequests } from './pages/MyRequests';
import { Reading } from './pages/Reading';
import { Login } from './pages/Login';
import { BookView } from './pages/BookView';
import { SettingsProfile } from './pages/Settings/SettingsProfile';
import { SettingsHistory } from "./pages/Settings/SettingsHistory";
import { SettingsAccountStatus } from "./pages/Settings/SettingsAccountStatus";
import { CategoryAllBooks } from "./pages/Categories/CategoryAllBooks";
import { Authors } from './pages/Authors/Authors';
import { AuthorProfile } from "./pages/Authors/AuthorProfile";
import { AdminAllBooks } from "./pages/Admin/AdminAllBooks";
import { AdminAddEditBook } from "./pages/Admin/AdminAddEditBook";
import { AdminPendingRequests } from "./pages/Admin/Requests/AdminPendingRequests";
import { AdminApprovedRequests } from "./pages/Admin/Requests/AdminApprovedRequests";
import { AdminDeclinedRequests } from "./pages/Admin/Requests/AdminDeclinedRequests";
import { AdminAllUsers } from "./pages/Admin/AdminAllUsers";
import { AdminViewRequests } from "./pages/Admin/Requests/AdminViewRequests";
import { AdminAddEditUser } from "./pages/Admin/AdminAddEditUser";

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
        <Route path="/settings" element={<Settings/>}>
          <Route path="search-history" element={<SettingsHistory/>} />
          <Route path="profile" element={<SettingsProfile/>}/>
          <Route path="account-status" element={<SettingsAccountStatus/>} />
        </Route>
        <Route path="/admin" element = {<Admin/>}>
          <Route path="all-books" element={<AdminAllBooks/>} />
          <Route path="add-edit-book/" element={<AdminAddEditBook/>} />
          <Route path="add-edit-book/:id" element={<AdminAddEditBook/>} />
          <Route path="requests" element={<RequestsLayout/>}>
            <Route path="pending-requests" element={<AdminPendingRequests/>} />
            <Route path="approved-requests" element={<AdminApprovedRequests/>} />
            <Route path="declined-requests" element={<AdminDeclinedRequests/>} />
            <Route path="view-requests/:id" element={<AdminViewRequests/>} />
          </Route>
          <Route path="all-users" element={<AdminAllUsers/>} />
          <Route path="add-edit-user" element={<AdminAddEditUser/>} />
          <Route path="add-edit-user/:id" element={<AdminAddEditUser/>} />
        </Route>
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
