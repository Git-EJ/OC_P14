import Header from "../molecules/Header";
import SphereLine from "../atoms/SphereLine";

const Home = () => {

  return (
    <>
      <Header navigateButton='/create-employee' textButton='Create Employee' />
      <main className="main_wrapper">

        <div className="home-main_container">

          {/* horizontal and vertical lines */}
          <div className="home-main_spheres-lines_container">
            
            <div className="home-main_vertical-lines_container">
              <SphereLine rotation="north" />
              <SphereLine rotation="south" />
            </div>

            <div className="home-main_horizontal-lines_container">
              <SphereLine />
              <SphereLine rotation="east" />
            </div>
          
            {/* first diagonal */}
            <div className="home-main_diagonal-lines_first-container">
              <div className="home-main_vertical-lines_container">
                <SphereLine rotation="north" />
                <SphereLine rotation="south" />
              </div>

              <div className="home-main_horizontal-lines_container">
                <SphereLine />
                <SphereLine rotation="east" />
              </div>
            </div>

            {/* second diagonal */}
            <div className="home-main_diagonal-lines_second-container">
              <div className="home-main_vertical-lines_container">
                <SphereLine rotation="north" />
                <SphereLine rotation="south" />
              </div>

              <div className="home-main_horizontal-lines_container">
                <SphereLine />
                <SphereLine rotation="east" />
              </div>
            </div>

          </div>

          <div className="home-main_logo_container">
            <img className="home-main_logo_img" src="/src/assets/logos/logo-circle-bg_hr-net.png" alt="Logo HR net" />
          </div>

        </div>
      </main>
    </>
  );
};

export default Home;