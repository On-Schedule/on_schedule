import React, { forwardRef } from "react";
import { func, element, shape, string, array, oneOfType } from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from '@fortawesome/free-solid-svg-icons'

const Modal = forwardRef(function Modal(props, ref) {
  const {
    className = "",
    style = {},
    headerText = "",
    requiredModal = false,
    closeModal,
    children,
  } = props

  const modalStyles = () => {
    if (requiredModal){
      return {height: "100vh", width: "100vw", backgroundColor: "#00000050", position: "fixed", top: "0", left: "0", zIndex: "5000"}
    } else {
      return {}
    }
  }

  return <div ref={ref} style={modalStyles()}>
    <div className={`${className} card modal`} style={style}>
      <div className="card-header" style={{display: "flex", paddingRight: "calc(1rem - 5px"}}>
        {headerText}
        <span className="exit-modal" style={{marginLeft: "auto", padding: "0 5px"}} onClick={closeModal}>
          <FontAwesomeIcon icon={faX} />
        </span>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  </div>
})

Modal.propTypes = {
  className: string,
  style: shape({}),
  children: oneOfType([element, array]),
  closeModal: func.isRequired,
  headerText: string
};

export default Modal
