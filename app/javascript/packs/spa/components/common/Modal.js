import React, { forwardRef } from "react";
import { func, element, shape, string } from 'prop-types';

const Modal = forwardRef(function Modal(props, ref) {
  const {
    className,
    style,
    children,
    closeModal,
    modalHeader
  } = props

  return <div ref={ref} className={`${className} card modal-base`} style={style}>
    <div className="card-header" style={{display: "flex"}}>
      {modalHeader} <span style={{marginLeft: "auto"}} onClick={closeModal}> X </span>
    </div>
    <div className="card-body" >
      {children}
    </div>
  </div>
})

Modal.propTypes = {
  className: string,
  style: shape({}),
  children: element,
  closeModal: func,
  modalHeader: string
};

Modal.defaultProps = {
  className: "",
  closeModal: () => {},
  modalHeader: ""
};

export default Modal