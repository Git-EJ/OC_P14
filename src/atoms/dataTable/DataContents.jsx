import PropTypes from "prop-types";



const DataContents = ({data}) => {

  const dataTableShape = {
    firstName: '',
    lastName: '',
    startDate: '',
    department: '',
    dateOfBirth: '',  
    street: '',
    city: '',
    state: '',
    zipCode: '',
  };

  return data.map((content, i) => (
      
    <div className="data-table_content-line_container"
      id={`data-table_content-line_container_${i}`}
      key={`${i}_${content.firstName}-${content.lastName}`}
    >

      {Object.keys(dataTableShape).map((property, j) => {

        return (
          <div className={`data-table_content-line_item_${j}`} key={`item_${i}_${property}`}>
            <p className="data-table_content-line_item_value">{content[property]}</p>
          </div>
        )
      })}
    </div>
  ));
};


const DisplayDataContents = ({data, entriesSelectValue, dataDisplayLength, currentPage}) => {
  
  //avoid error when data.length is 0
  if (!data) {
    return null;
  }

  return (
    <DataContents
      data={(entriesSelectValue >= dataDisplayLength) ? data : data.slice((currentPage - 1) * entriesSelectValue, currentPage * entriesSelectValue )}
    />
  )
};

export default DisplayDataContents;

DisplayDataContents.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  entriesSelectValue: PropTypes.number,
  dataDisplayLength: PropTypes.number,
  currentPage: PropTypes.number,
};
