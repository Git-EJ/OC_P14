import HeaderVerticalBar from "../atoms/HeaderVerticalBar";

const Home = () => {
  return (
    <div>
      <div className="header_container">
        <div className="logo_container">
          <img className="logo_img" src="/src/assets/logos/logo-circle_hr-net.png" alt="Logo HR Net" />
          <h1 className="logo_title">HR net</h1>
        </div>
        < HeaderVerticalBar />
      </div>
    </div>
  );
};

export default Home;