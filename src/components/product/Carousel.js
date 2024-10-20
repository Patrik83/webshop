import React, { useState } from "react";
import "./Carousel.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useSwipeable } from "react-swipeable";

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = children.length;

  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex(prevState => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
  };

  // Swipeable-handlers
  const handlers = useSwipeable({
    onSwipedUp: next, // Svep uppåt för nästa bild
    onSwipedDown: prev, // Svep nedåt för föregående bild
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // För att stödja swipe med mus
  });

  return (
    <div className="carousel-wrapper" {...handlers}>
      {/* Pil uppåt */}
      {currentIndex > 0 && (
        <button onClick={prev} className="up-arrow">
          <KeyboardArrowUpIcon style={{ fontSize: 48 }} />
        </button>
      )}

      {/* Bild karusell */}
      <div className="carousel-content-wrapper">
        <div
          className="carousel-content"
          style={{
            transform: `translateY(-${currentIndex * 33}%)`
          }}
        >
          {children}
        </div>
      </div>

      {/* Pil neråt */}
      {currentIndex < length - 1 && (
        <button onClick={next} className="down-arrow">
          <KeyboardArrowDownIcon style={{ fontSize: 48 }} />
        </button>
      )}
    </div>
  );
};

export default Carousel;
