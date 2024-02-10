import{ Suspense, lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom"
import Loading from "../atoms/LoadingAnim";
// const Home = lazy(() => import('../pages/Home'));
const CreateEmployee = lazy(() => import('../pages/CreateEmployee'));
const EmployeeList = lazy(() => import('../pages/CurrentEmployee'));


// DEV
const Home = lazy(() => withDelay(() => import('../pages/Home')));
const withDelay = (importFunc, delay = 2000) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(importFunc()), delay);
  });
};

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