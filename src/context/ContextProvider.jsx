import PropTypes from "prop-types";
import { useReducer } from "react";
import Context from "./Context";


const initialState = {
  currentData: [],
  activeSortIndex: null,
  isActiveCaretAsc: false,
  isActiveCaretDesc: false,
  currentPage: 1,
  selectValue: 1,
  dataLength: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CURRENT_DATA":
      return {
        ...state,
        currentData: action.payload,
      };
    case "SET_ACTIVE_SORT_INDEX":
      return {
        ...state,
        activeSortIndex: action.payload,
      };
    case "SET_IS_ACTIVE_CARET_ASC":
      return {
        ...state,
        isActiveCaretAsc: action.payload,
      };
    case "SET_IS_ACTIVE_CARET_DESC":
      return {
        ...state,
        isActiveCaretDesc: action.payload,
      };
    case "SET_CURRENT_PAGE":
      return {
        ...state,
        currentPage: action.payload,
      };
    case "SET_SELECT_VALUE":
      return {
        ...state,
        selectValue: action.payload,
      };
    case "SET_DATA_LENGTH":
      return {
        ...state,
        dataLength: action.payload,
      };
    default:
      return state;
  }
};


const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);



  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
export default ContextProvider;

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};