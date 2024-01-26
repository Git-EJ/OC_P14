import PropTypes from "prop-types";
import { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import DisplayDataHeaders from "../atoms/dataTable/DisplayHeaders";
import Pagination from "../atoms/Pagination";
import DisplayShowingEntries from "../atoms/dataTable/DisplayShowingEnrtries";
// const DisplayDataContents = lazy(() => import("../atoms/dataTable/DataContents"))

//TODO DEV timeout
const DisplayDataContents = lazy(() => 
new Promise(resolve => {
  setTimeout(() => resolve(import("../atoms/dataTable/DataContents")), 2000);
})
);

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

  

  const [dataLength, setDataLength] = useState(0);
  
  const [displayData, setDisplayData] = useState(data);
  const [dataDisplayLength, setDataDisplayLength] = useState(0);
  
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [entriesSelectValue, setEntrieSelectValue] = useState(itemsPerPage);
  
  const [sortingState, setSortingState] = useState({ activeSortIndex: null, direction: null, });
  const [isSorting, setIsSorting] = useState(false);
  const [sortedData, setSortedData] = useState(data);
  
  const searchRef = useRef({value:""})
  const [searchSelectValue, setSearchSelectValue] = useState(itemsSearchSelectValue);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [lastSearch, setLastSearch] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(0);
  const [fileteredData, setFilteredData] = useState(data);

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
    setIsSorting(false);
    setSearchSelectValue(itemsSearchSelectValue);
    setSearchInputValue('');
  }, [
    setDisplayData,
    data,
    setCurrentPage,
    setEntrieSelectValue,
    itemsPerPage,
    setLastSearch,
    setSortingState,
    setIsSorting,
    setSearchSelectValue,
    setSearchInputValue,
    itemsSearchSelectValue,

  ]);

  //TODO .trim on input
  //TODO clean input search, sort when change selectSearch
  //TODO clean sort when search
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
    setIsSorting(true);

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

  }, [sort, headers, data, setSortingState, setIsSorting, setDisplayData]);


  useEffect(() => {
    if (searchInputValue === '' && isSorting) {
      setSortingState({
        activeSortIndex: null,
        direction: null,
      });
      setIsSorting(false);
    }
  }, [searchInputValue, isSorting, setSortingState, setIsSorting]);




  const searchBySelectValue = useCallback((value, entry) => {
    if (searchSelectValue === 'all') return Object.keys(entry).some((key) => entry[key].toLowerCase().includes(value));
    return entry[searchSelectValue].toLowerCase().includes(value)
    },[searchSelectValue]); 


  //TODO REGEX
  const searchEntryDebounced = useCallback((e) => {

    const value = e.target.value.toLowerCase().trim();
    setSearchInputValue(value);
    
    if (value === lastSearch){
      return;

    } else {
      setDisplayData((searchSelectValue === 'all') ?
        data.filter(entry => Object.keys(entry).some((key) => entry[key].toLowerCase().includes(value)))
      :
        data.filter(entry => entry[searchSelectValue].toLowerCase().includes(value))
      )
    }
      
    setLastSearch(value);
  }, [lastSearch, setLastSearch, data, setDisplayData, searchSelectValue]);
  
  useEffect(() => {
    setDisplayData(data.filter((entry) => searchBySelectValue(lastSearch, entry)))
  }, [data, searchBySelectValue, lastSearch, setDisplayData]);


  const searchEntry = useCallback((e) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(
      setTimeout(() => {
        searchEntryDebounced(e);
        setSearchTimeout(0);
      }, 500)
    )
  }, [searchEntryDebounced, searchTimeout]);


  const onSearchSelectChange = useCallback((e) => {
    setSearchSelectValue(e.target.value);
    // searchRef.current && (searchRef.current.value = "") //for clear input search
    setCurrentPage(1);
  }, [setSearchSelectValue]);
  

  const onEntriesSelectChange = useCallback((e) => {
    setCurrentPage(1);
    setEntrieSelectValue(+e.target.value);
  }, [setCurrentPage, setEntrieSelectValue]);



  // on mount
  useEffect(() => {
    setDataLength(data.length);
    if (data && data.length > 0) {
      setDisplayData(data);
    }
  }, [data, setDisplayData]);

  useEffect(() => {
    setDataDisplayLength(displayData.length);
  }, [displayData, setDataDisplayLength]);
  
  useEffect(() => {
    setTotalPageCount(Math.ceil(dataDisplayLength / entriesSelectValue));
  }, [dataDisplayLength ,entriesSelectValue, setTotalPageCount]);

  useEffect(() => {
    setResetSettings();
  }, [resetSettings, setResetSettings]);


  //DEV console.Log
  useEffect(() => {
    console.log('currentPage', currentPage)
    console.log('dataDisplayLength', dataDisplayLength)
    console.log('totalPageCount', totalPageCount)
    console.log('entriesSelectValue', entriesSelectValue)
    console.log('displayData', displayData)
    console.log('lastSearch', lastSearch)
    console.log('searchSelectValue', searchSelectValue)
    console.log('sortingState', sortingState)
    console.log('searchTimeout', searchTimeout)
  }, [currentPage, totalPageCount, entriesSelectValue, dataDisplayLength, displayData, lastSearch, searchSelectValue, sortingState, searchTimeout]);




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
            // onChange={(e) => setEntrieSelectValue(+e.target.value)}
            onChange={onEntriesSelectChange}
            {...(totalPageCount === 0 ? {disabled: true} : null)}
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
              {...(dataLength === 0 ? {disabled: true} : null)}
              // onChange={(e) => setSearchSelectValue(e.target.value)}
              onChange={onSearchSelectChange}
            >
              <option value="all">All</option>
              {headers.map((header, i) => (
                <option key={`searchSelect_${i}_${header.key}`} value={header.key}>{header.value}</option>
              ))}
            </select>
          </div>

          <div className="data-table_options_search_input">
            <label htmlFor="data-table_search-input">Search:</label>
            <input
              ref={searchRef}
              id="data-table_search-input"
              type="text" 
              placeholder=""
              onChange={(e) => searchEntry(e)}
              {...(dataLength === 0 ? {disabled: true} : null)}
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
        <Suspense fallback={
          <div className="data-table_content-lines_container_loading_container">
            <p >Loading</p>
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </div>
        }>
          <DisplayDataContents
            dataDisplayLength={dataDisplayLength}
            data={displayData}
            entriesSelectValue={entriesSelectValue}
            currentPage={currentPage}
          />

        </Suspense>
      </div>

      <div className="data-table_below_container">
        <div className="data-table_below_left_container">

          <div className="data-table_below_showing_entries_container">
            <DisplayShowingEntries
              dataDisplayLength={dataDisplayLength}
              entriesSelectValue={entriesSelectValue}
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

      {/* TODO delete/modif entry*/}
      
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