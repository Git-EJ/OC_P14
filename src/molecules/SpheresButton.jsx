import PropTypes from "prop-types";
import SphereLine from "../atoms/SphereLine";


const SpheresButton = ({ type, className, onClick, text }) => {

  return (
    <div className="spheres-button_container">
      <SphereLine />
      <button type={type} className={className} onClick={onClick} >{text}</button>
      <SphereLine rotation={'east'} />
    </div>
  )
};

export default SpheresButton;

SpheresButton.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
};