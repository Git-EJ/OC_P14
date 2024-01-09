import Header from "../molecules/Header";
import CurrentEmployees from "../organisms/CurrentEmployees";




const EmployeeList = () => {
  
  return (
    <>
      <Header navigateButton='/employee-create' textButton='Create Employee' />
      <CurrentEmployees />
    </>
  );
};

export default EmployeeList;