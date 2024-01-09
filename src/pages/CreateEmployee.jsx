import Header from "../molecules/Header";
import CreateEmployeeForm from "../organisms/CreateEmployeeForm";


const CreateEmployee = () => {

  return (
    <>
      <Header navigateButton='/employee-list' textButton='Employee List' />
      <CreateEmployeeForm />
    </>
  );
};

export default CreateEmployee;