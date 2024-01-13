import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CaretAsc from "../assets/icons/Caret_Asc";
import CaretDesc from "../assets/icons/Caret_Desc";


const DataTable = ({headers, data}) => {

  const [currentData, setCurrentData] = useState(data);

  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const [isActiveCaretAsc, setIsActiveCaretAsc] = useState(false);
  const [isActiveCaretDesc, setIsActiveCaretDesc] = useState(false);

  const [selectValue, setSelectValue] = useState(1);
  const [dataLenght, setDataLenght] = useState(0);




  //TODO sort issue when click for the second time after refresh nothing happend and after sort is inverted
  //TODO default sort by lastName asc
  //TODO sort by street fix issue sort by street name not number
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


  const DataHeaders = ({ currentData, setCurrentData }) => {

  
    const handleSortClick = (index, direction) => {

      const entry = headers[index];

      setCurrentData(sort(entry, currentData, direction));
      setActiveSortIndex(index);

      if (direction === 'asc') {
        setIsActiveCaretAsc(isActiveCaretAsc ? false : true)
        setIsActiveCaretDesc(isActiveCaretAsc ? true : false)
    
      } else if (direction === 'desc'){
        setIsActiveCaretDesc(isActiveCaretDesc ? false : true)
        setIsActiveCaretAsc(isActiveCaretDesc ? true : false)
      }
    };


    return (
      headers.map((entry, index) => (
        <div className={`data-table_title_item_${index}`} key={`${index}_${entry.value}`}>
          <p className="data-table_title_item_value">{entry.value}</p>
          
          <div className="data-table_title_item_sorting_container">
            <div
              className={`data-table_title_item_sorting_icon-asc ${
                activeSortIndex === index && isActiveCaretAsc ? 'caret_active' : ''
              }`}
              onClick={() => handleSortClick(index, 'asc')}
            >
              {activeSortIndex === index && isActiveCaretDesc ? null : <CaretAsc />}
            </div>
            
            <div
              className={`data-table_title_item_sorting_icon-desc ${
                activeSortIndex === index && isActiveCaretDesc ? 'caret_active' : ''
              }`}
              onClick={() => handleSortClick(index, 'desc')}
            >
              {activeSortIndex === index && isActiveCaretAsc ? null : <CaretDesc />}
            </div>
            
          </div>
        </div>
      ))
    );
  };


  const DataContents = ({data}) => {
    return data.map((content, index) => (
          
      <div className="data-table_content-line_container" key={`${index}_${content.firstName}-${content.lastName}`}>
       
        {Object.values(content).map((value, i) => (
          <div className={`data-table_content-line_item_${i}`} key={`item_${i}_${value}`}>
            <p className="data-table_content-line_item_value">{value}</p>
          </div>
        ))}

      </div>
    ));
  };
  
  const DisplayShowingEntries = () => {
    const display = (selectValue > dataLenght ? dataLenght : selectValue);
    return (
      <>
        <p className="data-table_showing_entries_text">
            Showing 1 to {display} of {dataLenght} entries
        </p>
      </>
    )
  }

  const [currentPage, setCurrentPage] = useState(1);
  const totalPageCount = Math.ceil(dataLenght / selectValue);

  

  //TODO display pagination
  const DisplayPagination = () => {

    const handlePrevious = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }

    const handleNext = () => {
      if (currentPage < totalPageCount) {
        setCurrentPage(currentPage + 1);
      }
    }

    const paginationCounter = () => {
      const pagesButtons = [];
      for (let i = 1; i <= totalPageCount; i++) {
        pagesButtons.push(
          <button 
            key={`pagination_button_${i}`} 
            className= {`data-table_showing_pagination_button_${currentPage === i ? 'current' : 'not-current'}`}
            onClick={() => setCurrentPage(i)}
          >
          {i}
          </button>
        )
      }
      return pagesButtons;
    }


    return (
      <>
        <button className="data-table_showing_pagination_button_previous" onClick={handlePrevious}>Previous</button>
        {paginationCounter()}
        <button className="data-table_showing_pagination_button_next" onClick={handleNext}>Next</button>
      </>
    )
  }


  //TODO good pratice??
  useEffect(() => {
    setCurrentData(data); 
    setDataLenght(data.length);
  }, [data]);


  return (

    <div className="data-table_wrapper">

      <div className="data-table_options_container">

        {/* TODO Tooltip */}
        <div className="data-table_options_entries">
          <label htmlFor="data-table_entries">Show</label>
          <select 
            id="data-table_entries" 
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="1">1</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50" >50</option>
            <option value="100">100</option>
          </select>
          <label htmlFor="data-table_entries">entries</label>
        </div>

        {/* TODO search component */}
        <div className="data-table_options_search">
          <label htmlFor="data-table_search">Search:</label>
          <input id="data-table_search" type="text" placeholder="" />
        </div>
      </div>

      <div className="data-table_titles_container">
        <DataHeaders currentData={currentData} setCurrentData={setCurrentData} />
      </div>

      <div className="data-table_content-lines_container">
        <DataContents data={currentData} />
      </div>

      <div className="data-table_showing_container">

        <div className="data-table_showing_entries_container">
          <DisplayShowingEntries />
        </div>

        <div className="data-table_showing_pagination_container">
          <DisplayPagination />
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