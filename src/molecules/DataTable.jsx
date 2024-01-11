import PropTypes from "prop-types";
import { useState } from "react";
import CaretUp from "../assets/icons/Caret_up";
import CaretDown from "../assets/icons/Caret_down";


const DataTable = ({headers, data}) => {

  const [currentData, setCurrentData] = useState(data);


  //TODO default sort by lastName asc
  const sort = (entry, data, sortBy='asc') => {
    const key = entry.key;

    if (entry.sort) {
      return [...data].sort((a, b) => entry.sort(a, b, sortBy==='desc' ? -1 : 1)) // for future dev (librairy)

    } else if (entry.type === 'number') {
      return [...data].sort((a, b) => (+a[key] - +b[key]) * (sortBy === "desc" ? -1 : 1))

    } else if (entry.type === 'date') {
      return [...data].sort((a, b) => (new Date(a[key]) - new Date(b[key])) * (sortBy === "desc" ? -1 : 1))

    } else if (entry.type === 'street') {
      return [...data].sort((a, b) => {
        const v0 = a[key].split(' ')
        const v1 =  b[key].split(' ')

        if ((v0[0] === (+v0[0]) + '') && (v1[0] === (+v1[0]) + '')) {
          return (+v0[0] - +v1[0]) * (sortBy === "desc" ? -1 : 1)
        }

        return (a[key].localeCompare(b[key])) * (sortBy === "desc" ? -1 : 1)
      })

    } else {
      return [...data].sort((a, b) => (a[key].localeCompare(b[key])) * (sortBy === "desc" ? -1 : 1))
    }
  }


  // TODO active class for caret with ternaire operator 
  const DataHeaders = ({ currentData, setCurrentData }) => {
    
    return headers.map((entry, index) => (
      
      <div className={`current-employees_data-table_title_item_${index}`} key={`${index}_${entry.value}`}>
        <p className= "current-employees_data-table_title_item_value">{entry.value}</p>
        <div className="current-employees_data-table_title_item_sorting_container">

          <div className="current-employees_data-table_title_item_sorting_icon-up" 
            onClick={() => setCurrentData(sort(entry, currentData)) }
          > 
            <CaretUp /> 
          </div>

          <div className="current-employees_data-table_title_item_sorting_icon-down" 
            onClick={() => setCurrentData(sort(entry, currentData, 'desc')) }
          > 
            <CaretDown /> 
          </div>
        
        </div>

      </div>
    ));
  };


  const DataContents = ({data}) => {
    return data.map((content, index) => (
          
      <div className="current-employees_data-table_content-line_container" key={`${index}_${content.firstName}-${content.lastName}`}>
       
        {Object.values(content).map((value, i) => (
          <div className={`current-employees_data-table_content-line_item_${i}`} key={`item_${i}_${value}`}>
            <p className="current-employees_data-table_content-line_item_value">{value}</p>
          </div>
        ))}

      </div>
    ));
  };


  return (

    <div className="current-employees_data-table_wrapper">

      <div className="current-employees_data-table_options_container">

        {/* TODO Tooltip */}
        <div className="current-employees_data-table_options_entries">
          <label htmlFor="data-table_entries">Show</label>
          <select id="data-table_entries" defaultValue={1}>
            <option value="1">1</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50" >50</option>
            <option value="100">100</option>
          </select>
          <label htmlFor="data-table_entries">entries</label>
        </div>

        <div className="current-employees_data-table_options_search">
          <label htmlFor="data-table_search">Search:</label>
          <input id="data-table_search" type="text" placeholder="" />
        </div>
      </div>

      <div className="current-employees_data-table_titles_container">
        <DataHeaders currentData={currentData} setCurrentData={setCurrentData} />
      </div>

      <div className="current-employees_data-table_content-lines_container">
        <DataContents data={currentData} />
      </div>

      <div className="current-employees_data-table_showing_container">

        <div className="current-employees_data-table_showing_entries_container">
          <p className="current-employees_data-table_showing_entries_text">Showing 1 to 3 of 3 entries</p>
        </div>

        <div className="current-employees_data-table_showing_pagination_container">
          <button className="current-employees_data-table_showing_pagination_button_previous">Previous</button>
          <button className="current-employees_data-table_showing_pagination_button_current">1</button>
          <button className="current-employees_data-table_showing_pagination_button_not-current">2</button>
          <button className="current-employees_data-table_showing_pagination_button_next">Next</button>
        </div>

      </div>

      {/* TODO delete/modif employee with checkbox and button delete/modif ??*/}
      
    </div>
  )
}

export default DataTable;

DataTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
};