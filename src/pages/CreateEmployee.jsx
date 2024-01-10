import Header from "../molecules/Header";
import CreateEmployeeForm from "../organisms/CreateEmployeeForm";


const CreateEmployee = () => {

  return (
    <>
      <Header navigateButton_1='/employee-list' textButton_1='Employee List' />
      <CreateEmployeeForm />
    </>
  );
};

export default CreateEmployee;