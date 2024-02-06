import PropTypes from 'prop-types';

const Sphere = ({currentRadius}) => <div className="sphere" style={{
  width: `${currentRadius}px`,
  height: `${currentRadius}px`,
}}/>

Sphere.propTypes = {
  currentRadius: PropTypes.number.isRequired,
};



const SphereLine = ({ innerRadius="0px", angle=0, radius, ratio=0.6, gap="1px", numberOfSpheres }) => {

  const renderSpheres = (currentRadius, spheresLeft) => {
    
    currentRadius = Math.max(currentRadius, 0);

    return (
      <>
        <Sphere currentRadius={currentRadius}/>
        {spheresLeft>1 && renderSpheres(currentRadius * ratio, spheresLeft - 1)}
      </>
    );
  };

  return (
    <div
      style={{
        position: "absolute",
        transform: `rotate(${angle}deg)`,
      }}
    >
      <div className="spheres_container" style={{
        transform: `translate(${innerRadius}, -50%)`,
        gap:gap,
        position: "absolute",
      }}>
        {renderSpheres(radius, numberOfSpheres)}
      </div>
    </div>
  );
};

export default SphereLine;

SphereLine.propTypes = {
  innerRadius: PropTypes.string,
  angle: PropTypes.number,
  radius: PropTypes.number,
  ratio: PropTypes.number,
  gap: PropTypes.string,
  numberOfSpheres: PropTypes.number.isRequired,
};