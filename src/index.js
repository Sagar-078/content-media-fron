import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppContextProvider from './context/AppContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppContextProvider>
  <BrowserRouter>
      <Toaster/>
      <App />
  </BrowserRouter>
  </AppContextProvider>
);