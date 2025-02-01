import useClickOutside from "../../../helpers/useClickOutside";
import editIcon from "../../../assets/dashboard/edit.svg";
import "../../../css/catalogItemName.css";
import GrowingInput from "../GrowingInput";
import { useState, useRef, useEffect } from "react";
export default function CatalogItemName(props) {
  const { itemID, itemDataState } = props;
  const nameRef = useRef(null);
  const [isEditingName, setIsEditingName] = useState(false);

  useClickOutside(nameRef, () => {
    setIsEditingName(false);
  });
  useEffect(() => {
    //need to use use effect to focus element after state has been updated so that the content is editable when focusing
    if (isEditingName == true) {
      nameRef.current.focus();
    }
  }, [isEditingName]);

  function onChangeHandler(e) {
    itemDataState.setter((prev) => {
      return {
        ...prev,
        name: e.target.value,
      };
    });
  }

  return (
    <div className="catalogItemName">
      <GrowingInput
        inputRef={nameRef}
        inputValue={itemDataState.value.name}
        onChangeHandler={onChangeHandler}
        isDisabled={!isEditingName}
      />
      {!isEditingName && (
        <img
          style={{
            opacity: ".5",
            cursor: "pointer",
            // filter:"brightness(0) saturate(100%) invert(60%) sepia(86%) saturate(382%) hue-rotate(90deg) brightness(93%) contrast(94%)",
          }}
          onClick={() => {
            setIsEditingName(true);
          }}
          src={editIcon}
        />
      )}
    </div>
  );
}
