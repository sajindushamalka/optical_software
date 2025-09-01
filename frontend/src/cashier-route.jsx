import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';

import { BASE_URL } from './config/constant';
import AssistanceLayout from 'layouts/AssistanceLayout';
import OptometristLayout from 'layouts/OptometristLayout';
import CashierLayout from 'layouts/CashierLayout';

export const renderRoutes4 = (routes = []) => (
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
                <Layout>{route.routes ? renderRoutes4(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const cashier_routes = [
  {
    path: '/cashier',
    layout: CashierLayout,
    routes: [
      {
        exact: 'true',
        path: '*',
        element: lazy(() => import('./views/dashboard'))
      },

    ]
  },
  {
    path: '/cashier/invoice',
    layout: CashierLayout,
    routes: [
      {
        exact: 'true',
        path: '*',
        element: lazy(() => import('./views/cashier/invoice/Index'))
      },

    ]
  },
  {
    path: '/cashier/ongoing',
    layout: CashierLayout,
    routes: [
      {
        exact: 'true',
        path: '*',
        element: lazy(() => import('./views/cashier/history/Index'))
      },

    ]
  },
  {
    path: '/cashier/history',
    layout: CashierLayout,
    routes: [
      {
        exact: 'true',
        path: '*',
        element: lazy(() => import('./views/cashier/history/Index'))
      },

    ]
  },
   {
    path: '/logout',
    layout: CashierLayout, // no layout needed
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

export default cashier_routes;
