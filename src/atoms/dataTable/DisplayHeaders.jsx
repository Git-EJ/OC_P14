import PropTypes from "prop-types";
import CaretAsc from "../../assets/icons/Caret_Asc";
import CaretDesc from "../../assets/icons/Caret_Desc";

const DisplayDataHeaders = ({
  headers,
  sortingState,
  handleSortClick,
}) => {


  return (
    headers.map((entry, index) => (
      <div className={`data-table_title_item_${index}`} key={`${index}_${entry.value}`}>
        <p className="data-table_title_item_value">{entry.value}</p>
        
        <div className="data-table_title_item_sorting_container">
          <div
            className={`data-table_title_item_sorting_icon-asc ${
              sortingState.activeSortIndex === index && sortingState.direction === 'asc' ? 'caret_active' : ''
            }`}
            onClick={() => handleSortClick(index, 'asc')}
            >
            {sortingState.activeSortIndex === index && sortingState.direction === 'desc' ? null : <CaretAsc />}
          </div>
          
          <div
            className={`data-table_title_item_sorting_icon-desc ${
              sortingState.activeSortIndex === index && sortingState.direction === 'desc' ? 'caret_active' : ''
            }`}
            onClick={() => handleSortClick(index, 'desc')}
            >
            {sortingState.activeSortIndex === index && sortingState.direction === 'asc' ? null : <CaretDesc />}
          </div>
          
        </div>
      </div>
    ))
  );
};

export default DisplayDataHeaders;

DisplayDataHeaders.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  setData: PropTypes.func,
  activeSortIndex: PropTypes.number,
  setActiveSortIndex: PropTypes.func,
  sortingState: PropTypes.object,
  setSortingState: PropTypes.func,
  sort: PropTypes.func,
};