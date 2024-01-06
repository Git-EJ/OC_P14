import MultipleVerticalBar from "../atoms/MultipleVerticalBar";


const Header = () => {

  return (
    <>
      <header className="header_wrapper">
        <div className="header_logo_and_vertical_bar_container">
          <div className="header_logo_container">
            <img className="header_logo_img" src="/src/assets/logos/logo-circle_hr-net.png" alt="Logo HR Net" />
            <h1 className="header_logo_title">HR net</h1>
          </div>
          <div className="header_vertical_bar_container">
            <MultipleVerticalBar nbreOfBars={50} className={'header_vertical_bar_item'} />
          </div>
        </div>
        {/* empty div for the line under the logo and vertical bar */}
        <div className="header_border_bottom"></div> 
      </header>
    </>
  );
}

export default Header;