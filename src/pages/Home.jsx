import {useLayoutEffect, useState} from "react";
import Header from "../molecules/Header";
import SphereLineWheel from "../molecules/SphereLineWheel";


const Home = () => {
  document.title = "HRnet | Home";
  
  const [animationSpeed, setAnimationSpeed] = useState(0.02);
  const [logoSize, setLogoSize] = useState({ width: '100%', height: '100%' });
  const [innerRadius, setInnerRadius] = useState('120px'); // wheel logo height or width / 2 => find it in variable.scss
  
  const handleClickLogo = () => {
    setAnimationSpeed(c=>c*3);
    setTimeout(() => {
      setAnimationSpeed(0.02);
    }, 3000);
  };

  useLayoutEffect(() => {
    const updateLogoSize = () => {
      const logoSize = window.innerWidth > 600 ? { width: '100%', height: '100%' } : { width: '70%', height: '70%' };
      const innerRadius = window.innerWidth > 600 ? '120px' : '84px';
      setInnerRadius(innerRadius);
      setLogoSize(logoSize);
    }
    updateLogoSize();

    window.addEventListener('resize', updateLogoSize);
    return () => {
      window.removeEventListener('resize', updateLogoSize);
    }
  }, []);
  
  
  return (
    <>
      <Header 
        navigateButton_1='/create-employee' 
        textButton_1='Create Employee'
        navigateButton_2='/employee-list'
        textButton_2='Employee List' 
      />
      
      <main className="main_wrapper">

        <div className="home-main_container relative" >

          <SphereLineWheel 
            numberOfSphereLine={12}
            animationSpeed={animationSpeed}
            innerRadius={innerRadius} // wheel logo height or width / 2
            container={window}
            maxRadius={80}
          />


          <div className="home-main_logo_container">
            <img className="home-main_logo_img"
              src="/src/assets/logos/logo-circle-bg_hr-net.png" 
              alt="Logo HR net" 
              onClick={handleClickLogo}
              style={logoSize}
            />
          </div>

        </div>
      </main>
    </>
  );
};

export default Home;