import { Fragment } from "react";
import PropTypes from "prop-types";

const DataContents = ({headers, data, lineSelected, setLineSelected}) => {

  return data.map((content, i) => (
      
    <div className= {`data-table_content-line_container ${lineSelected === i ? 'data-table_content-line_container_selected' : ''}`}
      id={`data-table_content-line_container_${i}`}
      key={`${i}_${content.firstName}-${content.lastName}`}
      onClick={() => {setLineSelected(i)}}
    >

      {headers.map((cell, j) => {
        return (
          <Fragment key={`item_${i}_${cell.key}`}>
            {cell.key && (
            <div
              className={`data-table_content-line_item`}
              style={cell.sx}
            >
              <p className="data-table_content-line_item_value">{content[cell.key]}</p>
            </div>
          )}</Fragment>
        )
      })}
    </div>
  ));
};


const DisplayDataContents = ({headers, data, entriesSelectValue, displayDataLength, currentPage, lineSelected, setLineSelected}) => {
  
  //avoid error when data.length is 0
  if (!data) {
    return null;
  }

  return (
    <DataContents
      headers={headers}
      data={(entriesSelectValue >= displayDataLength) ? data : data.slice((currentPage - 1) * entriesSelectValue, currentPage * entriesSelectValue )}
      lineSelected={lineSelected}
      setLineSelected={setLineSelected}
    />
  )
};

export default DisplayDataContents;

DisplayDataContents.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  entriesSelectValue: PropTypes.number,
  displayDataLength: PropTypes.number,
  currentPage: PropTypes.number,
  lineSelected: PropTypes.number,
  setLineSelected: PropTypes.func,
};
