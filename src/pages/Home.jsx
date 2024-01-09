import Header from "../molecules/Header";
import CreateEmployee from "../organisms/CreateEmployee";


const Home = () => {

  return (
    <>
      <Header navigateButton='/employee-list' textButton='Employee List' />
      <CreateEmployee />
    </>
  );
};

export default Home;