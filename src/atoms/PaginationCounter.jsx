import { useCallback, useContext } from "react";
import Context from "../context/Context";


const PaginationCounter = () => {

  const {state, dispatch} = useContext(Context);

  const {currentPage, totalPageCount} = state;

  const setCurrentPage = useCallback((payload = 1) => dispatch({type: "SET_CURRENT_PAGE", payload}), [dispatch]);
    
  const dots = '...';
  const siblingCount = 2;
  const leftSiblingRange = Math.max(currentPage - siblingCount, 1); // throw max value if currentPage - siblingCount < 1
  const rightSiblingRange = Math.min(currentPage + siblingCount, totalPageCount); // throw min value if currentPage + siblingCount > totalPageCount
  const hasLeftDots = leftSiblingRange > 2; // if leftSiblingRange > 2 then we have left dots
  const hasRightDots = (totalPageCount - rightSiblingRange) > 1; // if (totalPageCount - rightSiblingRange) > 1 then we have right dots
  

  const range = (start, end) => {
    const length = (end - start + 1);
    return Array(length).fill().map((_, index) => start + index) 
  };


  
  //START COMPONENT RETURN

  if(!totalPageCount) {
    return

  } else if (totalPageCount <= 5) {
    return range(1, totalPageCount).map( page => (
      <button 
        key={`pagination_button_${page}`} 
        className= {`data-table_showing_pagination_button_${currentPage === page ? 'current' : 'not-current'}`}
        onClick={() => setCurrentPage(page)}
      >
        {page}
      </button>
    ))

  } else {
    return (
      <>
        <button 
          className= {`data-table_showing_pagination_button_${currentPage === 1 ? 'current' : 'not-current'}`}
          onClick={() => setCurrentPage(1)}
        >
          1
        </button>

        {hasLeftDots && dots}

        {range(leftSiblingRange, rightSiblingRange).map( page => (

          (page !== 1 && page !== totalPageCount) && ( //condition for not display 1 and totalPageCount
            <button 
              key={`pagination_button_${page}`} 
              className= {`data-table_showing_pagination_button_${currentPage === page ? 'current' : 'not-current'}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          )
        ))}

        {hasRightDots && dots}

        <button 
            className= {`data-table_showing_pagination_button_${currentPage === totalPageCount ? 'current' : 'not-current'}`}
            onClick={() => setCurrentPage(totalPageCount)}
          >
            {totalPageCount}
        </button>
      </>
    )
  }
}

export default PaginationCounter;