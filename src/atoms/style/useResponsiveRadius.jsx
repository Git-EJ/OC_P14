import PropTypes from "prop-types";
import { useLayoutEffect, useState } from "react";


/**
* @description useResponsiveRadius hook that calculates the radius of a sphere based on the container width.
* @param {object} container - The container to calculate the radius from.
* @param {number} maxRadius - The maximum radius of the sphere.
* @returns {number} - Returns the radius of the sphere based on the container width.
*/

const useResponsiveRadius = ({container,  maxRadius }) => {
  const [responsiveRadius, setResponsiveRadius] = useState(maxRadius);
  
  useLayoutEffect(() => {
    if (!container || maxRadius === undefined) return;

    const updateRadius = () => {
      const laptopScreen = window.innerHeight < 800;
      const containerWidth = container === window ? container.innerWidth : container.offsetWidth;
      
      const getDivider = (width) => {
        if (!laptopScreen) return 10;
        if (width < 500) return 11;
        if (width < 600) return 13;
        if (width < 700) return 15;
        if (width < 800) return 17;
        if (width < 900) return 18;
        if (width < 1000) return 20;
        if (width < 1100) return 22;
        return 24;
      };
    
      const divider = getDivider(containerWidth);
      const radius = Math.min(maxRadius, containerWidth / divider);
      setResponsiveRadius(radius);
    };


    
    updateRadius();
    
    window.addEventListener('resize', updateRadius);
    return () => {
      window.removeEventListener('resize', updateRadius);
    };

  }, [container, maxRadius]);
  
  return responsiveRadius;
}

export default useResponsiveRadius;

useResponsiveRadius.propTypes = {
  container: PropTypes.object.isRequired,
  maxRadius: PropTypes.number.isRequired,
};

