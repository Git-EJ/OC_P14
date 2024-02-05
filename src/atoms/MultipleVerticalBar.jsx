import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const MultipleVerticalBar = ({ maxBars, className}) => {
  const [nbreOfBars, setNbreOfBars] = useState(0);

  useEffect(() => {
    const updateNumberOfBars = () => {
      
      const container= document.querySelector('.header_vertical_bar_container');
      
      if(container) {
        const barWidth = 12;
        const containerWidth = container.offsetWidth;
        const nbreOfBars = Math.floor((containerWidth ) / barWidth);
        const newNbreOfBars = Math.min(nbreOfBars, maxBars);
        setNbreOfBars(newNbreOfBars);
      } else {
        return;
      }
    };

    updateNumberOfBars();
    
    window.addEventListener('resize', updateNumberOfBars);
    return () => {
      window.removeEventListener('resize', updateNumberOfBars);
    };
  }, [maxBars]);

  let verticalBars = [];
  for (let i = 0; i < nbreOfBars; i++) {
    verticalBars.push(<div className={className} key={`${className}_${i}`}>|</div>);
  }

  return <div className="header_vertical_bar_container">{verticalBars}</div>;
};

MultipleVerticalBar.propTypes = {
  className: PropTypes.string.isRequired,
  maxBars: PropTypes.number.isRequired,
};

export default MultipleVerticalBar;
