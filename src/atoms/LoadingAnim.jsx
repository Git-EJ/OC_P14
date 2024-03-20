import propTypes from 'prop-types';

/**
 * 
 * @description Loading component that renders a loading animation with dots.
 * @param {string} addContainerClass - The class to add to the container.
 * @param {string} text - The text to display above the loading dots.
 * @param {string} textFontSize - The font size of the text.
 * @param {string} textColor - The color of the text.
 * @param {string} dotColor - The color of the dots.
 * @param {string} dotFontSize - The font size of the dots.
 * @param {number} nbreDots - The number of dots to display.
 * @returns {JSX} - Returns the JSX of the Loading component with the given parameters.
 * 
 */
const Loading = ({
  addContainerClass='',
  text='Loading',
  textFontSize, 
  textColor,
  dotColor,
  dotFontSize,
  nbreDots= 3,
}) => {

  const calculateAnimDelay = (i) => `${i * 0.2 }s`
  const calculateAnimationDuration = (i) => `${i * 0.5}s`
  

  return (
    <div className= {`${addContainerClass} loading_dots` }>
      <p style={{ color: textColor, fontSize: textFontSize }}>{text}</p>
      {Array.from({ length: nbreDots }).map((_, i) => (
        <span 
        key={`loadingDots${i}`} 
        style= {{ 
          color: dotColor, 
          fontSize: dotFontSize,
          animation: nbreDots > 3 ? `ellipsisDots ${calculateAnimationDuration(nbreDots)} ease ${calculateAnimDelay(i)} infinite` : undefined,
          }}
        >.</span>
      ))}
    </div>
  );
};

export default Loading;

Loading.propTypes = {
  addContainerClass: propTypes.string,
  text: propTypes.string,
  textFontSize: propTypes.string,
  textColor: propTypes.string,
  dotColor: propTypes.string,
  dotFontSize: propTypes.string,
  nbreDots: propTypes.number,
};