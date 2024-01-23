import PropTypes from "prop-types";



const DataContents = ({data}) => {
  return data.map((content, i) => (
      
    //TODO onClick function for retrieval of employee data for modification or deletion
    <div className="data-table_content-line_container"
      id={`data-table_content-line_container_${i}`}
      key={`${i}_${content.firstName}-${content.lastName}`} //TODO good practice??? if there is npo firstname and lastname or same name???
      // onClick={() => console.log(`click-line_${i}`, content)}
    >
     
      {Object.values(content).map((value, i) => (
        <div className={`data-table_content-line_item_${i}`} key={`item_${i}_${value}`}>
          <p className="data-table_content-line_item_value">{value}</p>
        </div>
      ))}

    </div>
  ));
};


const DisplayDataContents = ({data, entriesSelectValue, dataLength, currentPage}) => {
  return (
    <DataContents
      data={(entriesSelectValue >= dataLength) ? data : data.slice((currentPage - 1) * entriesSelectValue, currentPage * entriesSelectValue )}
    />
  )
};

export default DisplayDataContents;

DisplayDataContents.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  entriesSelectValue: PropTypes.number,
  dataLength: PropTypes.number,
  currentPage: PropTypes.number,
};
