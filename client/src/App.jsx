import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout"
import ErrorPage from "./pages/ErrorPage"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import CreateTask from "./pages/CreateTask"
import GetTask from "./pages/GetTask"
import EditTask from "./pages/EditTask"
import DeleteTask from "./pages/DeleteTask"
import UserProvider from "./context/userContext"
import Logout from "./pages/Logout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider><Layout/></UserProvider>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <Home/>},
      {path: "/login", element: <Login/>},
      {path: "/logout", element: <Logout/>},
      {path: "/register", element: <Register/>},
      {path: "/create", element:<CreateTask/>},
      {path: "/tasks/:id", element: <GetTask/>},
      {path: "/tasks/:id/edit", element: <EditTask/>},
      {path: "/tasks/:id/delete", element: <DeleteTask/>},
    ]
  },
])



function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
