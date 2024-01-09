import { Navigate, createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home";
import EmployeeList from "../pages/EmployeeList";

const Router = createBrowserRouter([


  // Default routes
  {
    path: '/employee-create',
    element: <Home />,
  },
  
  {
    path: '/employee-list',
    element: <EmployeeList />,
  },
  

  // Redirections Routes
  {
    path: '/',
    element: <Navigate to ='/employee-create' replace />,
  },

  {
    path: '*',
    element: <Navigate to ='/employee-create' replace />,
  },

  
]);

export default Router;