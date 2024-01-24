import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';

// TODO <modal pro
const Modal = ({closeModal}) => {
  
  // TODO in parent component?
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  }, [closeModal]);

  //TODO focus on modal but background can't be clicked or tabbed for working
  // useEffect(() => {
  //   const modalDOMElement = document.getElementById('create-employee_modal');
  //   if (modalDOMElement) {
  //     modalDOMElement.focus();
  //   }
  // }, []);

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