import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import EmployeesDataContext from "../context/employeesData/EmployeesDataContext";
import Header from "../molecules/Header";
import DataTable from 'oc_react_datatable';
import SpheresButton from "../molecules/SpheresButton";
import CircleArrowLeft from "../atoms/icons/CircleArrowLeft";
import CircleArrowRight from "../atoms/icons/CircleArrowRight";


/**
 * @description DataTable Headers for the Employee List
 * @constant arrayOfEmployeesDataTitle
 * @type {Array<object>}
 * @property {string} key - key for the data
 * @property {string} value - value for the header
 * @property {boolean} editable - is the data editable(optional)
 * @property {object} sx - style object for the header
 * @property {string} type - type of the data (optional)
 */
const arrayOfEmployeesDataTitle = [
  //for editing the data create date read only or not
  {
    key: "firstName",
    value: "FirstName",
    editable: true,
    sx: {
      width: '13%',
    }
  },
  {
    key: "lastName",
    value: "LastName",
    sx: {
      width: '13%',
    }
  },
  {
    key: "startDate",
    value: "StartDate",
    type: "date",
    sx: {
      width: '10%',
    }
  },
  {
    key: "department",
    value: "Department",
    sx: {
      width: '13%',
    }
  },
  {
    key: "dateOfBirth",
    value: "Date Of Birth",
    type: "date",
    sx: {
      width: '10%',
    }
  },
  {
    key: "street",
    value: "Street",
    type: 'street',
    sx: {
      width: '13%',
    }
  },
  {
    key: "city",
    value: "City",
    sx: {
      width: '13%',
    }
  },
  {
    key: "state",
    value: "State",
    sx: {
      width: '7%',
    }
  },
  {
    key: "zipCode",
    value: "ZipCode",
    type: 'number',
    sx: {
      width: '8%',
    }
  },
]

/**
 * @description EmployeeList page component 
 * @returns {JSX.Element} - EmployeeList component
 */
const EmployeeList = () => {

  document.title = process.env.NODE_ENV === "development" ? "HRnet | Employee List DEV" : "HRnet | Employee List";
  
  const navigate = useNavigate();
  const {state, dispatch} = useContext(EmployeesDataContext);

  const { 
    employeesData,
  } = state;


  const addEmployeeLink = () => {
    navigate('/employee-create');
  }

  /**
   * @description Reset the data that is displayed
   */
  const onResetData = useCallback(() => {
    if (process.env.NODE_ENV === "development") {
      let data = []
      const ls = window.localStorage.getItem('employees')
      if (ls) data = JSON.parse(ls) || []
      dispatch({ type: "SET_EMPLOYEES_DATA", payload: data })
    }
  },[dispatch]);


  return (
    <>
      <Header navigateButton_1='/employee-create' textButton_1='Create Employee' />
      <main className="main_wrapper">
        <h2 className="current-employee_page-title">Employee List</h2>

          <DataTable
            stylePrefix={'data-table'}
            headers={arrayOfEmployeesDataTitle} 
            data={employeesData}
            onResetData={onResetData}
            enableResetSettings={true}
            resetAfterSearch={true}
            IconLeft={()=><CircleArrowLeft color1={'#1494B9'} color2={'#1494B9'} rayon={70}/>} //for future dev with background gradient on svg icon
            IconRight={()=><CircleArrowRight color1={'#1494B9'} color2={'#1494B9'} rayon={70} />} //for future dev with background gradient on svg icon
          />

          <SpheresButton 
            type="submit" 
            className="spheres-button_button" 
            onClick={addEmployeeLink} text="Add Employee"
            container={window}
            maxRadius={80} 
          />

      </main>
    </>
  );
};

export default EmployeeList;