import Header from "../molecules/Header";
import CurrentEmployees from "../organisms/CurrentEmployees";




const EmployeeList = () => {
  
  return (
    <>
      <Header navigateButton_1='/employee-create' textButton_1='Create Employee' />
      <CurrentEmployees />
    </>
  );
};

export default EmployeeList;