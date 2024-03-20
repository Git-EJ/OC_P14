import PropTypes from "prop-types";
import SphereLine from "../atoms/SphereLine";
import { useEffect, useCallback, useState } from "react";
import useResponsiveRadius from "../atoms/style/useResponsiveRadius";


/**
 * 
 * @description Render SphereLines for the wheel
 * @param {string} innerRadius - inner radius of the sphere
 * @param {number} angle - angle of the sphere line
 * @param {object} container - container of the sphere line
 * @param {number} maxRadius - max radius of the sphere
 * @returns {JSX.Element} - Call SphereLine component
 */
const RenderSpheresLines = ({innerRadius, angle, container, maxRadius}) => {

  const responsiveRadius = useResponsiveRadius({container, maxRadius}) ;

  return (
    <SphereLine radius={responsiveRadius} gap={"1px"} innerRadius={innerRadius} numberOfSpheres={4} angle={angle}/>
  );
};

RenderSpheresLines.propTypes = {
  innerRadius: PropTypes.string.isRequired,
  angle: PropTypes.number.isRequired,
  container: PropTypes.object,
  maxRadius: PropTypes.number,
};


/**
* 
* @description Wheel of SphereLines and algo for the acceleration and deceleration of wheel rotation when the wheel logo is clicked
* @param {string} innerRadius - inner radius of the sphere
* @param {number} startAngle - start angle of the sphere line
* @param {number} numberOfSphereLine - number of sphere lines
* @param {number} animationSpeed - speed of the wheel rotation
* @param {object} container - container of the sphere line
* @param {number} maxRadius - max radius of the sphere
* @returns {JSX.Element} - Call RenderSpheresLines component and wheel html wrapper
*/
const SphereLineWheel = ({innerRadius="0px", startAngle=0, numberOfSphereLine, animationSpeed, container, maxRadius}) => {
  
  const array = new Array(numberOfSphereLine).fill(0)
  const delta = 360 / numberOfSphereLine;

  const [animation, setAnimation] = useState(null)
  const [current, setCurrent] = useState(
    {
      angle: 0,
      speed: animationSpeed,
      target: animationSpeed,
    }
  );

  const intervalAngle = useCallback(() => {
    setCurrent(c => {
      const dif = (c.target - c.speed)
      if (Math.abs(dif) < 0.01) {
        c.speed = c.target
      } else {
        c.speed = c.speed + (c.target - c.speed) / 100;
      }
      return {...c, angle: c.angle + c.speed}
    })
  }, [])

  useEffect(() => {
    if (animationSpeed !== current.target) {
      setCurrent(c=>({...c, target:animationSpeed}));
    }
  }, [animationSpeed, current])

  useEffect(() => {
    if (!animation) setAnimation (setInterval(intervalAngle, 30))
    return () => {
      if (animation) {
        clearInterval(animation)
        setAnimation(null)
      }
    }
  }, [intervalAngle, animation])
  

  return (
    <div className="sphere-line-wheel_spheres-lines_wrapper"
      style={{
        transform: `rotate(${current.angle}deg)`,
        animationDuration: `${12 / animationSpeed}s`
      }}
    >
      {array.map((_, i) =>
        <RenderSpheresLines 
          key={`sphere-line-${i}`} 
          innerRadius={innerRadius} 
          angle={startAngle + i * delta}
          container={container}
          maxRadius={maxRadius}
        />
      )}
    </div>
  )
};

export default SphereLineWheel;

SphereLineWheel.propTypes = {
  innerRadius: PropTypes.string,
  startAngle: PropTypes.number,
  numberOfSphereLine: PropTypes.number.isRequired,
  animationSpeed: PropTypes.number,
  container: PropTypes.object,
  maxRadius: PropTypes.number,
};
