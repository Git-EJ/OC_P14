import PropTypes from "prop-types";
import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from "react";
import DisplayDataHeaders from "../atoms/dataTable/DisplayHeaders";
import Pagination from "../atoms/dataTable/Pagination";
import DisplayShowingEntries from "../atoms/dataTable/DisplayShowingEnrtries";
import Loading from "../atoms/LoadingAnim";
const DisplayDataContents = lazy(() => import("../atoms/dataTable/DataContents"))

const PREFIX = "data-table"


// //DEV timeout
// const DisplayDataContents = lazy(() => 
// new Promise(resolve => {
//   setTimeout(() => resolve(import("../atoms/dataTable/DataContents")), 2000);
// })
// );


const formatData = (data, headerIndex) => {
  const nbColumns = headerIndex.length
  const nbEntries = data.length / nbColumns
  const out = new Array(nbEntries)
  for (let i = 0; i < nbEntries; i ++) {
    const obj = {}
    for (let j=0; j<nbColumns; j++) {
      obj[headerIndex[j].key] = data[i*nbColumns+j]
    }
    out[i]= obj
  }
  return out
}

const sort = (entry, data, sortBy='asc') => {

  const onNullable = (a,b) => {
    if( !a ) {
      if (!b) return 0;
      return sortBy === 'desc' ? -1 : 1;
    }
    if( !b ) return sortBy === 'desc' ? 1 : -1;
    return 2;
  }

  const onNullableNumber = (a,b) => {
    if( isNaN(a) ) {
      if (isNaN(b)) return 0;
      return sortBy === 'desc' ? 1 : -1;
    }
    if( isNaN(b) ) return sortBy === 'desc' ? -1 : 1;
    return (a - b) * (sortBy === "desc" ? -1 : 1);
  }

  const key = entry.key;

    if (entry.sort) {
      return [...data].sort((a, b) => {
        // if( !a ) return 1;
        // if( !b ) return -1;
        return entry.sort(a, b, sortBy==='desc' ? -1 : 1) // for future dev (librairy)
      })

    } else if (entry.type === 'number') {
      return [...data].sort((a, b) => onNullableNumber(+a[key],+b[key]))

     
    } else if (entry.type === 'date') {
      return [...data].sort((a, b) => {
       
        const formatDate = (dateStr) => { // date entry format needs to be : 'dd/mm/yyyy'
          const parts = dateStr.split('/');
          return new Date(parts[2], parts[1] - 1, parts[0]); // yyyy, mm, dd => month -1 because month start at 0 in JS
        };
        const nullValue = onNullable(a[key],b[key]);
        if (nullValue!==2) return nullValue;
        const dateA = formatDate(a[key]);
        const dateB = formatDate(b[key]);
    
        return (dateA - dateB) * (sortBy === "desc" ? -1 : 1);
      });

    } else if (entry.type === 'street') {
      return [...data].sort((a, b) => {
        const nullValue = onNullable(a[key],b[key]);
        if (nullValue!==2) return nullValue;

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
      return [...data].sort((a, b) => {
        const nullValue = onNullable(a[key],b[key]);
        if (nullValue!==2) return nullValue;
        return (a[key].localeCompare(b[key])) * (sortBy === "desc" ? -1 : 1)
      })
    }

}

const searchBySelectValue = (selectedOption, value, row) => {
  if (selectedOption === 'all')
    return Object.keys(row).find((key) => row[key].toLowerCase().includes(value))
  return row[selectedOption].toLowerCase().includes(value)
}


const DataTable = ({
  headers,
  data,
  // onEditRequest = () => {},
  // onChange = () => {},
  onPageChanged  = () => {},
  onResetData = () => {},
  onResetSettings = () => {},
  resetSettings = false,
  itemsPerPage = 5,
  itemsSearchSelectValue = 'all',
  IconLeft = null,
  IconRight = null,
  IconAsc = null,
  IconDesc = null,
  unformatedData = false,
}) => {

  const formatedData = useMemo(() => unformatedData ? formatData(data, headers) : data, [unformatedData, data, headers]);
  const [displayData, setDisplayData] = useState( formatedData);
  const [config, setConfig] = useState({
    sort: {
      index: null,
      direction: null,
    },
    search: {
      keyword: "",
      option: "all",
    },
    pagination: {
      currentPage: 1,
      entriesPerPage: itemsPerPage,
    }
  });

  const searchRef = useRef({value:""})
  const [searchSelectValue, setSearchSelectValue] = useState(itemsSearchSelectValue);
  const [lastSearch, setLastSearch] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(0);

  const handleResetSettings = useCallback(() => {
    setDisplayData(formatedData);
    setConfig({
      sort: {
        index: null,
        direction: null,
      },
      search: {
        keyword: "",
        option: "all",
      },
      pagination: {
        currentPage: 1,
        entriesPerPage: itemsPerPage,
      }
    })

    searchRef.current && (searchRef.current.value = "")
    setSearchSelectValue(itemsSearchSelectValue);
    setLastSearch('');

  }, [
    searchRef,
    formatedData, 
    itemsPerPage, 
    itemsSearchSelectValue, 
  ]);



  const setCurrentPage = useCallback((page) => {
    setConfig(prevState => ({
      ...prevState,
      pagination: {
        ...prevState.pagination,
        currentPage: page,
      }
    }))
    onPageChanged && onPageChanged({page}) //for future dev
  }, [setConfig, onPageChanged]);


  const handleSortClick = useCallback((index, direction) => {
    console.log('handleSortClick', index, direction)
    if (displayData.length === 0) return
    console.log('done')
    setConfig(prevState => ({
      ...prevState,
      sort: {
        ...prevState.sort,
        index: index,
        direction: direction,
      }
    }));
  }, [displayData]);


  const searchEntryDebounced = useCallback((e) => {

    const value = e.target.value.toLowerCase().trim();
    console.log('%c' + value.toUpperCase(), 'color: red');
    
    if (value === lastSearch) return;
    
    if (value === '') {
      handleResetSettings()
      return;
    }
    
    setConfig(prevState => ({
      ...prevState,
      search: {
        keyword: value,
        option: searchSelectValue,
      },
      pagination: {
        ...prevState.pagination,
        currentPage: 1
      }
    }))

    setLastSearch(value);
    
  }, [searchSelectValue, lastSearch, handleResetSettings]);
  
  
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
    setConfig(prevState => ({
      ...prevState,
      search: {
        ...prevState.search,
        option: e.target.value,
      },
      pagination: {
        ...prevState.pagination,
        currentPage: 1
      }
    }))
  }, [setConfig]);
  

  const onEntriesSelectChange = useCallback((e) => {
    setConfig(prevState => ({
      ...prevState,
      pagination: {
        ...prevState.pagination,
        entriesPerPage: +e.target.value,
        currentPage: 1
      }
    }))
  }, [setConfig]);

  useEffect(() => {
    let array = [...formatedData];
    const { keyword, option } = config.search;
    const { index, direction } = config.sort;
    
    if (keyword!=="") {
      array = array.filter(row => searchBySelectValue(option, keyword, row));
    }

    if (index !== null) {
      array = sort(headers[index], array, direction);
    }

    setDisplayData(array);
    
  }, [formatedData, config, headers]);
  
  useEffect(() => {
    handleResetSettings();
  }, [resetSettings, handleResetSettings]);




  //START DataTable RETURN
  return (

    <div className={`${PREFIX}_wrapper`}>

      <div className={`${PREFIX}_options_container`}>

        <div className={`${PREFIX}_options_entries`}>
          <label htmlFor={`${PREFIX}_entries`}>Show</label>
          <select 
            id="data-table_entries" 
            value={config.pagination.entriesPerPage}
            onChange={onEntriesSelectChange}
            {...(displayData.length === 0 ? {disabled: true} : null)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50" >50</option>
            <option value="100">100</option>
          </select>
          <label htmlFor={`${PREFIX}_entries`}>entries</label>
        </div>

        <div className={`${PREFIX}_options_search_container`}>

          <div className={`${PREFIX}_options_search_select`}>
            <label htmlFor={`${PREFIX}_search-select`}>Search by:</label>
            <select
              id={`${PREFIX}_search-select`}
              value={config.search.option}
              onChange={onSearchSelectChange}
              {...(formatedData.length === 0 ? {disabled: true} : null)}
            >
              <option value="all">All</option>
              {headers.map((header, i) => (
                <option key={`searchSelect_${i}_${header.key}`} value={header.key}>{header.value}</option>
              ))}
            </select>
          </div>

          <div className={`${PREFIX}_options_search_input`}>
            <label htmlFor={`${PREFIX}_search-input`}>Search:</label>
            <input
              ref={searchRef}
              id={`${PREFIX}_search-input`}
              type="text" 
              placeholder=""
              onChange={(e) => searchEntry(e)}
              {...(formatedData.length === 0 ? {disabled: true} : null)}
            />
          </div>
        </div>
      </div> 

      <div className={`${PREFIX}_titles_container`}>
        <DisplayDataHeaders
          headers={headers}
          sortingState={config.sort}
          handleSortClick={handleSortClick}
          IconAsc={IconAsc}
          IconDesc={IconDesc}
        />
      </div>

      <div className={`${PREFIX}_content-lines_container`}>
        <Suspense fallback={
          <div className={`${PREFIX}_content-lines_container`}>
            <Loading />
          </div>
        }>
          <DisplayDataContents
            displayDataLength={displayData.length}
            data={displayData}
            entriesSelectValue={config.pagination.entriesPerPage}
            currentPage={config.pagination.currentPage}
          />

        </Suspense>
      </div>

      <div className={`${PREFIX}_below_container`}>
        <div className={`${PREFIX}_below_left_container`}>

          <div className={`${PREFIX}_below_showing_entries_container`}>
            <DisplayShowingEntries
              displayDataLength={displayData.length}
              entriesSelectValue={config.pagination.entriesPerPage}
              currentPage={config.pagination.currentPage}
            />
          </div>

          <div className={`${PREFIX}_below_reset_container`}>
            <button className={`${PREFIX}_below_reset_button`} onClick={() => {onResetData && onResetData(); onResetSettings()}}>Fait Reset</button>
          </div>

        </div>

        <>
          <Pagination
            entryCount={displayData.length}
            entriesPerPage={config.pagination.entriesPerPage}
            currentPage={config.pagination.currentPage}
            onPageChange={setCurrentPage}
            IconLeft={IconLeft}
            IconRight={IconRight}
          />
        </>

      </div>
      
    </div>
  )
}

export default DataTable;

DataTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object)||PropTypes.arrayOf(PropTypes.string||PropTypes.number),
  itemsPerPage: PropTypes.number,
  onEditRequest: PropTypes.func,
  onChange: PropTypes.func,
  onPageChanged: PropTypes.func,
  onResetData: PropTypes.func,
  onResetSettings: PropTypes.func,
  resetSettings: PropTypes.bool,
  IconLeft: PropTypes.func,
  IconRight: PropTypes.func,
  IconAsc: PropTypes.func,
  IconDesc: PropTypes.func,
  itemsSearchSelectValue: PropTypes.string,
  unformatedData: PropTypes.bool,
};