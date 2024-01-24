import PropTypes from "prop-types";
import SphereLine from "../atoms/SphereLine";

const SphereLineWheel = ({startAngle=0, numberOfSphereLine, animationSpeed, addClass}) => {

  const renderSpheresLines = (currentAngle, currentNumberOfSphereLine) => {
    if (currentNumberOfSphereLine === 0) {
      return null;
    }

    return (
      <>
        <div className="sphere-line-wheel_spheres-lines_container" style={{transform: `rotate(${currentAngle}deg)`}}>
          <div className="sphere-line-wheel_spheres-lines_item" >
            <SphereLine rotation={-90} width={80} height={80} sphereMargin={1} numberOfSpheres={4}/>
          </div>
        </div>

        {renderSpheresLines(currentAngle + 30, currentNumberOfSphereLine - 1)}
      </>
    );
  }
  
  return (
    // <div className={`sphere-line-wheel_spheres-lines_wrapper ${addClass ? addClass : ''}`} 
    <div className="sphere-line-wheel_spheres-lines_wrapper"
      style={{animationDuration: `${60 / animationSpeed}s`}} 
    >
      {renderSpheresLines(startAngle, numberOfSphereLine)}
    </div>
  )
};


export default SphereLineWheel;

SphereLineWheel.propTypes = {
  startAngle: PropTypes.number,
  numberOfSphereLine: PropTypes.number.isRequired,
  animationSpeed: PropTypes.number,
  addClass: PropTypes.string,
};
