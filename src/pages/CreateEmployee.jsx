import Header from "../molecules/Header";
import CreateEmployeeForm from "../molecules/CreateEmployeeForm";


const CreateEmployee = () => {
  document.title = "HRnet | CreateEmployee";

  return (
    <>
      <Header navigateButton_1='/employee-list' textButton_1='Employee List' />
      <CreateEmployeeForm />
    </>
  );
};

export default CreateEmployee;