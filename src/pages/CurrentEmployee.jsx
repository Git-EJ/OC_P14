import Header from "../molecules/Header";
import DataTable from "../molecules/DataTable";
import SpheresButton from "../molecules/SpheresButton";
import { useNavigate } from "react-router-dom";


const arrayOfEmployeesDataTitle = [
  //for editing the data create date read only or not
  {
    key: "firstName",
    value: "FirstName",
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
];

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
    street: "02 rue du resto",
    city: "JavaScriptCity",
    state: "JS",
    zipCode: "00001",
  },
];


const createEmployeeMockedData = (arrayOfEmployeesDataContents, nbreOfEmployee) => {
  let arrayOfEmployeesDataContentsCopy = [...arrayOfEmployeesDataContents];
  for (let i = 0; i < nbreOfEmployee; i++) {
    arrayOfEmployeesDataContentsCopy.push(arrayOfEmployeesDataContentsCopy[i]);
  }
  return arrayOfEmployeesDataContentsCopy;
}


const EmployeeList = () => {
  document.title =   document.title = "HRnet | Employee List";
  
  const navigate = useNavigate();
  
  const addEmployeeLink = () => {
    navigate('/employee-create');
  }

  return (
    <>
      <Header navigateButton_1='/employee-create' textButton_1='Create Employee' />
      <main className="main_wrapper">
        <h2 className="current-employee_page-title">Employee List</h2>

          <DataTable 
            headers={arrayOfEmployeesDataTitle} 
            data={createEmployeeMockedData(arrayOfEmployeesDataContents, 11)} 
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