import React, { forwardRef } from "react";
import { func, element, shape, string } from 'prop-types';

const Modal = forwardRef(function Modal(props, ref) {
  const {
    className,
    style,
    headerText,
    closeModal,
    children,
  } = props

  return <div ref={ref} className={`${className} card modal`} style={style}>
    <div className="card-header" style={{display: "flex"}}>
      {headerText} <span style={{marginLeft: "auto"}} onClick={closeModal}> X </span>
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
  headerText: string
};

Modal.defaultProps = {
  className: "",
  headerText: "",
  closeModal: () => {},
};

export default Modal