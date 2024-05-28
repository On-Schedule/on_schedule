import React, { forwardRef } from "react";
import { func, element, shape, string } from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from '@fortawesome/free-solid-svg-icons'

const Modal = forwardRef(function Modal(props, ref) {
  const {
    className = "",
    style = {},
    headerText = "",
    closeModal,
    children,
  } = props

  return <div ref={ref} className={`${className} card modal`} style={style}>
    <div className="card-header" style={{display: "flex"}}>
      {headerText}
      <span style={{marginLeft: "auto"}} onClick={closeModal}>
        <FontAwesomeIcon icon={faX} />
      </span>
    </div>
    <div className="card-body">
      {children}
    </div>
  </div>
})

Modal.propTypes = {
  className: string,
  style: shape({}),
  children: element,
  closeModal: func.isRequired,
  headerText: string
};

export default Modal
