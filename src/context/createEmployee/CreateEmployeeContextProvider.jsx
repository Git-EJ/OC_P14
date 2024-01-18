import PropTypes from "prop-types";
import { useReducer } from "react";
import CreateEmployeeContext from "./CreateEmployeeContext";


const createEmployeeInitialState = {
  isModalOpen: false,
};

const createEmployeeReducer = (state, action) => {
  switch (action.type) {
    case "SET_IS_MODAL_OPEN":
      return {
        ...state,
        isModalOpen: action.payload,
      };
    case "SET_IS_MODAL_CLOSE":
      return {
        ...state,
        isModalOpen: action.payload,
      };
    case "SET_RESET_FORM":
      return {
        ...createEmployeeInitialState,
      };
    default:
      return state;
  }
};



const CreateEmployeeContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(createEmployeeReducer, createEmployeeInitialState);

  return (
    <CreateEmployeeContext.Provider value={{state, dispatch}}>
      {children}
    </CreateEmployeeContext.Provider>
  );
}

export default CreateEmployeeContextProvider;


CreateEmployeeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};