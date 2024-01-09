import { useNavigate } from "react-router-dom";
import MultipleVerticalBar from "../atoms/MultipleVerticalBar";
import SpherePyramid from "../atoms/SpherePyramid";


const Header = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/employee-list');
  }

  return (
    <>
      <header className="header_wrapper">
        <div className="header_contents_container">

          <div className="header_logo_container">
            <img className="header_logo_img" src="/src/assets/logos/logo-circle_hr-net.png" alt="Logo HR Net" />
            <h1 className="header_logo_title">HR net</h1>
          </div>

          <div className="header_vertical_bar_container">
            <MultipleVerticalBar nbreOfBars={70} className={'header_vertical_bar_item'} />
          </div>


          <div className="header_button_container">
            <div className="sphere-pyramid_wrapper">
              <SpherePyramid />
            </div>
              <button className="header_button_nav" onClick={handleClick}>Employee list</button>
            <div className="sphere-pyramid_wrapper">
              <SpherePyramid />
            </div>
          </div>
        </div>

        {/* empty div for the line under the logo and vertical bar */}
        <div className="header_border_bottom"></div> 
        
      </header>
    </>
  );
}

export default Header;