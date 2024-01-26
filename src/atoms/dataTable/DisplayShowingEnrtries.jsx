import PropTypes from "prop-types";
import { useEffect } from "react";


const DisplayShowingEntries = ({entriesSelectValue, displayDataLength, currentPage}) => {

let entriesText = displayDataLength <= 1 ? 'entry' : 'entries';

useEffect(() => {
  // console.log('entriesSelectValue: ', entriesSelectValue);
  // console.log('displayDataLength: ', displayDataLength);
  // console.log('currentPage: ', currentPage);
  // console.log('DisplayShowingEntries rendered');
}, [entriesSelectValue, displayDataLength, currentPage]);


  if(entriesSelectValue > displayDataLength) {
    return (
      <p className="data-table_below_showing_entries_text">Showing {displayDataLength === 0 ? 0 : 1} to {displayDataLength} of {displayDataLength} {entriesText}</p>
    )
  } else if (entriesSelectValue * currentPage > displayDataLength){
      return (
        <p className="data-table_below_showing_entries_text">Showing {((currentPage - 1) * entriesSelectValue) + 1} to {displayDataLength} of {displayDataLength} {entriesText}</p>
      )
  } else {
    return (
      <p className="data-table_below_showing_entries_text">Showing {((currentPage - 1) * entriesSelectValue) + 1} to {entriesSelectValue * currentPage} of {displayDataLength} {entriesText}</p>
    )
  }
}

export default DisplayShowingEntries;

DisplayShowingEntries.propTypes = {
  entriesSelectValue: PropTypes.number,
  displayDataLength: PropTypes.number,
  currentPage: PropTypes.number,
};