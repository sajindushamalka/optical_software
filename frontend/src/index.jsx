import React from 'react';
import { createRoot } from 'react-dom/client';

import { ConfigProvider } from './contexts/ConfigContext';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/store'

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}> 
  <ConfigProvider>
    <App />
  </ConfigProvider>
  </Provider>
);

reportWebVitals();
