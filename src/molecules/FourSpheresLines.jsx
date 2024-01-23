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
            <SphereLine rotation={-90} width={80} height={80} numberOfSpheres={4}/>
            <SphereLine rotation={90} width={80} height={80} numberOfSpheres={4}/>
          </div>

          <div className="home-main_horizontal-lines_container">
            <SphereLine rotation={180} width={80} height={80} numberOfSpheres={4}/>
            <SphereLine rotation={0} width={80} height={80} numberOfSpheres={4}/>
          </div>
        </div>
      ))}
    </div>
  );
};


export default FourSpheresLines;
