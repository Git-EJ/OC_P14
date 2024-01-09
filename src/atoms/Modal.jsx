import PropTypes from 'prop-types';


const Modal = ({closeModal}) => {

  return (

    <div className="modal_container">
      <div className="modal_text">Employee successfully Created!</div>
      <div className="modal_close-button" onClick={closeModal}>X</div>
      <div className="modal_close-button_label">close</div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired
};