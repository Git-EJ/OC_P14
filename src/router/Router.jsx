import{ Suspense, lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom"
import Loading from "../atoms/LoadingAnim";
const Home = lazy(() => import('../pages/Home'));
const CreateEmployee = lazy(() => import('../pages/CreateEmployee'));
const EmployeeList = lazy(() => import('../pages/CurrentEmployee'));

/**
 * @description Loading Spinner configuration
 * @type {{addContainerClass: string, textFontSize: string, dotFontSize: string, nbreDots: number}}
 * @property {string} addContainerClass - Add a class to the container
 * @property {string} textFontSize - Font size of the loading text
 * @property {string} dotFontSize - Font size of the loading dots
 * @property {number} nbreDots - Number of dots
 * @default * addContainerClass: "page_loading", 
            * textFontSize: "3rem", 
            * dotFontSize: "2.5rem", 
            * nbreDots: 6     
 */
const loadingConfig= {
  addContainerClass: "page_loading",
  textFontSize: "3rem",
  dotFontSize: "2.5rem",
  nbreDots: 6
}


const Router = createBrowserRouter([

  // Default routes
  {
    path: '/home',
    element: (
      <Suspense fallback={ <Loading {...loadingConfig}/> }>
        <Home />
      </Suspense>
    ),
  },

  {
    path: '/employee-create',
    element: (
      <Suspense fallback={ <Loading {...loadingConfig}/> }>
        <CreateEmployee />
      </Suspense>
    ),
  },
  
  {
    path: '/employee-list',
    element: (
      <Suspense fallback={ <Loading {...loadingConfig}/> }>
        <EmployeeList />
      </Suspense>
    ),
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