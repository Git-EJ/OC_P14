import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import CaretAsc from "../assets/icons/Caret_Asc";
import CaretDesc from "../assets/icons/Caret_Desc";
import Pagination from "../atoms/Pagination";



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

DisplayShowingEntries.propTypes = {
  entriesSelectValue: PropTypes.number,
  dataLength: PropTypes.number,
  currentPage: PropTypes.number,
};


const DataContents = ({data}) => {
  return data.map((content, i) => (
      
    //TODO onClick function for retrieval of employee data for modification or deletion
    <div className="data-table_content-line_container"
      id={`data-table_content-line_container_${i}`}
      key={`${i}_${content.firstName}-${content.lastName}`}
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
    />)
}

DisplayDataContents.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  entriesSelectValue: PropTypes.number,
  dataLength: PropTypes.number,
  currentPage: PropTypes.number,
};


//TODO onResetData
//TODO icons in component datatable
const DataTable = ({
  headers,
  data,
  // onEditRequest = () => {},
  // onChange = () => {},
  onResetData = () => {},
  onResetSettings = () => {},
  resetSettings = false,
  itemsPerPage = 5,
  itemsSearchSelectValue = 'all',
  IconLeft = ()=>{return (<></>)},
  IconRight = ()=>{return (<></>)},
}) => {

  
  
  const searchRef = useRef({value:""})
  const [displayData, setDisplayData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesSelectValue, setEntrieSelectValue] = useState(itemsPerPage);
  const [dataLength, setDataLength] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [lastSearch, setLastSearch] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(0);
  const [sortingState, setSortingState] = useState({ activeSortIndex: null, direction: null, });
  const [searchSelectValue, setSearchSelectValue] = useState(itemsSearchSelectValue);


  const setResetSettings = useCallback(() => {
    setDisplayData(data);
    setCurrentPage(1);
    setEntrieSelectValue(itemsPerPage);
    searchRef.current && (searchRef.current.value = "")
    setLastSearch('');
    setSortingState({
      activeSortIndex: null,
      direction: null,
    });
    setSearchSelectValue(itemsSearchSelectValue);
  }, [
    setDisplayData,
    data,
    setCurrentPage,
    setEntrieSelectValue,
    itemsPerPage,
    setLastSearch,
    setSortingState,
    setSearchSelectValue,
    itemsSearchSelectValue,
  ]);

  
  //TODO save sort when filtering not working
  const sort = useCallback((entry, data, sortBy='asc') => {

    const key = entry.key;

  
      if (entry.sort) {
        return [...data].sort((a, b) => entry.sort(a, b, sortBy==='desc' ? -1 : 1)) // for future dev (librairy)

      } else if (entry.type === 'number') {
        return [...data].sort((a, b) => (+a[key] - +b[key]) * (sortBy === "desc" ? -1 : 1))

       
      } else if (entry.type === 'date') {
        return [...data].sort((a, b) => {
         
          const formatDate = (dateStr) => { // date entry format needs to be : 'dd/mm/yyyy'
            const parts = dateStr.split('/');
            return new Date(parts[2], parts[1] - 1, parts[0]); // yyyy, mm, dd => month -1 because month start at 0 in JS
          };
      
          const dateA = formatDate(a[key]);
          const dateB = formatDate(b[key]);
      
          return (dateA - dateB) * (sortBy === "desc" ? -1 : 1);
        });

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

      } else {
        return [...data].sort((a, b) => (a[key].localeCompare(b[key])) * (sortBy === "desc" ? -1 : 1))
      }

  },[]);


  const handleSortClick = useCallback((index, direction) => {
    setSortingState(prevState => {

      if (prevState.activeSortIndex === index) {
        const newDirection = prevState.direction === 'asc' ? 'desc' : 'asc'
        const sortedData = sort(headers[index], data, newDirection);
        setDisplayData(sortedData);
  
        return {
          ...prevState,
          direction: newDirection,
        };

      } else {
        const sortedData = sort(headers[index], data, direction);
        setDisplayData(sortedData);
  
        return {
          activeSortIndex: index,
          direction,
        };
      }
    });
  
  }, [sort, headers, data, setSortingState]);


  // TODO apply, if sort is active, sort on search result
  // const applySort = useCallback((data) => {
  //   if(!sortingState.activeSortIndex) return data;
  //   return sort(headers[sortingState.activeSortIndex], data, sortingState.direction);
  // }, [sortingState, sort, headers]);


  const searchBySelectValue = useCallback((value, employee) => {
    switch(searchSelectValue) {

      case 'all':
        return Object.keys(employee).some((key) => employee[key].toLowerCase().includes(value));

      case 'firstName':
        return employee.firstName.toLowerCase().includes(value);
      case 'lastName':
        return employee.lastName.toLowerCase().includes(value);
      case 'startDate':
        return employee.startDate.toLowerCase().includes(value);
      case 'department':
        return employee.department.toLowerCase().includes(value);
      case 'dateOfBirth':
        return employee.dateOfBirth.toLowerCase().includes(value);
      case 'street':
        return employee.street.toLowerCase().includes(value);
      case 'city':
        return employee.city.toLowerCase().includes(value);
      case 'state':
        return employee.state.toLowerCase().includes(value);
      case 'zipCode':
        return employee.zipCode.toLowerCase().includes(value);
      default:
        return Object.keys(employee).some((key) => employee[key].toLowerCase().includes(value));
    }
    },[searchSelectValue]); 

    // const filteredData = data.filter((employee) => search(value, employee));
    // const sortedFilteredData = applySort(filteredData);
    // setDisplayData(sortedFilteredData);
    // setLastSearch(value);
    // }, [data, setDisplayData, lastSearch, setLastSearch, applySort, searchSelectValue]);

  //TODO REGEX
  const searchEmployeeDebounced = useCallback((e) => {
    const value = e.target.value.toLowerCase();
    if (value === lastSearch) return;
    setDisplayData(data.filter((employee) => searchBySelectValue(value, employee)))
    setLastSearch(value);
  }, [lastSearch, setLastSearch, searchBySelectValue, data, setDisplayData]);
  
  useEffect(() => {
    setDisplayData(data.filter((employee) => searchBySelectValue(lastSearch, employee)))
  }, [data, searchBySelectValue, lastSearch, setDisplayData]);


  const searchEmployee = useCallback((e) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(
      setTimeout(() => {
        searchEmployeeDebounced(e);
        setSearchTimeout(0);
      }, 300)
    )
  }, [searchEmployeeDebounced, searchTimeout]);
  


  
  // on mount
  useEffect(() => {
    if (data && data.length > 0) {
      setDisplayData(data);
    }
  }, [data, setDisplayData]);


  useEffect(() => {
    setDataLength(displayData.length);
  }, [displayData, setDataLength]);
  
  useEffect(() => {
    setTotalPageCount(Math.ceil(dataLength / entriesSelectValue));
  }, [dataLength ,entriesSelectValue, setTotalPageCount]);

  useEffect(() => {
    setResetSettings();
  }, [resetSettings, setResetSettings]);




  //START DataTable RETURN
  return (
    
    <div className="data-table_wrapper">

      <div className="data-table_options_container">

        {/* TODO Tooltip */}
        <div className="data-table_options_entries">
          <label htmlFor="data-table_entries">Show</label>
          <select 
            id="data-table_entries" 
            value={entriesSelectValue}
            onChange={(e) => setEntrieSelectValue(+e.target.value)}
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

        <div className="data-table_options_search_container">

          <div className="data-table_options_search_select">
            <label htmlFor="data-table_search-select">Search by:</label>
            <select
              id="data-table_search-select"
              value={searchSelectValue}
              onChange={(e) => setSearchSelectValue(e.target.value)}
            >
              <option value="all">All</option>
              <option value="firstName">FirstName</option>
              <option value="lastName">LastName</option>
              <option value="startDate">StartDate</option>
              <option value="department">Department</option>
              <option value="dateOfBirth">Date of Birth</option>
              <option value="street">Street</option>
              <option value="city">City</option>
              <option value="state">State</option>
              <option value="zipCode">Zip Code</option>
            </select>
          </div>

          <div className="data-table_options_search_input">
            <label htmlFor="data-table_search-input">Search:</label>
            <input
              ref={searchRef}
              id="data-table_search-input"
              type="text" 
              placeholder=""
              onChange={(e) => searchEmployee(e)}
            />
          </div>
        </div>
      </div> 

      <div className="data-table_titles_container">
        <DisplayDataHeaders
          headers={headers}
          sortingState={sortingState}
          handleSortClick={handleSortClick}
        />
      </div>

      <div className="data-table_content-lines_container">
        <DisplayDataContents
          data={displayData}
          entriesSelectValue={entriesSelectValue}
          dataLength={dataLength}
          currentPage={currentPage}
        />
      </div>

      <div className="data-table_below_container">
        <div className="data-table_below_left_container">

          <div className="data-table_below_showing_entries_container">
            <DisplayShowingEntries
              entriesSelectValue={entriesSelectValue}
              dataLength={dataLength}
              currentPage={currentPage}
            />
          </div>

          <div className="data-table_below_reset_container">
            <button className="data-table_below_reset_button" onClick={() => {onResetData(); onResetSettings()}}>Fait Reset</button>
          </div>

        </div>

        <>
          <Pagination
            totalPageCount={totalPageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            IconLeft={IconLeft}
            IconRight={IconRight}
          />
        </>

      </div>

      {/* TODO delete/modif employee*/}
      
    </div>
  )
}

export default DataTable;

DataTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  itemsPerPage: PropTypes.number,
  onEditRequest: PropTypes.func,
  onChange: PropTypes.func,
  onResetData: PropTypes.func,
  onResetSettings: PropTypes.func,
  resetSettings: PropTypes.bool,
  IconLeft: PropTypes.func,
  IconRight: PropTypes.func,
  itemsSearchSelectValue: PropTypes.string,
};