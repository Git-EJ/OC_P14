import { lazy, useEffect, useLayoutEffect, useRef, useState } from "react";
import Header from "../molecules/Header";
import LogoWheel from '/assets/logos/logo-circle-bg_hr-net_240x240.webp';
const SphereLineWheel = lazy(() => import('../molecules/SphereLineWheel'));

const Home = () => {
  document.title = process.env.NODE_ENV === "development" ? "HRnet | Home DEV" : "HRnet | Home ";
  

  //TODO in index or component??
  // useEffect(() => {
  //   const link = document.createElement('link');
  //   link.rel = 'preload';
  //   link.fetchpriority = 'high';
  //   link.as = 'image';
  //   link.href = LogoWheel;
  //   link.type = 'image/webp';

  //   document.head.appendChild(link);

  //   return () => document.head.removeChild(link);
  // }, []);





  const [animationSpeed, setAnimationSpeed] = useState(0.02);
  const [logoSize, setLogoSize] = useState({ width: '100%', height: '100%' });
  const [innerRadius, setInnerRadius] = useState('120px'); // wheel logo height or width / 2 => find it in variable.scss
  
  const myRef = useRef(null)

  const handleClickLogo = () => {
    setAnimationSpeed(c=>c*3);
    setTimeout(() => {
      setAnimationSpeed(0.02);
    }, 3000);
  };

  useLayoutEffect(() => {
    const updateLogoSize = () => {
      const largeScreen = window.innerWidth > 600;
      const logoSize = largeScreen ? { width: '100%', height: '100%' } : { width: '70%', height: '70%' };
      const innerRadius = largeScreen ? '120px' : '84px';
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

        <div ref={myRef} className="home-main_container relative" >

          {/* TODO HEIGHT OF WHEEL ON LAPTOP */}
          <SphereLineWheel 
            numberOfSphereLine={12}
            animationSpeed={animationSpeed}
            innerRadius={innerRadius} // wheel logo height or width / 2
            container={myRef.current}
            maxRadius={80}
          />     

          <div className="home-main_logo_container">
            <img className="home-main_logo_img"
              src= {LogoWheel}
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