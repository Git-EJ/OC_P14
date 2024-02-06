import PropTypes from "prop-types";
import { useLayoutEffect, useState } from "react";

const useResponsiveRadius = ({container,  maxRadius }) => {
  const [responsiveRadius, setResponsiveRadius] = useState(maxRadius);
  
  
  useLayoutEffect(() => {
    if (!container || maxRadius === undefined) return;
    const updateRadius = () => {
      const containerWidth = container.innerWidth;
      const radius = Math.min(maxRadius, containerWidth / 10);
      setResponsiveRadius(radius);
    };
    
    updateRadius();
    
    window.addEventListener('resize', updateRadius);
    return () => {
      window.removeEventListener('resize', updateRadius);
    };
  }, [container, maxRadius]);
  
  // if (typeof responsiveRadius !== 'number' || isNaN(responsiveRadius)) {
  //   console.log('HOOK RETURN 1')
  //   return;
  // } else {
  //   console.log('HOOK RETURN 2', responsiveRadius)
    return responsiveRadius;
  // }
}

export default useResponsiveRadius;

useResponsiveRadius.propTypes = {
  container: PropTypes.object.isRequired,
  maxRadius: PropTypes.number.isRequired,
};

