import PropTypes from "prop-types";


const DisplayShowingEntries = ({entriesSelectValue, dataLength, currentPage}) => {
  if(entriesSelectValue > dataLength) {
    return (
      <p className="data-table_below_showing_entries_text">Showing {dataLength === 0 ? 0 : 1} to {dataLength} of {dataLength} entries</p>
    )
  } else if (entriesSelectValue * currentPage > dataLength){
      return (
        <p className="data-table_below_showing_entries_text">Showing {((currentPage - 1) * entriesSelectValue) + 1} to {dataLength} of {dataLength} entries</p>
      )
  } else {
    return (
      <p className="data-table_below_showing_entries_text">Showing {((currentPage - 1) * entriesSelectValue) + 1} to {entriesSelectValue * currentPage} of {dataLength} entries</p>
    )
  }
}

export default DisplayShowingEntries;

DisplayShowingEntries.propTypes = {
  entriesSelectValue: PropTypes.number,
  dataLength: PropTypes.number,
  currentPage: PropTypes.number,
};