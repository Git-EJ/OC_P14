import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";


const Counter = ({
  currentPage,
  totalPageCount,
  onPageChange=()=>{},
}) => {
    
  const dots = '...';
  const siblingCount = 1;
  const leftSiblingRange = Math.max(currentPage - siblingCount, 1); // throw max value if currentPage - siblingCount < 1
  const rightSiblingRange = Math.min(currentPage + siblingCount, totalPageCount); // throw min value if currentPage + siblingCount > totalPageCount
  const hasLeftDots = leftSiblingRange > 2; // if leftSiblingRange > 2 then we have left dots
  const hasRightDots = (totalPageCount - rightSiblingRange) > 1; // if (totalPageCount - rightSiblingRange) > 1 then we have right dots
  

  const range = (start, end) => {
    const length = (end - start + 1);
    return Array(length).fill().map((_, index) => start + index) 
  };



  if(!totalPageCount) {
    return

  } else if (totalPageCount <= 5) {
    return range(1, totalPageCount).map( page => (
      <button 
        key={`pagination_button_${page}`} 
        className= {`pagination_button_${currentPage === page ? 'current' : 'not-current'}`}
        onClick={() => onPageChange(page)}
      >
        {page}
      </button>
    ))

  } else {
    return (
      <>
        <button 
          className= {`pagination_button_${currentPage === 1 ? 'current' : 'not-current'}`}
          onClick={() => onPageChange(1)}
        >
          1
        </button>

        {hasLeftDots && dots}

        {range(leftSiblingRange, rightSiblingRange).map( page => (

          (page !== 1 && page !== totalPageCount) && ( //condition for not display 1 and totalPageCount
            <button 
              key={`pagination_button_${page}`} 
              className= {`pagination_button_${currentPage === page ? 'current' : 'not-current'}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        ))}

        {hasRightDots && dots}

        <button 
            className= {`pagination_button_${currentPage === totalPageCount ? 'current' : 'not-current'}`}
            onClick={() => onPageChange(totalPageCount)}
            >
            {totalPageCount}
        </button>
      </>
    )
  }
}

Counter.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPageCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,
}


const Pagination = ({
  entryCount,
  entriesPerPage,
  currentPage,
  onPageChange=()=>{},
  IconLeft=null,
  IconRight=null,
  handlePageCount=()=>{},
}) => {
  
  //for input value update
  const [inpuValue, setInputValue] = useState(currentPage);
  const [inputTimeout, setInputTimeout] = useState(0);
  const [totalPageCount, setTotalPageCount] = useState(0);

  useEffect(() => {
    setTotalPageCount(Math.ceil(entryCount / entriesPerPage))
  }, [entryCount, entriesPerPage, setTotalPageCount]);
  
  useEffect(() => {
    handlePageCount(totalPageCount);
  }, [totalPageCount, handlePageCount]);
  
  useEffect(() => {
    setInputValue(currentPage);
  }, [currentPage, totalPageCount]);


  const onPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange]);
  

  const onNextPage = useCallback(() => {
    if (currentPage < totalPageCount) {
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPageCount, onPageChange]);


  const onJumpPageDebounced = useCallback((value) => {
    if (!isNaN(value) && value > 0 && value <= totalPageCount) {
      onPageChange(value);
    }
  }, [totalPageCount, onPageChange]);


  const onJumpPage = useCallback((e) => {
    //if user enter value > totalPageCount then input value will be totalPageCount
    const value = +e.target.value.trim() > totalPageCount ? totalPageCount : +e.target.value.trim();
    setInputValue(value);
    
    if (inputTimeout) {
      clearTimeout(inputTimeout);
    }
    setInputTimeout(
      setTimeout(() => {
        onJumpPageDebounced(value);
        setInputTimeout(0);
        e.target.select(); //after timeout user can enter value without delete the current value
      }, 1000)
    );
  }, [inputTimeout, onJumpPageDebounced, totalPageCount, setInputValue]);


  const onKeyDownPage = useCallback((e) => {
    if (e.key === 'ArrowRight' || e.key ==='ArrowUp') {
      onNextPage();
    } else if (e.key === 'ArrowLeft' || e.key ==='ArrowDown') {
      onPreviousPage();
    }
  }, [onNextPage, onPreviousPage]);

  const onBlurPage = useCallback((e) => {
    if(e.target.value === '') {
      setInputValue(currentPage);
    }
  }, [currentPage]);


  const jumpToPageText = () => {
    if (totalPageCount === 0) {
      return "there's no page";
    } else if (totalPageCount === 1) {
      return 'page = 1';
    } else {
      return `pages = 1 to ${totalPageCount}`;
    }
  }

  useEffect(() => {
    if(totalPageCount === 0) {
      setInputValue(0);
    }
  }, [totalPageCount, onPageChange])

  // useEffect(() => {
  //   console.log('currentPage JUMP', currentPage);
  //   console.log('inputValue JUMP', inpuValue);
  // },[inpuValue, currentPage])


  return (
    <div className="pagination_container">

      <div className="pagination_jump_container">
        <div className="pagination_jump_text-label">
          <label htmlFor='Jump_to_Page'>Jump to page:</label>
          <p>{jumpToPageText()}</p>

        </div>
        
        <input type="number"
          id="Jump_to_Page"
          min="1"
          max={totalPageCount} 
          value={inpuValue === 0 ? '' : inpuValue}
          onChange={(e) => onJumpPage(e)}
          onKeyDown={(e) => onKeyDownPage(e)}
          onBlur={(e) => onBlurPage(e)}
          onFocus={(e) => e.target.select()} //user can enter value without delete the current value
          {...(totalPageCount === 0 ? {disabled: true} : null)}
        />
      </div>

      <div className="pagination_buttons_container">
        <button className="pagination_button_previous" onClick={onPreviousPage}>
          {currentPage === 1 || totalPageCount === 0 ? null : IconLeft ? <IconLeft /> : "<"}
        </button>
 
        <Counter
          currentPage={currentPage}
          totalPageCount={totalPageCount}
          onPageChange={onPageChange}
        />
        <button className="pagination_button_next" onClick={onNextPage}>
          {currentPage === totalPageCount || totalPageCount === 0 ? null : IconRight ? <IconRight /> : ">"}
        </button>
      </div>
    </div>
  )
}

Pagination.propTypes = {
  entryCount: PropTypes.number,
  entriesPerPage: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
  IconLeft: PropTypes.func,
  IconRight: PropTypes.func,
  handlePageCount: PropTypes.func,
}

export default Pagination;