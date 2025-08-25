import React, { Suspense, Fragment, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import { BASE_URL } from './config/constant';
import RootAdminLayout from 'layouts/RootAdminLayout';

export const renderRoutes5 = (routes = []) => (
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
                <Layout>{route.routes ? renderRoutes5(route.routes) : <Element props={true} />}</Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

const root_admin_route = [
  {
    path: '/rootadmin',
    layout: RootAdminLayout,
    routes: [
      {
        exact: 'true',
        path: '*',
        element: lazy(() => import('./views/root-admin/dashboard'))
      },

    ]
  },
  {
    path: '/rootadmin/assistance',
    layout: RootAdminLayout,
    routes: [
      {
        exact: 'true',
        path: '*',
        element: lazy(() => import('./views/root-admin/assistance'))
      },

    ]
  },
  {
    path: '/rootadmin/lense',
    layout: RootAdminLayout,
    routes: [
      {
        exact: 'true',
        path: '*',
        element: lazy(() => import('./views/root-admin/lens'))
      },

    ]
  },
  {
    path: '/rootadmin/frame',
    layout: RootAdminLayout,
    routes: [
      {
        exact: 'true',
        path: '*',
        element: lazy(() => import('./views/root-admin/frame'))
      },

    ]
  },
  {
    path: '/rootadmin/users',
    layout: RootAdminLayout,
    routes: [
      {
        exact: 'true',
        path: '*',
        element: lazy(() => import('./views/root-admin/users'))
      },

    ]
  },
  {
    path: '/rootadmin/inventory',
    layout: RootAdminLayout,
    routes: [
      {
        exact: 'true',
        path: '*',
        element: lazy(() => import('./views/root-admin/inventory'))
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

export default root_admin_route;
