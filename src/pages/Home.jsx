import {useState} from "react";
import Header from "../molecules/Header";
import SphereLineWheel from "../molecules/SphereLineWheel";


const Home = () => {
  document.title = "HRnet | Home";

  const [animationSpeed, setAnimationSpeed] = useState(0.02);

  const handleClickLogo = () => {
    setAnimationSpeed(c=>c*2);
    setTimeout(() => {
      setAnimationSpeed(0.02);
    }, 3000);
  };


  return (
    <>
      <Header 
        navigateButton_1='/create-employee' 
        textButton_1='Create Employee'
        navigateButton_2='/employee-list'
        textButton_2='Employee List' 
      />
      
      <main className="main_wrapper">

        <div className="home-main_container relative">

          <SphereLineWheel 
            numberOfSphereLine={12}
            animationSpeed={animationSpeed}
            innerRadius="7.5rem" // wheel logo height or width / 2
          />

          <div className="home-main_logo_container">
            <img className="home-main_logo_img"
              src="/src/assets/logos/logo-circle-bg_hr-net.png" 
              alt="Logo HR net" 
              onClick={handleClickLogo}
            />
          </div>

        </div>
      </main>
    </>
  );
};

export default Home;