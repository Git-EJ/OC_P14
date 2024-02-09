import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '/public/assets/index.css'
import EmployeesContextProvider from './context/employeesData/EmployeesDataContextProvider.jsx'
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <EmployeesContextProvider>
        <App />
      </EmployeesContextProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
