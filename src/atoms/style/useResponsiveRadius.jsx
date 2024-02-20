import PropTypes from "prop-types";
import { useLayoutEffect, useState } from "react";

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

