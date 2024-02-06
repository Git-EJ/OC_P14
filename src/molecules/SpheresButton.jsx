import PropTypes from "prop-types";
import SphereLine from "../atoms/SphereLine";
import { useState, useEffect } from "react";


const SpheresButton = ({ type, className, onClick, text }) => {

  const [responsiveRadius, setResponsiveRadius] = useState(80);
  
  useEffect(() => {
    const updateRadius = () => {
      const container = window.innerWidth;
      if (container) {
        const maxRadius = 80
        const radius = Math.min(maxRadius, container / 10);
        setResponsiveRadius(radius)
        // console.log('radius', radius);
      } else {
        return;
      }
    };

    updateRadius();

    window.addEventListener('resize', updateRadius);
    return () => {
      window.removeEventListener('resize', updateRadius);
    };
  }, [])

  // const logoSize = window.innerWidth <  ? 'logosize' : ''

  return (
    // if you want to change the innerRadius, you have to change in spheresbutton.scss
    // the value of .spheres-button_container :nth-child(3) > :nth-child(1) 
    // first value of translate as egal for the innerRadius
    
    // TODO logo responsive
    // const container = window.innerWidth < 768 ? 'logosize' : 'logo size'
    <div className="spheres-button_container">
      <SphereLine innerRadius="4.3rem" radius={responsiveRadius} angle={180} numberOfSpheres={4} gap="1px" />
      <button type={type} className={className} onClick={onClick} >{text}</button>
      <SphereLine innerRadius="4.3rem" radius={responsiveRadius} numberOfSpheres={4} gap="1px"/>
    </div>
  )
};

export default SpheresButton;

SpheresButton.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
};