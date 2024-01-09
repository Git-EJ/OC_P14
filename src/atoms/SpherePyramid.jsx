const SpherePyramid = () => {
  // const arrayOfPyramidLevels = [1, 2, 3, 4, 3, 2, 1]; //diamond shape
  const arrayOfPyramidLevels = [7, 5, 3, 1]; //arrow shape

  return (
    <>
      {arrayOfPyramidLevels.map((level, index) => {

        return (

          <div className={`sphere-pyramid_level-container`} key={`pyramidLevel_${index}`}>
           
            {Array.from({ length: level }, (_, index) => {
              return (
                <div className="sphere-pyramid_item" key={`sphere_${index}`}></div>
              );
            })}

          </div>
        );
      })}
    </>
  );
};

export default SpherePyramid;
