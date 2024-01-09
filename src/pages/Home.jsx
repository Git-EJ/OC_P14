import Header from "../molecules/Header";
import SphereLine from "../atoms/SphereLine";

const Home = () => {





  return (

    <>
      <Header navigateButton='/create-employee' textButton='Create Employee' />
      <main className="main_wrapper">
        <div className="home-main_container">
          <SphereLine rotation="north" />
          <div className="home-main_middle-line_container">
            <SphereLine />
            <div className="home-main_logo_container">
              <img className="home-main_logo_img" src="/src/assets/logos/logo-circle-bg_hr-net.png" alt="Logo HR net" />
            </div>
            <SphereLine rotation="east" />
          </div>
          <SphereLine rotation="south" />
        </div>
      </main>

    </>
  );
};

export default Home;