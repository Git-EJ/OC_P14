import PropTypes from 'prop-types';


/**
 * 
 * @description Sphere component that renders a sphere with a given radius.
 * @param {number} currentRadius - The radius of the sphere.
 * @returns {JSX} - Returns the JSX of the Sphere component with the given radius for height and width in px.
 */
const Sphere = ({currentRadius}) => <div className="sphere" style={{
  width: `${currentRadius}px`,
  height: `${currentRadius}px`,
}}/>

Sphere.propTypes = {
  currentRadius: PropTypes.number.isRequired,
};


/**
 * 
 * @description SphereLine component that renders a line of spheres with a given number of spheres.
 * @param {string} innerRadius - The inner radius of the line of spheres.
 * @param {number} angle - The angle of the line of spheres.
 * @param {number} radius - The radius of the spheres.
 * @param {number} ratio - The ratio of the spheres compared to the previous one
 * @param {string} gap - The gap between the spheres.
 * @param {number} numberOfSpheres - The number of spheres in the line.
 * @returns {JSX} - Returns the JSX of the SphereLine component with the given parameters.
 */
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