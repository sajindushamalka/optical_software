import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';
import AssistanceLayout from 'layouts/AssistanceLayout';
import OptometristLayout from 'layouts/OptometristLayout';
import CashierLayout from 'layouts/CashierLayout';

export const renderRoutes2 = (routes = []) => (
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
                <Layout>{route.routes ? renderRoutes2(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const assistance_routes = [
  {
    path: '/assistance',
    layout: AssistanceLayout,
    routes: [
      {
        exact: 'true',
        path: '*',
        element: lazy(() => import('./views/dashboard'))
      },

    ]
  },
  {
    path: '/assistance/order',
    layout: AssistanceLayout,
    routes: [
      {
        exact: 'true',
        path: '*',
        element: lazy(() => import('./views/assistance/order/Index'))
      },

    ]
  },
  {
    path: '/assistance/invoice',
    layout: AssistanceLayout,
    routes: [
      {
        exact: 'true',
        path: '*',
        element: lazy(() => import('./views/assistance/invoice/Index'))
      },

    ]
  },
  {
    path: '/assistance/order/all',
    layout: AssistanceLayout,
    routes: [
      {
        exact: 'true',
        path: '*',
        element: lazy(() => import('./views/assistance/order/Allorders'))
      },

    ]
  },
  {
    path: '/logout',
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

export default assistance_routes;
