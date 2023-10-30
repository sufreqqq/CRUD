import React from 'react'
import classes from './Modal.module.css'
import Button from '../Button/Button'

const Modal = ({children, active, setActive, onClose}) => {

  return (
    <>
      {active && (
        <div
          className={classes.Modal}
          onClick={() => {setActive(false); onClose()}}
        >
          <div
            className={classes.ModalContent}
            onClick={(e) => e.stopPropagation()}
          >{children}</div>
        </div>
      )}
    </>
  );
}

export default Modal