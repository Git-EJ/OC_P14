import FourSpheresLines from "../molecules/FourSpheresLines";
import Header from "../molecules/Header";


const Home = () => {
  document.title = "HRnet | Home";
  return (
    <>
      <Header 
        navigateButton_1='/create-employee' 
        textButton_1='Create Employee'
        navigateButton_2='/employee-list'
        textButton_2='Employee List' 
      />
      
      <main className="main_wrapper">

        <div className="home-main_container">

          <FourSpheresLines />

          <div className="home-main_logo_container">
            <img className="home-main_logo_img" src="/src/assets/logos/logo-circle-bg_hr-net.png" alt="Logo HR net" />
          </div>

        </div>
      </main>
    </>
  );
};

export default Home;