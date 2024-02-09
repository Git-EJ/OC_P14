import PropTypes from "prop-types";
import SphereLine from "../atoms/SphereLine";
import useResponsiveRadius from "../atoms/style/useResponsiveRadius";
import { useLayoutEffect, useState } from "react";
import theme from "../theme";



const SpheresButton = ({ type, className, onClick, text, container, maxRadius }) => {

  const [innerRadius, setInnerRadius] = useState('68px'); // wheel logo height or width / 2 => find it in variable.scss
  const [button, setButton] = useState({
    size:{
      width: '136px',
      height: '136px'
    },
    fontSize: '1.3rem',
    border: '10px',
  });



  useLayoutEffect(() => {
    const updateButtonSize = () => {
      const largeScreen = window.innerWidth > 600;
      const size = largeScreen ? { width: '135px', height: '135px' } : { width: '100px', height: '100px' };
      const fontSize = largeScreen ? '1.3rem' : '1rem';
      const border = largeScreen ? '6px': '4px';
      const innerRadius = largeScreen ? '69px' : '51px';
      setButton({size, fontSize, border});
      setInnerRadius(innerRadius);

    }
    updateButtonSize();

    window.addEventListener('resize', updateButtonSize);
    return () => {
      window.removeEventListener('resize', updateButtonSize);
    }
  }, []);

  
  const responsiveRadius = useResponsiveRadius({container, maxRadius}) ;
  

  return (
    // if you want to change the innerRadius, you have to change in spheresbutton.scss
    // the value of .spheres-button_container :nth-child(3) > :nth-child(1) 
    // first value of translate as egal for the innerRadius
    
    <div className="spheres-button_container">
      <SphereLine innerRadius={innerRadius} radius={responsiveRadius} angle={180} numberOfSpheres={4} gap="1px" />
      
      <button 
        type={type} 
        className={className} 
        onClick={onClick} 
        style={{fontSize: button.fontSize, ...button.size, border: `${button.border} solid ${theme.palette.main['primary-color']}`}}
      >
        {text}
      </button>

      <SphereLine innerRadius={innerRadius} radius={responsiveRadius} numberOfSpheres={4} gap="1px"/>
    </div>
  )
};

export default SpheresButton;

SpheresButton.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  container: PropTypes.object,
  maxRadius: PropTypes.number,
};