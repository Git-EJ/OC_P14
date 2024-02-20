import PropTypes from "prop-types";
import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from "react";
import DisplayDataHeaders from "../atoms/dataTable/DisplayHeaders";
import Pagination from "../atoms/dataTable/Pagination";
import DisplayShowingEntries from "../atoms/dataTable/DisplayShowingEnrtries";
import Loading from "../atoms/LoadingAnim";
// const DisplayDataContents = lazy(() => import("../atoms/dataTable/DataContents"))

const PREFIX = "data-table"


//DEV timeout
const DisplayDataContents = lazy(() => 
new Promise(resolve => {
  setTimeout(() => resolve(import("../atoms/dataTable/DataContents")), 2000);
})
);


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
  if (selectedOption === 'all') return Object.keys(row).find((key) => row[key].toLowerCase().includes(value))
  return row[selectedOption].toLowerCase().includes(value)
}


const DataTable = ({
  headers,
  data,
  onEditRequest = () => {},
  onChange = () => {},
  onPageChanged  = () => {},
  onResetData = () => {},
  enableResetSettings = true,
  resetAfterSearch = false,
  itemsPerPage = 5,
  arrayOfItemsPerPage = [1, 5, 10, 50, 100],
  itemsSearchSelectValue = 'all',
  IconLeft = null,
  IconRight = null,
  IconAsc = null,
  IconDesc = null,
  unformatedData = false,
}) => {

  const formatedData = useMemo(() => {
    return unformatedData ? formatData(data, headers) : data
  }, [unformatedData, data, headers]);

  const [displayData, setDisplayData] = useState( formatedData);

  const [config, setConfig] = useState({
    sort: {
      index: null,
      direction: null,
    },
    search: {
      keyword: "",
      option: itemsSearchSelectValue,
    },
    pagination: {
      currentPage: 1,
      entriesPerPage: itemsPerPage,
    },
    lineSelected: -1,
    animated: false,
  });

  useEffect(() => {
    console.log('config', config.search.option)
  }, [config])

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
      },
      lineSelected: -1,
      animated: false,
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


  const setLineSelected = useCallback((line) => {

    if (line === config.lineSelected) {
      setConfig(prevState => ({
        ...prevState,
        lineSelected: -1,
      }))
      return;
    }
    setConfig(prevState => ({
      ...prevState,
      lineSelected: line,
    }))
  }, [setConfig, config.lineSelected]);


  const handleSortClick = useCallback((index, direction) => {

    if (displayData.length === 0) return

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
    
    if (value === lastSearch) return;
    
    if (resetAfterSearch && value === '') {
      handleResetSettings()
      return;
    }
    
    setConfig(prevState => ({
      ...prevState,
      search: {
        ...prevState.search,
        keyword: value,
        option: searchSelectValue,
      },
      pagination: {
        ...prevState.pagination,
        currentPage: 1
      }
    }))

    setLastSearch(value);
    
  }, [lastSearch, handleResetSettings, searchSelectValue, resetAfterSearch]);
  
  
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
      },
    }))
    setSearchSelectValue(e.target.value);
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


  const resetIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height="16" width="16">
      {/* <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--> */}
      <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/>
    </svg>
    )
  };
  

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

  }, [formatedData, config.search, config.sort, headers]);


  //for reset button animation
  useEffect(() => {
   const resetTimeout = setTimeout(() => {
      if (config.animated) {
        setConfig(prevState => ({
          ...prevState,
          animated: false,
        }))
      }
    }, 500);
    return () => clearTimeout(resetTimeout);
  }, [config.animated]);

  
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
            {arrayOfItemsPerPage.map((item, i) => (
              <option key={`entriesPerPage_${i}`} value={item}>{item}</option>
            ))}

          </select>
          <label htmlFor={`${PREFIX}_entries`}>entries</label>
        </div>

        <div className={`${PREFIX}_options_right_container`}>

        { enableResetSettings && (
            <div className={`${PREFIX}_options_reset-button_container`}>
              <p>Reset:</p>
              <button
                aria-label="Reset settings" 
                className={`${PREFIX}_options_reset-button_button ${config.animated ? `${PREFIX}_options_reset-button_button_animated` : ''}`} 
                onClick={() => {
                  handleResetSettings(); 
                  onResetData && onResetData(); 
                  setConfig(prevState => ({...prevState, animated: true}))
                }}
              >
              {resetIcon()}
              </button>
            </div>
          )}

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

      <div className={`${PREFIX}_table_container`}>
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
              headers={headers}
              displayDataLength={displayData.length}
              data={displayData}
              entriesSelectValue={config.pagination.entriesPerPage}
              currentPage={config.pagination.currentPage}
              setLineSelected={setLineSelected}
              lineSelected={config.lineSelected}
            />

          </Suspense>
        </div>
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
  arrayOfItemsPerPage: PropTypes.arrayOf(PropTypes.number),
  onEditRequest: PropTypes.func,
  onChange: PropTypes.func,
  onPageChanged: PropTypes.func,
  onResetData: PropTypes.func,
  enableResetSettings: PropTypes.bool,
  resetAfterSearch: PropTypes.bool,
  IconLeft: PropTypes.func,
  IconRight: PropTypes.func,
  IconAsc: PropTypes.func,
  IconDesc: PropTypes.func,
  itemsSearchSelectValue: PropTypes.string,
  unformatedData: PropTypes.bool,
};