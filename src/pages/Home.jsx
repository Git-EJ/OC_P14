import Header from "../molecules/Header";
import SphereLine from "../atoms/SphereLine";

const Home = () => {

  const FourSpheresLine = () => {

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

  return (
    <>
      <Header navigateButton='/create-employee' textButton='Create Employee' />
      <main className="main_wrapper">

        <div className="home-main_container">

          <FourSpheresLine />

          <div className="home-main_logo_container">
            <img className="home-main_logo_img" src="/src/assets/logos/logo-circle-bg_hr-net.png" alt="Logo HR net" />
          </div>

        </div>
      </main>
    </>
  );
};

export default Home;