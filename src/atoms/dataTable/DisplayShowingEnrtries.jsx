import PropTypes from "prop-types";
import { useEffect } from "react";


const DisplayShowingEntries = ({entriesSelectValue, dataDisplayLength, currentPage}) => {

let entriesText = dataDisplayLength <= 1 ? 'entry' : 'entries';

useEffect(() => {
  console.log('entriesSelectValue: ', entriesSelectValue);
  console.log('dataDisplayLength: ', dataDisplayLength);
  console.log('currentPage: ', currentPage);
  console.log('DisplayShowingEntries rendered');
}, [entriesSelectValue, dataDisplayLength, currentPage]);


  if(entriesSelectValue > dataDisplayLength) {
    return (
      <p className="data-table_below_showing_entries_text">Showing {dataDisplayLength === 0 ? 0 : 1} to {dataDisplayLength} of {dataDisplayLength} {entriesText}</p>
    )
  } else if (entriesSelectValue * currentPage > dataDisplayLength){
      return (
        <p className="data-table_below_showing_entries_text">Showing {((currentPage - 1) * entriesSelectValue) + 1} to {dataDisplayLength} of {dataDisplayLength} {entriesText}</p>
      )
  } else {
    return (
      <p className="data-table_below_showing_entries_text">Showing {((currentPage - 1) * entriesSelectValue) + 1} to {entriesSelectValue * currentPage} of {dataDisplayLength} {entriesText}</p>
    )
  }
}

export default DisplayShowingEntries;

DisplayShowingEntries.propTypes = {
  entriesSelectValue: PropTypes.number,
  dataDisplayLength: PropTypes.number,
  currentPage: PropTypes.number,
};