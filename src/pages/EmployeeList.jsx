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
    firstName: "ATOTO",
    lastName: "ATUTUTITI",
    startDate: "01/10/2024",
    department: "AHuman Ressources",
    dateOfBirth: "02/02/2024",
    street: "20 rue de TOTOVILLE",
    city: "ATOTOVILLE",
    state: "ATV",
    zipCode: "01000",
  },
  {
    firstName: "BTOTO",
    lastName: "BTUTUTITI",
    startDate: "01/01/2024",
    department: "BHuman Ressources",
    dateOfBirth: "10/02/2024",
    street: "2 rue de TOTOVILLE",
    city: "BTOTOVILLE",
    state: "BTV",
    zipCode: "00100",
  },
  {
    firstName: "CTOTO",
    lastName: "CTUTUTITI",
    startDate: "10/01/2024",
    department: "CHuman Ressources",
    dateOfBirth: "02/01/2024",
    street: "02 rue de TOTOVILLE",
    city: "CTOTOVILLE",
    state: "CTV",
    zipCode: "00010",
  },
  {
    firstName: "DTOTO",
    lastName: "DTUTUTITI",
    startDate: "10/01/2023",
    department: "DHuman Ressources",
    dateOfBirth: "02/01/2023",
    street: "10 rue de TOTOVILLE",
    city: "DTOTOVILLE",
    state: "DTV",
    zipCode: "00001",
  },
];

const EmployeeList = () => {
  document.title = "Employee List";
  
  const navigate = useNavigate();
  
  const addEmployeeLink = () => {
    navigate('/employee-create');
  }

  return (
    <>
      <Header navigateButton_1='/employee-create' textButton_1='Create Employee' />
      <main className="main_wrapper">
        <h2 className="current-employees_page-title">Employee List</h2>
          <DataTable headers={arrayOfEmployeesDataTitle} data={arrayOfEmployeesDataContents} />
          <SpheresButton type="submit" className="spheres-button_button" onClick={addEmployeeLink} text="Add Employee" />
      </main>
    </>
  );
};

export default EmployeeList;