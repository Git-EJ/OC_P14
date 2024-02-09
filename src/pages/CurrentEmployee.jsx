import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeesDataContext from "../context/employeesData/EmployeesDataContext";
import Header from "../molecules/Header";
import DataTable from "../molecules/DataTable";
import SpheresButton from "../molecules/SpheresButton";
import CircleArrowLeft from "../atoms/icons/CircleArrowLeft";
import CircleArrowRight from "../atoms/icons/CircleArrowRight";


const arrayOfEmployeesDataTitle = [
  //for editing the data create date read only or not
  {
    key: "firstName",
    value: "FirstName",
    editable: true,
  },
  {
    key: "lastName",
    value: "LastName",
  },
  {
    key: "startDate",
    value: "StartDate",
    type: "date",
  },
  {
    key: "department",
    value: "Department",
  },
  {
    key: "dateOfBirth",
    value: "Date Of Birth",
    type: "date",
  },
  {
    key: "street",
    value: "Street",
    type: 'street'
  },
  {
    key: "city",
    value: "City",
  },
  {
    key: "state",
    value: "State",
  },
  {
    key: "zipCode",
    value: "ZipCode",
    type: 'number'
  },
]


const EmployeeList = () => {

  document.title = process.env.NODE_ENV === "development" ? "HRnet | Employee List DEV" : "HRnet | Employee List";
  
  const navigate = useNavigate();
  const {state, dispatch} = useContext(EmployeesDataContext);

  const { 
    employeesData,
  } = state;

  const [resetSettings, setResetSettings] = useState(false);

  const onResetSettings = useCallback(() => {
    setResetSettings(currentState => !currentState)
  }, [setResetSettings]);


  const addEmployeeLink = () => {
    navigate('/employee-create');
  }

  useEffect(() => {
    console.log("data:", employeesData)
  }, [employeesData])

  
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
            headers={arrayOfEmployeesDataTitle} 
            data={employeesData}
            onResetData={onResetData}
            onResetSettings={onResetSettings}
            resetSettings={resetSettings}
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