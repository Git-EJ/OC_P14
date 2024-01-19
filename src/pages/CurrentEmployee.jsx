import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeesDataContext from "../context/employeesData/EmployeesDataContext";
import Header from "../molecules/Header";
import DataTable from "../molecules/DataTable";
import SpheresButton from "../molecules/SpheresButton";
import CircleArrowLeft from "../assets/icons/CircleArrowLeft";
import CircleArrowRight from "../assets/icons/CircleArrowRight";

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

const arrayOfEmployeesDataContents = [
  {
    firstName: "Jean",
    lastName: "DuCode",
    startDate: "01/10/2024",
    department: "Human Ressources",
    dateOfBirth: "02/02/1988",
    street: "20 rue du code",
    city: "ReactCity",
    state: "RC",
    zipCode: "01010",
  },
  {
    firstName: "Jeanne",
    lastName: "DuCode",
    startDate: "01/01/2024",
    department: "Tech",
    dateOfBirth: "10/02/1983",
    street: "2 rue du code",
    city: "AngularCity",
    state: "AC",
    zipCode: "00100",
  },
  {
    firstName: "Alain",
    lastName: "Deloin",
    startDate: "10/01/2024",
    department: "Sales",
    dateOfBirth: "02/01/2024",
    street: "1 avenue de vite",
    city: "VueCity",
    state: "VC",
    zipCode: "00010",
  },
  {
    firstName: "Michel",
    lastName: "Colucci",
    startDate: "28/01/2001",
    department: "Human Ressources",
    dateOfBirth: "20/01/2023",
    street: "01 chemin du resto",
    city: "JavaScriptCity",
    state: "JS",
    zipCode: "00001",
  },
  {
    firstName: "Lucien",
    lastName: "Jean",
    startDate: "09/08/2000",
    department: "Tech",
    dateOfBirth: "31/01/1960",
    street: "03 avenue du vanilla",
    city: "VanillaCity",
    state: "VC",
    zipCode: "00011",
  },
  {
    firstName: "Jean-lucien",
    lastName: "Guillements",
    startDate: "11/06/2001",
    department: "Sales",
    dateOfBirth: "10/01/1985",
    street: "10 avenue du vanilla",
    city: "VanillaCity",
    state: "VC",
    zipCode: "00011",
  },
]

const generateMockedData = (nbEmployees) =>{
  let out = [];
  for (let i = 0; i < nbEmployees; i++) {
    out.push(arrayOfEmployeesDataContents[i % arrayOfEmployeesDataContents.length]);
  }
  return out;
}

const EmployeeList = () => {
  // TODO : document.title dans un useEffect pour s'assurer du rendu du composant et donc affichage après rendu?
  document.title =   document.title = "HRnet | Employee List";
  
  const navigate = useNavigate();
  const {state, dispatch} = useContext(EmployeesDataContext);

  const { 
    employeesData,
  } = state;


  const [resetSettings, setResetSettings] = useState(false);

  const originalEmployeesData = useMemo(() => generateMockedData(51), []);


  const onResetSettings = useCallback(() => {
    setResetSettings(currentState => !currentState)
  }, [setResetSettings]);

  const setEmployeesData = useCallback((payload) => { dispatch({ type: "SET_EMPLOYEES_DATA", payload }) }, [dispatch]);
  
  const addEmployeeLink = () => {
    navigate('/employee-create');
  }

  useEffect(() => {
    setEmployeesData(originalEmployeesData)
  }, [setEmployeesData, originalEmployeesData])



  const onResetData = useCallback(() => {
    setEmployeesData(originalEmployeesData)
  },[setEmployeesData, originalEmployeesData]);




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
            IconLeft={()=><CircleArrowLeft color1={'#1494B9'} color2={'#0E3C55'} rayon={70}/>}
            IconRight={()=><CircleArrowRight color1={'#1494B9'} color2={'#0E3C55'} rayon={70} />}
          />

          <SpheresButton 
            type="submit" 
            className="spheres-button_button" 
            onClick={addEmployeeLink} text="Add Employee" 
          />

      </main>
    </>
  );
};

export default EmployeeList;