import React, { useState } from "react";

const GrowingInput = (props) => {
  const { isDisabled = false, inputRef, inputValue, onChangeHandler } = props;
  //   const [inputValue, setInputValue] = useState('');
  const [inputWidth, setInputWidth] = useState(1); // Start with a minimum width

  return (
    <div style={{ display: "inline-block" }}>
      <input
        disabled={isDisabled}
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={(e) => onChangeHandler(e)}
        style={{
          backgroundColor: "transparent",
          border: "none",
          width: `${inputWidth + 0}ch`, // int is to add padding
        }}
      />
      <span
        style={{
          position: "absolute",
          visibility: "hidden",
          whiteSpace: "nowrap",
          fontSize: "inherit",
          fontFamily: "inherit",
        }}
        ref={(el) => {
          if (el) {
            setInputWidth(el.offsetWidth / 11); // Assuming 1ch = 12px
            // custom for font size changes!!
          }
        }}
      >
        {inputValue || " "}
      </span>
    </div>
  );
};

export default GrowingInput;
