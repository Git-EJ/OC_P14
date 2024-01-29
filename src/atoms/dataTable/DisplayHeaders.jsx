import PropTypes from "prop-types";

const CaretAsc = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512">
    <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/>
  </svg>
)

const CaretDesc = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512">
    <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"/>
  </svg>
);

const DisplayDataHeaders = ({
  headers,
  sortingState,
  handleSortClick,
  IconAsc=null,
  IconDesc=null,
}) => {

  return (
    headers.map((entry, index) => (
      <div className={`data-table_title_item_${index}`} key={`${index}_${entry.value}`}>
        <p className="data-table_title_item_value">{entry.value}</p>
        
        <div className="data-table_title_item_sorting_container">
          <div
            className={`data-table_title_item_sorting_icon-asc ${
              sortingState.index === index && sortingState.direction !== 'asc' ? 'caret_active' : ''
            }`}
            onClick={() => handleSortClick(index, 'asc')}
          >
            {(sortingState.index !== index || sortingState.direction !== 'asc') && (IconAsc ? <IconAsc /> : <CaretAsc />)}
          </div>
          
          <div
            className={`data-table_title_item_sorting_icon-desc ${
              sortingState.index === index && sortingState.direction !== 'desc' ? 'caret_active' : ''
            }`}
            onClick={() => handleSortClick(index, 'desc')}
          >
            {(sortingState.index !== index || sortingState.direction !== 'desc') && (IconDesc ? <IconDesc /> : <CaretDesc /> )}
          </div>
          
        </div>
      </div>
    ))
  );
};

export default DisplayDataHeaders;

DisplayDataHeaders.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object),
  sortingState: PropTypes.object,
  handleSortClick: PropTypes.func,
};