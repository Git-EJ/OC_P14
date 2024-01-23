import PropTypes from "prop-types";
import SphereLine from "../atoms/SphereLine";


const SpheresButton = ({ type, className, onClick, text }) => {

  return (
    <div className="spheres-button_container">
      <SphereLine rotation={180} width={80} height={80} numberOfSpheres={4} />
      <button type={type} className={className} onClick={onClick} >{text}</button>
      <SphereLine rotation={0} width={80} height={80} numberOfSpheres={4} />
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