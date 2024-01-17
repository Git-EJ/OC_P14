import PropTypes from "prop-types";
import { useCallback, useContext, useEffect } from "react";
import DataTableContext from "../context/dataTable/DataTableContext";
import CaretAsc from "../assets/icons/Caret_Asc";
import CaretDesc from "../assets/icons/Caret_Desc";
import CircleArrowLeft from "../assets/icons/CircleArrowLeft";
import CircleArrowRight from "../assets/icons/CircleArrowRight";
import PaginationCounter from "../atoms/PaginationCounter";


const DataTable = ({headers, data}) => {
  
  const {state, dispatch} = useContext(DataTableContext);
  
  const {
    currentData, 
    activeSortIndex, 
    isActiveCaretAsc, 
    isActiveCaretDesc, 
    currentPage, 
    selectValue, 
    dataLength,
    totalPageCount,
    isFiltering,
    isSorting,
    searchValue,

  } = state;
  
  const setCurrentData = useCallback((payload) => dispatch({type: "SET_CURRENT_DATA", payload}), [dispatch]);
  const setActiveSortIndex = useCallback((payload) => dispatch({type: "SET_ACTIVE_SORT_INDEX", payload}), [dispatch]);
  const setIsActiveCaretAsc = useCallback((payload) => dispatch({type: "SET_IS_ACTIVE_CARET_ASC", payload}), [dispatch]);
  const setIsActiveCaretDesc = useCallback((payload) => dispatch({type: "SET_IS_ACTIVE_CARET_DESC", payload}), [dispatch]);
  const setCurrentPage = useCallback((payload) => dispatch({type: "SET_CURRENT_PAGE", payload}), [dispatch]);
  const setSelectValue = useCallback((payload) => dispatch({type: "SET_SELECT_VALUE", payload}), [dispatch]);
  const setDataLength = useCallback((payload) => dispatch({type: "SET_DATA_LENGTH", payload}), [dispatch]);
  const setTotalPageCount = useCallback((payload) => dispatch({type: "SET_TOTAL_PAGE_COUNT", payload}), [dispatch]);
  const setIsFiltering = useCallback((payload) => dispatch({type: "SET_IS_FILTERING", payload}), [dispatch]);
  const setIsSorting = useCallback((payload) => dispatch({type: "SET_IS_SORTING", payload}), [dispatch]);
  const setSearchValue = useCallback((payload) => dispatch({type: "SET_SEARCH_VALUE", payload}), [dispatch]);
  const setResetState = useCallback((payload) => dispatch({type: "SET_RESET_STATE", payload}), [dispatch]);


  //TODO sort issue when click for the second time after refresh nothing happend and after sort is inverted 
  //TODO save sort when filtering
  const sort = (entry, data, sortBy='asc') => {

    setIsSorting(true);
    const key = entry.key;

  
      if (entry.sort) {
        return [...data].sort((a, b) => entry.sort(a, b, sortBy==='desc' ? -1 : 1)) // for future dev (librairy)

      } else if (entry.type === 'number') {
        return [...data].sort((a, b) => (+a[key] - +b[key]) * (sortBy === "desc" ? -1 : 1))

      } else if (entry.type === 'date') {
        return [...data].sort((a, b) => (new Date(a[key]) - new Date(b[key])) * (sortBy === "desc" ? -1 : 1))

      } else if (entry.type === 'street') {
        return [...data].sort((a, b) => {

          const extractStreetData = (address) => {

            const parts = address.split(' ');

            // Extract street number 
            // parsInt convert string to number('10'to 10) ; 
            // .shift() throw away the first element of the array and return it : 
            // example => ['10', 'rue', 'du', 'code'] => throw '10' and change the array for  ['rue', 'du', 'code']
            const number = parseInt(parts.shift(), 10); 

            //Extract street name
            // .join(' ') convert array to string
            // example => ['rue', 'du', 'code'] => 'rue du code'
            const streetName = parts.join(' ');

            return { number, streetName };
          };
        
          // aData and bData are objects with number and streetName properties
          // example => { number: 10, streetName: 'rue du code' }
          const aData = extractStreetData(a[key]);
          const bData = extractStreetData(b[key]);


          // Sort by street name
          // throw 0 if a === b ; -1 if a < b ; 1 if a > b
          const nameCompare = aData.streetName.localeCompare(bData.streetName);

          if (nameCompare !== 0) {
            return nameCompare * (sortBy === "desc" ? -1 : 1);
          }
        
          // if street names are equal, sort by street number
          return (aData.number - bData.number) * (sortBy === "desc" ? -1 : 1); //with .number 03 before 10
        });

      // } else if (entry.type === 'street') {
      //   return [...data].sort((a, b) => {
      //     const v0 = a[key].split(' ')
      //     const v1 =  b[key].split(' ')

      //     if ((v0[0] === (+v0[0]) + '') && (v1[0] === (+v1[0]) + '')) {
      //       return (+v0[0] - +v1[0]) * (sortBy === "desc" ? -1 : 1)
      //     }

      //     return (a[key].localeCompare(b[key])) * (sortBy === "desc" ? -1 : 1)
      //   })

      } else {
        return [...data].sort((a, b) => (a[key].localeCompare(b[key])) * (sortBy === "desc" ? -1 : 1))
      }

  };

  
  const searchEmployee = useCallback((e) => {
    
    const value = e.target.value.toLowerCase();
    const filteredData = data.filter((employee) => {

      return (
        //TODO include ou === value?
        //TODO onChange or onBlur
        //TODO REGEX
        //TODO issue when selectValue change after search like jean and change selectValue for 10
        employee.firstName.toLowerCase().includes(value) ||
        employee.lastName.toLowerCase().includes(value) ||
        employee.street.toLowerCase().includes(value) ||
        employee.startDate.toLowerCase().includes(value) ||
        employee.department.toLowerCase().includes(value) ||
        employee.dateOfBirth.toLowerCase().includes(value) ||
        employee.street.toLowerCase().includes(value) ||
        employee.city.toLowerCase().includes(value) ||
        employee.state.toLowerCase().includes(value) ||
        employee.zipCode.toLowerCase().includes(value)
      );
    });
    setCurrentData(filteredData);
    setDataLength(filteredData.length);
    setIsFiltering(true);
    setSearchValue(value);
  }, [data, setCurrentData, setDataLength, setIsFiltering, setSearchValue]);
  
  
  
  const DisplayDataHeaders = () => {
    
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

  
  
  const DisplayDataContents = ({data}) => {
    if (selectValue >= dataLength) {
      return (
        <DataContents data={data} />
        )
      } else {
      return (
        <DataContents data={data.slice((currentPage - 1) * selectValue, currentPage * selectValue )} />
      )
    }
  };
  

  
  const DisplayShowingEntries = () => {
    
    if(selectValue > dataLength) {
      return (
        <p className="data-table_below_showing_entries_text">Showing {dataLength === 0 ? 0 : 1} to {dataLength} of {dataLength} entries</p>
        )
      } else if (selectValue * currentPage > dataLength){
        return (
          <p className="data-table_below_showing_entries_text">Showing {((currentPage - 1) * selectValue) + 1} to {dataLength} of {dataLength} entries</p>
          )
        } else {
          return (
            <p className="data-table_below_showing_entries_text">Showing {((currentPage - 1) * selectValue) + 1} to {selectValue * currentPage} of {dataLength} entries</p>
            )
          }
        };

        
        
  const DisplayPagination = () => {

    const onPreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
    
    const onNextPage = () => {
      if (currentPage < totalPageCount) {
        setCurrentPage(currentPage + 1);
      }
    }
    
    return (
      <>
        <button className="data-table_below_pagination_button_previous" onClick={onPreviousPage}>
          <CircleArrowLeft color1={'#1494B9'} color2={'#0E3C55'} rayon={70}/>
        </button>
        <PaginationCounter />
        <button className="data-table_below_pagination_button_next" onClick={onNextPage}>
          <CircleArrowRight color1={'#1494B9'} color2={'#0E3C55'} rayon={70} />
        </button>
      </>
    )
  }

  
  // TODO good pratice??
  useEffect(() => {
    if (!isFiltering) {
      setCurrentData(sort({key: 'lastName', value: 'LastName'}, data, 'asc'));
      setDataLength(data.length);
    }
    setTotalPageCount(Math.ceil(dataLength / selectValue));
  }, [isFiltering, data, setCurrentData, dataLength ,setDataLength, selectValue, setTotalPageCount]);
  


  //START DataTable RETURN
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
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50" >50</option>
            <option value="100">100</option>
          </select>
          <label htmlFor="data-table_entries">entries</label>
        </div>

        <div className="data-table_options_search">
          <label htmlFor="data-table_search">Search:</label>
          <input id="data-table_search" 
            type="text" 
            placeholder="" 
            value={searchValue} 
            onChange={(e) => searchEmployee(e)}
          />
        </div>
      </div>

      <div className="data-table_titles_container">
        <DisplayDataHeaders />
      </div>

      <div className="data-table_content-lines_container">
        <DisplayDataContents data={currentData} />
      </div>

      <div className="data-table_below_container">
        <div className="data-table_below_left_container">

          <div className="data-table_below_showing_entries_container">
            <DisplayShowingEntries />
          </div>

          <div className="data-table_below_reset_container">
            <button className="data-table_below_reset_button" onClick={() => setResetState(true)}>Fait Reset</button>
          </div>

        </div>

        <div className="data-table_below_pagination_container">
          <DisplayPagination />
        </div>

      </div>

      {/* TODO delete/modif employee*/}
      
    </div>
  )
}

export default DataTable;

DataTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
};