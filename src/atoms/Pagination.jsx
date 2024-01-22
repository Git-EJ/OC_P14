import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

//TODO input entry for currentPage choice
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
  totalPageCount,
  currentPage,
  setCurrentPage,
  IconLeft=null,
  IconRight=null,
}) => {
  
  //for input value update
  const [inpuValue, setInputValue] = useState(currentPage);
  const [inputTimeout, setInputTimeout] = useState(0);

  useEffect(() => {
    setInputValue(currentPage);
  }, [currentPage, totalPageCount]);


  const onPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, setCurrentPage]);
  

  const onNextPage = useCallback(() => {
    if (currentPage < totalPageCount) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPageCount, setCurrentPage]);


  const onJumpPageDebounced = useCallback((value) => {
    if (!isNaN(value) && value > 0 && value <= totalPageCount) {
      setCurrentPage(value);
    }
  }, [totalPageCount, setCurrentPage]);


  const onJumpPage = useCallback((e) => {
    const value = +e.target.value;
    setInputValue(value > totalPageCount ? '' : value); //allow user to enter value < totalPageCount
    
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
    if (e.key === 'ArrowRight') {
      onNextPage();
    } else if (e.key === 'ArrowLeft') {
      onPreviousPage();
    }
  }, [onNextPage, onPreviousPage]);

  const onBlurPage = useCallback((e) => {
    if(e.target.value === '') {
      setInputValue(currentPage);
    }
  }, [currentPage]);

  useEffect(() => {
    console.log('Pagination render-------------------');
    console.log('currentPage', currentPage);
    console.log('totalPageCount', totalPageCount);
    console.log('inputValue', inpuValue);
    console.log('inputTimeout', inputTimeout);
    console.log('Pagination render-------------------');
  }, [currentPage, totalPageCount, inpuValue, inputTimeout]);

  return (
    <div className="pagination_container">

      <div className="pagination_jump_container">
        <div className="pagination_jump_text-label">
          <label htmlFor='Jump to Page'>Jump to page:</label>
          <p>value = {totalPageCount === 0 ? '' : `1 to ${totalPageCount}`}</p>
        </div>

        {/* TODO Regex */}
        <input type="number"
          id="Jump to Page"
          min="1" 
          max={totalPageCount} 
          value={inpuValue === 0 ? '' : inpuValue}
          onChange={(e) => onJumpPage(e)}
          onKeyDown={(e) => onKeyDownPage(e)}
          onBlur={(e) => onBlurPage(e)}
          onFocus={(e) => e.target.select()} //user can enter value without delete the current value
        />
      </div>

      <div className="pagination_buttons_container">
        <button className="pagination_button_previous" onClick={totalPageCount === 0 ? null : onPreviousPage}>
          {currentPage === 1 ? null : IconLeft ? <IconLeft /> : "<"}
        </button>
 
        <Counter
          currentPage={currentPage}
          totalPageCount={totalPageCount}
          onPageChange={setCurrentPage}
        />
        <button className="pagination_button_next" onClick={totalPageCount === 0 ? null : onNextPage}>
          {currentPage === totalPageCount ? null : IconRight ? <IconRight /> : ">"}
        </button>
      </div>
    </div>
  )
}

Pagination.propTypes = {
  totalPageCount: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
  IconLeft: PropTypes.func,
  IconRight: PropTypes.func,
}

export default Pagination;