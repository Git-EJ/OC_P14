import PropTypes from "prop-types";

const SvgRadialGradient = ({ color1, color2, rayon }) => (
  <radialGradient id="svg_radial-gradient" cx="50%" cy="50%" r={`${rayon}%`} fx="50%" fy="50%">
    <stop offset="0%" style={{ stopColor: color1, stopOpacity: 1 }} />
    <stop offset="100%" style={{ stopColor: color2, stopOpacity: 1 }} />
  </radialGradient>
);

export default SvgRadialGradient;


SvgRadialGradient.propTypes = {
  color1: PropTypes.string.isRequired,
  color2: PropTypes.string.isRequired,
  rayon: PropTypes.number.isRequired,
};