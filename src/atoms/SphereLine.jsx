import PropTypes from 'prop-types';

const Sphere = ({radius}) => <div className="sphere" style={{
  width: radius,
  height: radius,
}}/>
Sphere.propTypes = {
  radius: PropTypes.number.isRequired,
};

const SphereLine = ({ innerRadius="0px", angle=0, radius, ratio=0.8, gap="1px", numberOfSpheres }) => {

  const renderSpheres = (radius, spheresLeft) => {
    return (
      <>
        <Sphere radius={radius}/>
        {spheresLeft>1 && renderSpheres(radius * ratio, spheresLeft - 1)}
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
  radius: PropTypes.number.isRequired,
  ratio: PropTypes.number,
  gap: PropTypes.string,
  numberOfSpheres: PropTypes.number.isRequired,
};