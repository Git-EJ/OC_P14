import propTypes from 'prop-types';


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