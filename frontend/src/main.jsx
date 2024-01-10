import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './Components/userPages/Auth';
import 'react-toastify/dist/ReactToastify.css';







ReactDOM.createRoot(document.getElementById('root')).render(
  
      <App />
   
  );