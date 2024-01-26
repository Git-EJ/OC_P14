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
  const [displayDataLength, setDisplayDataLength] = useState(0);
  
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  
  const [entriesSelectValue, setEntrieSelectValue] = useState(itemsPerPage);
  
  const [sortingState, setSortingState] = useState({ activeSortIndex: null, direction: null, });
  const [isSorting, setIsSorting] = useState(false);
  const [sortedData, setSortedData] = useState(null);
  
  const searchRef = useRef({value:""})
  const [searchSelectValue, setSearchSelectValue] = useState(itemsSearchSelectValue);
  const [searchInputValue, setSearchInputValue] = useState('');
  const [lastSearch, setLastSearch] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(0);
  const [isFiltering, setIsFiltering] = useState(false);
  const [fileteredData, setFilteredData] = useState(null);

  const [filteredAndSortedData, setFilteredAndSortedData] = useState(null);

  const setResetSettings = useCallback(() => {
    setDisplayData(data);
    setSortedData(null);
    setFilteredData(null);
    setFilteredAndSortedData(null);
    
    setCurrentPage(1);

    setEntrieSelectValue(itemsPerPage);

    setIsFiltering(false);
    setSearchInputValue('');
    searchRef.current && (searchRef.current.value = "")
    setSearchSelectValue(itemsSearchSelectValue);
    setLastSearch('');

    setIsSorting(false);
    setSortingState({
      activeSortIndex: null,
      direction: null,
    });
  }, [
    data,
    setDisplayData,
    setSortedData,
    setFilteredData,
    setFilteredAndSortedData,
    setCurrentPage,
    setEntrieSelectValue,
    itemsPerPage,
    setIsFiltering,
    setSearchInputValue,
    searchRef,
    setSearchSelectValue,
    setLastSearch,
    itemsSearchSelectValue,
    setIsSorting,
    setSortingState,
  ]);


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

    if (displayDataLength === 0) {
      return;

    } else {
      setIsSorting(true);
    
      setSortingState(prevState => {

        if (prevState.activeSortIndex === index) {
          const newDirection = prevState.direction === 'asc' ? 'desc' : 'asc'
        
          isFiltering ? 
            setFilteredAndSortedData(sort(headers[index], filteredAndSortedData ? filteredAndSortedData : fileteredData, newDirection))
          :
            setSortedData(sort(headers[index], data, newDirection));
    
          return {
            ...prevState,
            direction: newDirection,
          };

        } else {
          isFiltering ?
            setFilteredAndSortedData(sort(headers[index], filteredAndSortedData ? filteredAndSortedData : fileteredData, direction))
          :
            setSortedData(sort(headers[index], data, direction));
    
          return {
            activeSortIndex: index,
            direction,
          };
        }
      });
    }

  }, [sort, headers, data, fileteredData, isFiltering, filteredAndSortedData, displayDataLength]);//TODO DEV console.log


  const searchBySelectValue = useCallback((value, entry) => {
    if (searchSelectValue === 'all') return Object.keys(entry).some((key) => entry[key].toLowerCase().includes(value));
    return entry[searchSelectValue].toLowerCase().includes(value)
    },[searchSelectValue]); 


  //TODO REGEX
  const searchEntryDebounced = useCallback((e) => {

    const value = e.target.value.toLowerCase().trim();
    console.log('%c' + value.toUpperCase(), 'color: red');

    setSearchInputValue(value);

    if(value === '') {
      setIsFiltering(false);
      setCurrentPage(1);
      // return;
    }
    
    if (value === lastSearch) {
      return;

    } else {
      setIsFiltering(true);
      setIsSorting(false);
      setSortingState({
        activeSortIndex: null,
        direction: null,
      });
      
      setFilteredData((searchSelectValue === 'all') ?
        data.filter(entry => Object.keys(entry).some((key) => entry[key].toLowerCase().includes(value)))
      :
        data.filter(entry => entry[searchSelectValue].toLowerCase().includes(value))
      )
    }
      
    setLastSearch(value);
  }, [lastSearch, setLastSearch, data, setFilteredData, searchSelectValue]);
  

  //TODO WHEN filtering and do SORT data can't be filtered by select
  useEffect(() => {  
    setFilteredData(data.filter((entry) => searchBySelectValue(lastSearch, entry)))
  }, [data, searchBySelectValue, lastSearch, setFilteredData]);


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
    // searchRef.current && (searchRef.current.value = "") //TODO for clear input search when select chage
    setCurrentPage(1);
  }, [setSearchSelectValue]);
  

  const onEntriesSelectChange = useCallback((e) => {
    setCurrentPage(1);
    setEntrieSelectValue(+e.target.value);
  }, [setCurrentPage, setEntrieSelectValue]);



  useEffect(() => {

    if (data && data.length > 0) {
      if (isSorting && !isFiltering) {
        console.log('%c DD===sortedData', 'color: orange; font-size:2rem', sortedData)
        setDisplayData(sortedData);
        setFilteredData(null);
        setFilteredAndSortedData(null);
      } else if(isFiltering && !isSorting) {
        console.log('%c DD===filteredData', 'color: pink; font-size:2rem', fileteredData)
        setDisplayData(fileteredData);
        setSortedData(null);
        setFilteredAndSortedData(null);
      } else if(isFiltering && isSorting) {
        console.log('%c DD=== filteredAndSortedData', 'color: lime; font-size:2rem', filteredAndSortedData)
        setDisplayData(filteredAndSortedData);
        setSortedData(null);
        setFilteredData(null);
      } else if(searchInputValue === '' ) {
        console.log('%c DD=== data', 'color: cyan; font-size:2rem', data);
        setDisplayData(data);
        setFilteredData(null);
        setSortedData(null);
        setFilteredAndSortedData(null);
      } else {
        console.log('%c DD=== data','color: purple; font-size:2rem', data)
        setDisplayData(data);
        setFilteredData(null);
        setSortedData(null);
        setFilteredAndSortedData(null);
      }
    }
  },[isSorting, isFiltering, data, sortedData, fileteredData, headers, sortingState, filteredAndSortedData, searchInputValue]);


  useEffect(() => {
    if (data && displayData) {
      setDataLength(data.length);
      setDisplayDataLength(displayData.length);
    } 
  }, [data, displayData]);
  
  useEffect(() => {
    setTotalPageCount(Math.ceil(displayDataLength / entriesSelectValue));
  }, [displayDataLength ,entriesSelectValue, setTotalPageCount]);

  useEffect(() => {
    if (searchInputValue === '') {
      setSortingState({
        activeSortIndex: null,
        direction: null,
      });
      setIsSorting(false);
      setIsFiltering(false);
      setCurrentPage(1)
    }
  }, [searchInputValue]);

  useEffect(() => {
    setResetSettings();
  }, [resetSettings, setResetSettings]);


  //DEV console.Log
  useEffect(() => {
    console.log('DataTable rendered')
    // console.log('currentPage', currentPage)
    console.log('dataLength', dataLength)
    console.log('displayDataLength', displayDataLength)
    // console.log('totalPageCount', totalPageCount)
    // console.log('entriesSelectValue', entriesSelectValue)
    // console.log('data', data)
    // console.log('displayData', displayData)
    console.log('lastSearch', lastSearch)
    console.log('searchSelectValue', searchSelectValue)
    console.log('searchInputValue', searchInputValue)
    // console.log('sortingState', sortingState)
    // console.log('searchTimeout', searchTimeout)
    console.log('isFiltering', isFiltering)
    console.log('fileteredData', fileteredData)
    console.log('isSorting', isSorting)
    // console.log('sortedData', sortedData)
    // console.log('filteredAndSortedData', filteredAndSortedData)
    console.log('DataTable rendered')
  }, [currentPage, data, totalPageCount, filteredAndSortedData, entriesSelectValue, searchInputValue, displayDataLength, displayData, lastSearch, dataLength, searchSelectValue, sortingState, searchTimeout, isFiltering, fileteredData, isSorting, sortedData]);




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
              onChange={onSearchSelectChange}
              {...(dataLength === 0 ? {disabled: true} : null)}
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
            displayDataLength={displayDataLength}
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
              displayDataLength={displayDataLength}
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