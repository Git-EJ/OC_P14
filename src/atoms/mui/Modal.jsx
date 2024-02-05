import PropTypes from 'prop-types';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from '@react-spring/web';
import { cloneElement, forwardRef, useCallback, useContext, useEffect, useState } from 'react';
import CreateEmployeeContext from '../../context/createEmployee/CreateEmployeeContext';


const Fade = forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;


  const style = useSpring({ //all window
    from: { 
      opacity: 0,
    },
    to: { 
      opacity: open ? 1 : 0,
    },

    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
        
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });
  return (
    <animated.div ref={ref} style={style} {...other} >
      {cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  onClick: PropTypes.func,
  ownerState: PropTypes.object,
};

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };


const SpringModal = ({prefix, anim1, anim2, text}) => {

  const { state: createEmployeeState, dispatch: createEmployeeDispatch } = useContext(CreateEmployeeContext);
  const setIsModalOpen = useCallback((payload) => { createEmployeeDispatch({ type: "SET_IS_MODAL_OPEN", payload }) }, [createEmployeeDispatch]);
  const { isModalOpen } = createEmployeeState;
  
  const [modalOpenForTooLong, setModalOpenForTooLong] = useState(false);

  
  const handleClose = () => setIsModalOpen(false);

  useEffect(() => {
    if (isModalOpen) {
      const timer = setTimeout(() => {
        setModalOpenForTooLong(true);
      },process.env.NODE_ENV === "development" ? 3000 : 10000);
      return () => clearTimeout(timer);
    }
  }, [isModalOpen]);


  return (
    <>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={isModalOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        {/* <Fade in={isModalOpen} sx={style}>  */}
        <Fade in={isModalOpen}> 
          <Box className={modalOpenForTooLong ? `${prefix}_container ${anim1}` : `${prefix}_container` }>
              <Typography id="spring-modal-title" variant="" component="div"> {/*variant = style && component = render in html element*/}
                <div className={`${prefix}_text`}>{`${text}`}</div>
              </Typography>
              <Typography id="spring-modal-description" component="div" sx={{ mt: 0 }} className={modalOpenForTooLong ? `${anim2}` : ""}> {/*sx = margin-top */}
                <div className={`${prefix}_close-button`} onClick={handleClose} >X</div>
                <div className={`${prefix}_close-button_label`}>close</div>
              </Typography>
            {/* </div> */}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default SpringModal;

SpringModal.propTypes = {
  prefix: PropTypes.string.isRequired,
  anim1: PropTypes.string,
  anim2: PropTypes.string,
  text: PropTypes.string.isRequired,
};