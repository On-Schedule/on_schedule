import React, { useState, useRef, useEffect, useCallback } from "react";
import { func, element, shape, string } from 'prop-types';

DragScroll.propTypes = {
  onPointerDown: func,
  onPointerUp: func,
  onPointerMove: func,
  children: element,
  style: shape({}),
  className: string,
};

export default function DragScroll(props) {
  const {
    onPointerDown = ()=>{},
    onPointerUp = ()=>{},
    onPointerMove = ()=>{},
    children,
    style = {},
    className = "",
    scrollElementRef
  } = props

  const mouseCoords = useRef({
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    scrollTop: 0
  });

  const [isDragging, setisDragging] = useState(false);

  const handlePointerDown = (e) => {
    if (!scrollElementRef.current) return
    const slider = scrollElementRef.current;
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
    if (!scrollElementRef.current) return
    document.body.style.cursor = "default"

    onPointerUp(e)
  }

  const handlePointerMove = (e) => {
    if (!isDragging || ! scrollElementRef.current) return;
    e.preventDefault();
    const slider = scrollElementRef.current;
    const x = e.pageX - slider.offsetLeft;
    const y = e.pageY - slider.offsetTop;
    const walkX = (x - mouseCoords.current.startX) * 1.5;
    const walkY = (y - mouseCoords.current.startY) * 1.5;
    slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
    slider.scrollTop = mouseCoords.current.scrollTop - walkY;

    onPointerMove(e)
  }

    const preventDefault = useCallback((e) => {
      e.preventDefault()
    }, [])

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
    }
  }, []);

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onMouseEnter={() => {window.addEventListener('pointerdown', preventDefault)}}
      onMouseLeave={() => {window.removeEventListener('pointerdown', preventDefault)}}
      className={className + " flex overflow-x-scroll"}
      style={style}
    >
      {children}
    </div>
  );
};
