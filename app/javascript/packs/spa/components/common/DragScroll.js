import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';

const { func, element, shape, string } = PropTypes;

DragScroll.propTypes = {
  onPointerDown: func,
  onPointerUp: func,
  onPointerMove: func,
  children: element,
  style: shape({}),
  className: string,
};

DragScroll.defaultProps = {
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
};

export default function DragScroll(props) {
  const {
    onPointerDown,
    onPointerUp,
    onPointerMove,
    children,
    style,
    className
  } = props

  const ourRef = useRef(null);
  const mouseCoords = useRef({
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0
  });

  const [isDragging, setisDragging] = useState(false);

  const handlePointerDown = (e) => {
    if (!ourRef.current) return
    const slider = ourRef.current.children[0];
    const startX = e.pageX - slider.offsetLeft;
    const startY = e.pageY - slider.offsetTop;
    const scrollLeft = slider.scrollLeft;
    const scrollTop = slider.scrollTop;
    mouseCoords.current = { startX, startY, scrollLeft, scrollTop }
    setisDragging(true)
    document.body.style.cursor = "grabbing"

    onPointerDown(e)
  }

  const handlePointerUp = (e) => {
    setisDragging(false)
    if (!ourRef.current) return
    document.body.style.cursor = "default"

    onPointerUp(e)
  }

  const handlePointerMove = (e) => {
    if (!isDragging || ! ourRef.current) return;
    e.preventDefault();
    const slider = ourRef.current.children[0];
    const x = e.pageX - slider.offsetLeft;
    const y = e.pageY - slider.offsetTop;
    const walkX = (x - mouseCoords.current.startX) * 1.5;
    const walkY = (y - mouseCoords.current.startY) * 1.5;
    slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
    slider.scrollTop = mouseCoords.current.scrollTop - walkY;

    onPointerMove(e)
  }

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
    }
  }, []);

  return (
    <div
      ref={ourRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      // onMouseEnter={() => {document.body.style.cursor = "grab"}}
      // onMouseLeave={() => {document.body.style.cursor = "default"}}
      className={className + " flex overflow-x-scroll"}
      style={style}
    >
      {children}
    </div>
  );
};
