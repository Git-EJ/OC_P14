import PropTypes from 'prop-types';


const MultipleVerticalBar = ({nbreOfBars, className}) => {

  let verticalBars = [];
  
  //TODO a div for each | is not a good idea, find a better way to do it
  for (let i = 0; i < nbreOfBars; i++) {
    verticalBars.push(<div className={className} key={`${className}_${i}`}>|</div>)
  }

  return verticalBars;
}

export default MultipleVerticalBar;


MultipleVerticalBar.propTypes = {
  nbreOfBars: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
};
