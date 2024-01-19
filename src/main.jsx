import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/css/index.css'
import EmployeesContextProvider from './context/employeesData/EmployeesDataContextProvider.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EmployeesContextProvider>
      <App />
    </EmployeesContextProvider>
  </React.StrictMode>,
)
