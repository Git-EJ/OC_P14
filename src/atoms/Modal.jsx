import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';

// TODO MUI modal
const Modal = ({closeModal}) => {
  

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  }, [closeModal]);


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (

    <div className="modal_container" 
      id='create-employee_modal' 
      tabIndex={-1} 
      onKeyDown={handleKeyDown}
    >
      <div className="modal_text">Employee successfully Created!</div>
      <div className="modal_close-button"  onClick={closeModal} >X</div>
      <div className="modal_close-button_label">close</div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired
};