import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';

import './index.css';
import './landing.css';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = document.getElementById('root');

// Hydration ishlatish (SSR uchun)
ReactDOM.hydrateRoot(
  root,
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
