import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import CaretAsc from "../assets/icons/Caret_Asc";
import CaretDesc from "../assets/icons/Caret_Desc";
import Pagination from "../atoms/Pagination";


const DisplayDataHeaders = ({
  headers,
  data,
  setData = () => {},
  sort = () => {},
  
  setActiveSortIndex = () => {},
  activeSortIndex,
}) => {

  const [isActiveCaretAsc, setIsActiveCaretAsc] = useState(false);
  const [isActiveCaretDesc, setIsActiveCaretDesc] = useState(false);

  const handleSortClick = useCallback((index, direction) => {

    const entry = headers[index];

    setData(sort(entry, data, direction));
    setActiveSortIndex(index);

    if (direction === 'asc') {
      setIsActiveCaretAsc(isActiveCaretAsc ? false : true)
      setIsActiveCaretDesc(isActiveCaretAsc ? true : false)
      
    } else if (direction === 'desc'){
      setIsActiveCaretDesc(isActiveCaretDesc ? false : true)
      setIsActiveCaretAsc(isActiveCaretDesc ? true : false)
    }
  }, [
    headers,
    data,
    setData,
    sort,
    setActiveSortIndex,
    isActiveCaretAsc,
    isActiveCaretDesc,
    setIsActiveCaretAsc,
    setIsActiveCaretDesc
  ])
  
  
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

DisplayDataHeaders.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object),
  setData: PropTypes.func,
  setActiveSortIndex: PropTypes.func,
  sort: PropTypes.func,
  activeSortIndex: PropTypes.number,
  isActiveCaretAsc: PropTypes.bool,
  isActiveCaretDesc: PropTypes.bool,
  setIsActiveCaretAsc: PropTypes.func,
  setIsActiveCaretDesc: PropTypes.func,
};


const DisplayShowingEntries = ({selectValue, dataLength, currentPage}) => {
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
}

DisplayShowingEntries.propTypes = {
  selectValue: PropTypes.number,
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


const DisplayDataContents = ({data, selectValue, dataLength, currentPage}) => {
  return (
    <DataContents
      data={(selectValue >= dataLength) ? data : data.slice((currentPage - 1) * selectValue, currentPage * selectValue )}
    />)
}

DisplayDataContents.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  selectValue: PropTypes.number,
  dataLength: PropTypes.number,
  currentPage: PropTypes.number,
};



const DataTable = ({
  headers,
  data,
  // onEditRequest = () => {},
  // onChange = () => {},
  onResetData = () => {},
  onResetSettings = () => {},
  resetSettings = false,
  itemsPerPage = 5,
  IconLeft = ()=>{return (<></>)},
  IconRight = ()=>{return (<></>)},
}) => {


  const searchRef = useRef({value:""})
  const [displayData, setDisplayData] = useState(data);
  const [activeSortIndex, setActiveSortIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectValue, setSelectValue] = useState(itemsPerPage);
  const [dataLength, setDataLength] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const [lastSearch, setLastSearch] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(0);


  const setResetSettings = useCallback(() => {
    setActiveSortIndex(null);
    setCurrentPage(1);
    setSelectValue(itemsPerPage);
    searchRef.current && (searchRef.current.value = "")
    setDisplayData(data);
  }, [
    itemsPerPage,
    setActiveSortIndex,
    setCurrentPage,
    setSelectValue,
    setDisplayData,
    data,
  ]);

  

  //TODO sort issue when click for the second time after refresh nothing happend and after sort is inverted 
  //TODO save sort when filtering
  const sort = useCallback((entry, data, sortBy='asc') => {

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

      } else {
        return [...data].sort((a, b) => (a[key].localeCompare(b[key])) * (sortBy === "desc" ? -1 : 1))
      }

  },[]);


  const searchEmployeeDebounced = useCallback((e) => {
    const value = e.target.value.toLowerCase();
    if (value === lastSearch) return;

    setDisplayData(data.filter((employee) => 
        //TODO dropdown for search by headers or keywords
        //TODO REGEX
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
    ))
    setLastSearch(value);

  }, [data, setDisplayData, lastSearch, setLastSearch]);
  
  const searchEmployee = useCallback((e) => {
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    setSearchTimeout(
      setTimeout(() => {
        searchEmployeeDebounced(e);
        setSearchTimeout(0);
      }, 500)
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
    setTotalPageCount(Math.ceil(dataLength / selectValue));
  }, [dataLength ,selectValue, setTotalPageCount]);

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
            value={selectValue}
            onChange={(e) => setSelectValue(+e.target.value)}
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
          <input
            ref={searchRef}
            id="data-table_search"
            type="text" 
            placeholder=""
            onChange={(e) => searchEmployee(e)}
          />
        </div>
      </div>

      <div className="data-table_titles_container">
        <DisplayDataHeaders
          headers={headers}
          data={displayData}
          setData={setDisplayData}
          setActiveSortIndex={setActiveSortIndex}
          sort={sort}
          activeSortIndex={activeSortIndex}
        />
      </div>

      <div className="data-table_content-lines_container">
        <DisplayDataContents
          data={displayData}
          selectValue={selectValue}
          dataLength={dataLength}
          currentPage={currentPage}
        />
      </div>

      <div className="data-table_below_container">
        <div className="data-table_below_left_container">

          <div className="data-table_below_showing_entries_container">
            <DisplayShowingEntries
              selectValue={selectValue}
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
};