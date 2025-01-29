// import messageIcon from "../../../assets/message.svg";
import "../../../css/catalogNavigationBar.css";

export default function CatalogNavigationBar(props) {
  const { navBarState, navBarOptions } = props;

  return (
    <div className="catalogNavigationBar">
      {Object.keys(navBarOptions).map((optionKey, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              navBarState.setter(optionKey);
            }}
            style={
              optionKey === navBarState.value
                ? {
                    color: "var(--primary)",
                    borderBottom: "2px solid var(--primary)",
                    backgroundColor: "#f5f5f5",
                    borderTopRightRadius: "5px",
                    borderTopLeftRadius: "5px",
                    // fontWeight: "600",
                    opacity: 1,
                  }
                : {}
            }
            className="bar-option-btn"
          >
            <img
              style={
                optionKey === navBarState.value
                  ? {
                      filter:
                        "brightness(0) saturate(100%) invert(60%) sepia(86%) saturate(382%) hue-rotate(90deg) brightness(93%) contrast(94%)",
                    }
                  : {}
              }
              src={navBarOptions[optionKey].img}
            />
            <div className="bar-option" key={index}>
              {navBarOptions[optionKey].label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
