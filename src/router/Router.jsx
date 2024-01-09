import { Navigate, createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home";
import CreateEmployee from "../pages/CreateEmployee";
import EmployeeList from "../pages/EmployeeList";


const Router = createBrowserRouter([


  // Default routes
  {
    path: '/home',
    element: <Home />,
  },

  {
    path: '/employee-create',
    element: <CreateEmployee />,
  },

  {
    path: '/employee-create',
    element: <CreateEmployee />,
  },
  
  {
    path: '/employee-list',
    element: <EmployeeList />,
  },
  

  // Redirections Routes
  {
    path: '/',
    element: <Navigate to ='/home' replace />,
  },

  {
    path: '*',
    element: <Navigate to ='/employee-create' replace />,
  },

  
]);

export default Router;