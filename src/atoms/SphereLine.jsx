import PropTypes from 'prop-types';

const SphereLine = ({ rotation }) => {
  return (
    <div className=  {rotation ? `spheres_container spheres_container_${rotation}` : "spheres_container"}>
      <div className="sphere_outside-circle"></div>
      <div className="sphere_middleOut-circle"></div>
      <div className="sphere_middleIn-circle"></div>
      <div className="sphere_inside-circle"></div>
    </div>
  );
}

export default SphereLine;

SphereLine.propTypes = {
  rotation: PropTypes.string,
};
