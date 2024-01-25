import { useRef, useState, useEffect } from "react";
import Header from "../molecules/Header";
import SphereLineWheel from "../molecules/SphereLineWheel";


const Home = () => {
  document.title = "HRnet | Home";


  const [isClickLogo, setIsClickLogo] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);

  // with useRef we can store a value that will not change between renders, 
  // and it will not cause a re-render when it changes.
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);
  const animationSpeedRef = useRef(animationSpeed);

  //TODO end of decrease not smooth
  const handleClickLogo = () => {

    setIsClickLogo(!isClickLogo);
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);
    
    timeoutRef.current = setTimeout(() => {
      const interval = 100; // time between each decrease step in ms for setInterval
      const totalDuration = 3000; // time in ms to decrease from animationSpeed to 1
      const steps = Math.round(totalDuration / interval); //calculate the number of steps needed
      const speedDecreasePerStep = Math.round((animationSpeedRef.current - 1) / steps); //difference between animationSpeed and initialSpeed=1 divided by the number of steps
      let currentSpeed = animationSpeedRef.current;
      // let intervalCount = 0;
      
      intervalRef.current = setInterval(() => {
        
        currentSpeed -= speedDecreasePerStep;
        const newSpeed = Math.max(currentSpeed, 1);
        setAnimationSpeed(newSpeed);
        
        if (currentSpeed <= 1) {
          clearInterval(intervalRef.current);
          setIsClickLogo(false);
        }
        
        // intervalCount++;
        // console.log('intervalCount', intervalCount);
        // console.log('steps', steps)
        // console.log('speedDecreasePerStep', speedDecreasePerStep)
        // console.log('currentSpeed', currentSpeed)
        // console.log('newSpeed', newSpeed)
        // console.log('animationSpeedREF', animationSpeedRef.current)

      }, interval);
    }, 3000);
  };
  
    
  useEffect(() => {
    animationSpeedRef.current = animationSpeed;
  }, [animationSpeed]);
  
  useEffect(() => {
    if (isClickLogo) {
      setAnimationSpeed(120);
    }
  }, [isClickLogo]);
  
  useEffect(() => {
    // cancel timeout and interval if the component is unmounted or before useEffect runs again, 
    // operations do not continue to run on a component that not exists.
    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);



  
  // const [isClickLogo, setIsClickLogo] = useState(false);

  // // with useRef we can store a value that will not change between renders, 
  // // and it will not cause a re-render when it changes.
  // const timeoutRef = useRef(null);

  // const handleClickLogo = () => {

  //   setIsClickLogo(!isClickLogo);
  //   clearTimeout(timeoutRef.current);
    
  //   timeoutRef.current = setTimeout(() => {
  //     setIsClickLogo(false);
  //   }, 3000);
  // };

  // useEffect(() => {
  //   // cancel timeout if the component is unmounted or before useEffect runs again, 
  //   // operations do not continue to run on a component that not exists.
  //   return () => {
  //     clearTimeout(timeoutRef.current);
  //   };
  // }, []);
  




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

        <SphereLineWheel 
          numberOfSphereLine={12}
          animationSpeed={animationSpeed}
          // addClass={isClickLogo ? 'sphere-line-wheel_logo_clicked' : ''} 
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