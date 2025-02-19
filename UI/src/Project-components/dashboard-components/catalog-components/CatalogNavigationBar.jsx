import "../../../css/catalogNavigationBar.css";

export default function CatalogNavigationBar(props) {
  const { navBarState, navBarOptions, isPastWidth } = props;

  return (
    <div
      style={!isPastWidth ? { flexDirection: "column" } : {}}
      className="catalogNavigationBar"
    >
      {Object.keys(navBarOptions).map((optionKey, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              navBarState.setter(optionKey);
            }}
            className={`bar-option-btn ${
              optionKey === navBarState.value && "highlighted"
            }`}
          >
            {navBarOptions[optionKey].svg}
            {/* <img
              className={optionKey === navBarState.value && "highlighted"}
              style={optionKey === navBarState.value ? {} : {}}
              src={navBarOptions[optionKey].img}
            /> */}
            <div className="bar-option" key={index}>
              {navBarOptions[optionKey].label}
            </div>
          </button>
        );
      })}
    </div>
  );
}
