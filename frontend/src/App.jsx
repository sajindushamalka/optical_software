import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import routes, { renderRoutes } from './routes';
import assistance_routes, { renderRoutes2 } from './assistance-route';
import optometrist_routes, { renderRoutes3 } from './Optometrist-route';
import cashier_routes, { renderRoutes4 } from './cashier-route';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import root_admin_route, { renderRoutes5 } from 'root-admin-route';

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const userData = JSON.parse(localStorage.getItem('user'));

  const isAssistance = userData && userData?.u_type === 'Assistance';
  const isOptpmetrist = userData && userData?.u_type === 'Optometrist';
  const isCashier = userData && userData?.u_type === 'Cashier';
  const isRootAdmin = userData && userData?.u_type === 'RootAdmin';

  return (
    <BrowserRouter basename={import.meta.env.VITE_APP_BASE_NAME}>
      <ToastContainer position="top-right" autoClose={3000} />
      {isAssistance
        ? renderRoutes2(assistance_routes)
        : isOptpmetrist
          ? renderRoutes3(optometrist_routes)
          : isCashier
            ? renderRoutes4(cashier_routes)
            : isRootAdmin ? 
              renderRoutes5(root_admin_route)
            : renderRoutes(routes)}
    </BrowserRouter>
  );
};

export default App;



