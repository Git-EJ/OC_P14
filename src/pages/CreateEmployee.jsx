import Header from "../molecules/Header";
import CreateEmployeeForm from "../molecules/CreateEmployeeForm";
import CreateEmployeeContextProvider from "../context/createEmployee/CreateEmployeeContextProvider";


/**
* @description Create Employee page component
* @module pages/CreateEmployee
* @see module:molecules/Header
* @see module:molecules/CreateEmployeeForm
* @see module:context/createEmployee/CreateEmployeeContextProvider
* @return {JSX.Element} - Rendered Component
* 
*/
const CreateEmployee = () => {
  document.title = process.env.NODE_ENV === "development" ? "HRnet | Create Employee DEV" : "HRnet | Create Employee";

  return (
    <CreateEmployeeContextProvider>
      <Header navigateButton_1='/employee-list' textButton_1='Employee List' />
      <CreateEmployeeForm />
    </CreateEmployeeContextProvider>
  );
};

export default CreateEmployee;