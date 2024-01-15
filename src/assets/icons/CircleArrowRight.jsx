import PropTypes from "prop-types";
import SvgRadialGradient from "../../atoms/style/SvgRadialGradient";

const CircleArrowRight = ({ color1, color2, rayon }) => (
    // <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512">
    <SvgRadialGradient color1={color1} color2={color2} rayon={rayon} />
    <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z"/>
  </svg>
);

export default CircleArrowRight;

CircleArrowRight.propTypes = {
  color1: PropTypes.string.isRequired,
  color2: PropTypes.string.isRequired,
  rayon: PropTypes.number.isRequired,
};