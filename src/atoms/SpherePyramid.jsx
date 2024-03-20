import PropTypes from "prop-types";

// [1, 2, 3, 4, 3, 2, 1] => diamond shape
// [7, 5, 3, 1] => arrow shape


/**
 * 
 * @description SpherePyramid component  that takes an array of numbers and renders a shape with spheres.
 * @param {arrayOfPattern} arrayOfPattern - Array of numbers that defines the shape of the pyramid.
 * @returns {JSX} - Returns the JSX of the SpherePyramid component.
 */
const SpherePyramid = ({arrayOfPattern = []}) => {

  return (
    <>
      {arrayOfPattern.map((level, index) => {

        return (

          <div className={`sphere-pyramid_level-container`} key={`pyramidLevel_${index}`}>
           
            {Array.from({ length: level }, (_, index) => 
              <div className="sphere-pyramid_item" key={`sphere_${level}_${index}`}></div>
            )}

          </div>
        );
      })}
    </>
  );
};

export default SpherePyramid;

SpherePyramid.propTypes = {
  arrayOfPattern: PropTypes.arrayOf(PropTypes.number),
};

