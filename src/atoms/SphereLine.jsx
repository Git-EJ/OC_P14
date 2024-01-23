import PropTypes from 'prop-types';


const SphereLine = ({ rotation, width, height, sphereMargin, numberOfSpheres }) => {

  const renderSpheres = (currentWidth, currentHeight, spheresLeft) => {
    if (spheresLeft === 0) {
      return null;
    }

    const sphereDim = {
      width: `${currentWidth}px`,
      height: `${currentHeight}px`,
      margin: `${sphereMargin}px`,
    };

    
    return (
      <>
        <div className="sphere" style={sphereDim}></div>
        {/* (currentWidth * 0.8 = 80% of currentWidth) === (currentWidth - 20% of currentWidth) */}
        {renderSpheres(currentWidth * 0.8, currentHeight * 0.8, spheresLeft - 1)}
      </>
    );
  };


  const calculateTotalHeight = (currentHeight, spheresLeft) => {
    if (spheresLeft === 0) {
      return 0;
    }
    return currentHeight + (sphereMargin * 2) + calculateTotalHeight(currentHeight * 0.8, spheresLeft - 1);
  }
  
  const heightForSpheresContainer = calculateTotalHeight(height, numberOfSpheres);


  return (
    <div className="spheres_container" 
      style={{ 
        width: "fit-content",
        height: `${heightForSpheresContainer}px`,
        transform: `rotateZ(${rotation}deg)` 
      }}
    >
    {renderSpheres(width, height, numberOfSpheres)}
    </div>
  );
};

export default SphereLine;

SphereLine.propTypes = {
  rotation: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  sphereMargin: PropTypes.number,
  numberOfSpheres: PropTypes.number.isRequired,
};