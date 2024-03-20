import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MultipleVerticalBar from "../atoms/MultipleVerticalBar";
import SpherePyramid from "../atoms/SpherePyramid";

/**
 * 
 * @param {string} navigateButton_1 - navigation button up
 * @param {string} textButton_1 - text button up
 * @param {string} navigateButton_2 - navigation button down
 * @param {string} textButton_2 - text button down
 * @returns 
 */
const Header = ({ navigateButton_1, textButton_1, navigateButton_2, textButton_2 }) => {

  const navigate = useNavigate();

  const onClickHome = () => {
    navigate('/home');
  }

  const handleClick_1 = () => {
    navigate(navigateButton_1);
  }
  const handleClick_2 = () => {
    navigate(navigateButton_2);
  }


  const [widthWatcher, setWidthWatcher] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidthWatcher(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [widthWatcher]);



  return (
    <>
      <header className="header_wrapper">
        <div className="header_contents_container">

          <div className="header_logo_container">
            <img className="header_logo_img" src='/assets/logos/logo-circle_hr-net_115x115.webp' alt="Logo HR Net" onClick={onClickHome} />
            <h1 className="header_logo_title">HR net</h1>
          </div>

          <MultipleVerticalBar maxBars={50} className={'header_vertical_bar_item'} />
        
          <div className="header_button_container">
            <div className={`sphere-pyramid_wrapper${widthWatcher < 400 ? '_disabled' : ''}`}>
              {widthWatcher >= 400 && <SpherePyramid arrayOfPattern={[7, 5, 3 ,2, 1]}/>}
            </div>

              <button className="header_button_nav" onClick={handleClick_1}>{textButton_1}</button>
              
              {navigateButton_2 && textButton_2 &&
              <button className="header_button_nav" onClick={handleClick_2}>{textButton_2}</button>
              }

            <div className={`sphere-pyramid_wrapper${widthWatcher < 400 ? '_disabled' : ''}`}>
              {widthWatcher >= 400 && <SpherePyramid arrayOfPattern={[7, 5, 3 ,2, 1]}/>}
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

Header.propTypes = {
  navigateButton_1: PropTypes.string.isRequired,
  textButton_1: PropTypes.string.isRequired,
  navigateButton_2: PropTypes.string,
  textButton_2: PropTypes.string,
};
