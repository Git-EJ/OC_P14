import PropTypes from "prop-types";
import SphereLine from "../atoms/SphereLine";
import useResponsiveRadius from "../atoms/style/useResponsiveRadius";
import { useLayoutEffect, useState } from "react";
import theme from "../theme";

/**
 * 
 * @param {string} type - type of the button
 * @param {string} className - class of the button
 * @param {function} onClick - function to call when the button is clicked
 * @param {string} text - text to display on the button
 * @param {object} container - container of the button
 * @param {number} maxRadius - max radius of spheres
 * @returns {JSX.Element} - Spheres + Button 
 */
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


  /**
   * @description Update the button properties on window resize (2 sizes for the button)
  */
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

  /**
  * @description Calculate the radius of the spheres
  * @param {object} container - container of the button
  * @param {number} maxRadius - max radius of spheres
  * @returns {number} - radius of the spheres
  */
  const responsiveRadius = useResponsiveRadius({container, maxRadius}) ;
  

  return (
    
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