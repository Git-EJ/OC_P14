import PropTypes from "prop-types";
import SphereLine from "../atoms/SphereLine";
import { useEffect, useCallback, useState } from "react";


const RenderSpheresLines = ({innerRadius, angle}) => {

  const [responsiveRadius, setResponsiveRadius] = useState(80);
  const container = document.querySelector('.home-main_container')
  
  useEffect(() => {
    const updateRadius = () => {
      if (container) {
        const maxRadius = 80
        const containerWidth = container.offsetWidth
        const radius = Math.min(maxRadius, containerWidth / 10);
        setResponsiveRadius(radius)
        console.log('radius', radius);
      } else {
        return;
      }
    };

    updateRadius();

    window.addEventListener('resize', updateRadius);
    return () => {
      window.removeEventListener('resize', updateRadius);
    };
  }, [container])

  return (
    <SphereLine radius={responsiveRadius} gap={"1px"} innerRadius={innerRadius} numberOfSpheres={4} angle={angle}/>
  );
}

RenderSpheresLines.propTypes = {
  innerRadius: PropTypes.string.isRequired,
  angle: PropTypes.number.isRequired,
};



const SphereLineWheel = ({innerRadius="0px", startAngle=0, numberOfSphereLine, animationSpeed}) => {
  
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
  }, [setCurrent])

  useEffect(() => {
    if (animationSpeed !== current.target) {
      setCurrent(c=>({...c, target:animationSpeed}));
    }
  }, [animationSpeed, setCurrent, current])

  useEffect(() => {
    if (!animation) setAnimation (setInterval(intervalAngle, 30))
    return () => {
      if (animation) {
        clearInterval(animation)
        setAnimation(null)
      }
    }
  }, [setAnimation, intervalAngle, animation])
  

  return (
    <div className="sphere-line-wheel_spheres-lines_wrapper"
      style={{
        transform: `rotate(${current.angle}deg)`,
        animationDuration: `${12 / animationSpeed}s`
      }}
    >
      {array.map((_, i) =>
        <RenderSpheresLines key={`sphere-line-${i}`} innerRadius={innerRadius} angle={startAngle + i * delta} />
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
};
