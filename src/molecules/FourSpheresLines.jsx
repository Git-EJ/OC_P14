import SphereLine from "../atoms/SphereLine";

const FourSpheresLines = () => {

  const arrayOfClassNames = [
    "regular-lines_container", 
    "diagonal-lines_first-container", 
    "diagonal-lines_second-container", 
  ];

  return (
    <div className="home-main_all_spheres-lines_container">
      {arrayOfClassNames.map((className, index) => (
        <div className={`home-main_${className}`} key={`${className}_${index}`}>
          <div className="home-main_vertical-lines_container">
            <SphereLine rotation="north" />
            <SphereLine rotation="south" />
          </div>

          <div className="home-main_horizontal-lines_container">
            <SphereLine /> {/* default = rotation: west */}
            <SphereLine rotation="east" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FourSpheresLines;