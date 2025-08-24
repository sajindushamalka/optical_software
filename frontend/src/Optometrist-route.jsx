import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';
import AssistanceLayout from 'layouts/AssistanceLayout';
import OptometristLayout from 'layouts/OptometristLayout';
import CashierLayout from 'layouts/CashierLayout';

export const renderRoutes3 = (routes = []) => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Element = route.element;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>{route.routes ? renderRoutes3(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const optometrist_routes = [
  {
    path: '/optometrist/dashboard',
    layout: OptometristLayout,
    routes: [
      {
        exact: 'true',
        path: '*',
        element: lazy(() => import('./views/optometrist/dashboard'))
      },
     
    ]
  },
  {
    path: '/optometrist/orders',
    layout: OptometristLayout,
    routes: [
      {
        exact: 'true',
        path: '*',
        element: lazy(() => import('./views/optometrist/orders/Index'))
      },
     
    ]
  },
    {
    path: '/optometrist/logout',
    layout: OptometristLayout,
    routes: [
      {
        exact: 'true',
        path: '*',
        element: lazy(() => import('./logout'))
      },
     
    ]
  },
  {
    path: '/logoutO',
    layout: Fragment, // no layout needed
    routes: [
      {
        exact: 'true',
        path: '*',
        element: () => {
          localStorage.clear();
          window.location.href = "/aas";
          return null; // nothing to render
        }
      }
    ]
  }
];

export default optometrist_routes;
