import React from 'react';
import styled from 'styled-components';

const StyledSlider = styled.div`
  position: fixed;
  right: 0%;
  top: 0%;
  border-radius: 3px;
  background: #dddddd;
  width: 15px;
  height: 100%;
`;

const StyledThumb = styled.div`
  width: 35px;
  height: 25px;
  border-radius: 3px;
  position: relative;
  top: 15px;
  opacity: 0.5;
  background: #823eb7;
  cursor: pointer;
`;

const getPercentage = (current, max) => (100 * current) / max;

const getLeft = percentage => `calc(${percentage}% - 5px)`;

const Slider = () => {
    const sliderRef = React.useRef();
    const thumbRef = React.useRef();
    const diff = React.useRef();

    const handleMouseMove = event => {
        let newY =
        event.clientY -
        diff.current -
        sliderRef.current.getBoundingClientRect().top;
        

        const end = sliderRef.current.offsetHeight - thumbRef.current.offsetHeight;
        console.log(thumbRef.current.offsetHeight);
        const start = 0;

        if (newY < start) {
            newY = 0;
        }
    
        if (newY > end) {
            newY = end;
        }
        const newPercentage = getPercentage(newY, end);

        thumbRef.current.style.top = getLeft(newPercentage);
      };
    
      const handleMouseUp = () => {
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('mousemove', handleMouseMove);
      };
    
      const handleMouseDown = event => {
        diff.current =
        event.clientY - thumbRef.current.getBoundingClientRect().top;
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      };

      const handleMouseClick = (event) => {
        diff.current =
        event.clientY - thumbRef.current.getBoundingClientRect().top;
      }
    
    
    return (
      <>
        <StyledSlider ref={sliderRef}>
          <StyledThumb ref={thumbRef} onMouseDown={handleMouseDown} />
        </StyledSlider>
      </>
    );
  };
export default Slider