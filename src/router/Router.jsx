import{ Suspense, lazy } from "react";
import { Navigate, createBrowserRouter } from "react-router-dom"

const Home = lazy(() => import('../pages/Home'));
const CreateEmployee = lazy(() => import('../pages/CreateEmployee'));
const EmployeeList = lazy(() => import('../pages/CurrentEmployee'));


//DEV
// const Home = lazy(() => withDelay(() => import('../pages/Home')));
// const withDelay = (importFunc, delay = 2000) => {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(importFunc()), delay);
//   });
// };

const Loader = () =>
  <div className='page_loading loading_dots'>
    <p >Loading</p>
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </div>;


const Router = createBrowserRouter([

  // Default routes
  {
    path: '/home',
    element: (
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    ),
  },

  {
    path: '/employee-create',
    element: (
      <Suspense fallback={<Loader />}>
        <CreateEmployee />
      </Suspense>
    ),
  },
  
  {
    path: '/employee-list',
    element: (
      <Suspense fallback={<Loader />}>
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