import PropTypes from "prop-types";
import { useReducer } from "react";
import EmployeesDataContext from "./EmployeesDataContext";

const initialState = {
  employeesData: [],
  isEmptyEmployeesData: false,
  loading: false,
  error: null,
};

const employeesDataReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMPLOYEES_DATA":
      return {
        ...state,
        employeesData: action.payload,
      }
    case "SET_LOADING": //future Dev
      return {
        ...state,
        loading: action.payload,
      };
    case "SET_ERROR":  //future Dev
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};



const EmployeesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(employeesDataReducer, initialState);
  
  return (
    <EmployeesDataContext.Provider value={{ state, dispatch }}>
      {children}
    </EmployeesDataContext.Provider>
  );
};

export default EmployeesContextProvider;


EmployeesContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};