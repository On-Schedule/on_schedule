import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const { func, element, shape, string } = PropTypes;

DragMove.propTypes = {
  onDragMove: func.isRequired,
  onPointerDown: func,
  onPointerUp: func,
  onPointerMove: func,
  children: element,
  style: shape({}),
  className: string,
};

DragMove.defaultProps = {
  onPointerDown: () => {},
  onPointerUp: () => {},
  onPointerMove: () => {},
};

export default function DragMove(props) {
  const {
    onPointerDown,
    onPointerUp,
    onPointerMove,
    onDragMove,
    children,
    style,
    className,
  } = props;

  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e) => {
    setIsDragging(true);

    onPointerDown(e);
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);

    onPointerUp(e);
  };

  const handlePointerMove = (e) => {
    if (isDragging) onDragMove(e);

    onPointerMove(e);
  };

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
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}

//   const [translate, setTranslate] = useState({
//     x: 0,
//     y: 0
//   });

//   const handleDragMove = (e) => {
//     setTranslate({
//       x: translate.x + e.movementX,
//       y: translate.y + e.movementY
//     });
//   };

//  <DragMove style={} className="" onDragMove={handleDragMove}>
//    <div style={{transform: `translateX(${translate.x}px) translateY(${translate.y}px)`}}>
//    </div>
//  </DragMove>