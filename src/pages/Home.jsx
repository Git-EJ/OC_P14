import { lazy, useLayoutEffect, useRef, useState } from "react";
import Header from "../molecules/Header";
import LogoWheel from '/assets/logos/logo-circle-bg_hr-net_240x240.webp';
const SphereLineWheel = lazy(() => import('../molecules/SphereLineWheel'));



/**
 * @description Home page component
 * @module pages/Home
 * @see module:molecules/Header
 * @see module:molecules/SphereLineWheel
 * @see module:assets/logos/logo-circle-bg_hr-net_240x240.webp
 * @return {JSX.Element} - Rendered Component
*/
const Home = () => {
  document.title = process.env.NODE_ENV === "development" ? "HRnet | Home DEV" : "HRnet | Home ";
  
  const [animationSpeed, setAnimationSpeed] = useState(0.02);
  const [logoSize, setLogoSize] = useState({ width: '100%', height: '100%' });
  const [innerRadius, setInnerRadius] = useState('120px'); // wheel logo height or width / 2 => find it in variable.scss
  
  const myRef = useRef(null)


  /**
   * @description Handle click on the logo to increase the animation speed
   * @function handleClickLogo
   * @returns {void} - No return
  */
  const handleClickLogo = () => {
    setAnimationSpeed(c=>c*3);
    setTimeout(() => {
      setAnimationSpeed(0.02);
    }, 3000);
  };

  /**
   * @description Update the logo size and inner radius on window resize
   * @function useLayoutEffect
   * @returns {void} - No return
  */
  useLayoutEffect(() => {
    const updateLogoSize = () => {
      const laptotScreen = window.innerHeight < 800;
      const largeScreen = window.innerWidth > 600;
      const logoSize = largeScreen && !laptotScreen ? { width: '100%', height: '100%' } : { width: '70%', height: '70%' };
      const innerRadius = largeScreen && !laptotScreen ? '120px' : '84px';
      setInnerRadius(innerRadius);
      setLogoSize(logoSize);
    }
    updateLogoSize();

    window.addEventListener('resize', updateLogoSize);
    return () => {
      window.removeEventListener('resize', updateLogoSize);
    }
  }, []);


  const myRefMouseMoove = useRef(null);

  /**
   * @description Handle the mouse move event to rotate the wheel logo
   * @function handleMouseMove
   * @param {Event} e - Mouse move event
   * @returns {void} - No return
   * @see module:assets/logos/logo-circle-bg_hr-net_240x240.webp
  */
  const handleMouseMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const xAxis = (w / 2 - x) / 2;
    const yAxis = (h / 2 - y) / 2;

    // Calculate the angle from the center
    const angleDeg = Math.atan2(y - h / 2, x - w / 2) * 180 / Math.PI;
    // Use the angle to determine the direction of rotation on the Z axis
    const zAxis = angleDeg * 2;

    if(myRefMouseMoove.current){
      myRefMouseMoove.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) rotateZ(${zAxis}deg)`;
    }
  };

  
  const timeoutRef = useRef(null);

  /**
   * @description Reset the wheel logo rotation to 0 after timeout param
   * @function handleResetMouseMoove
   * @returns {void} - No return
   */
  const handleResetMouseMoove = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if(myRefMouseMoove.current){
        myRefMouseMoove.current.style.transform = `rotateY(0deg) rotateX(0deg) rotateZ(0deg)`;
      }
    }, 1000);
  };

  return (
    <>
    <header className="header_wrapper">
      <Header 
        navigateButton_1='/create-employee' 
        textButton_1='Create Employee'
        navigateButton_2='/employee-list'
        textButton_2='Employee List' 
      />
    </header>
      
      <main className="main_wrapper">

        <div ref={myRef} className="home-main_container relative">

          <SphereLineWheel 
            numberOfSphereLine={12}
            animationSpeed={animationSpeed}
            innerRadius={innerRadius} // wheel logo height or width / 2
            container={myRef.current}
            maxRadius={80}
          />     

          <div className="home-main_logo_container" ref={myRefMouseMoove}>
            
            <img className="home-main_logo_img"
              src= {LogoWheel}
              alt="Logo HR net"
              onClick={handleClickLogo}
              style={logoSize}
              onMouseMove={(e) => {handleMouseMove(e)}}
              onMouseLeave={() => {handleResetMouseMoove()}}
            />
          </div>

        </div>
      </main>
    </>
  );
};

export default Home;