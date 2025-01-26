export default function Option(props) {
  const { img, name, id, sidebarState, style, element } = props;
  return (
    <div
      onClick={() => {
        sidebarState.setter({ name: name, element: element });
      }}
      style={
        sidebarState.value.name == name
          ? { backgroundColor: "var(--dashboard-grey-hover)", ...style }
          : { opacity: "50%", ...style }
      }
      id={id}
      className="option"
    >
      <img
        style={
          sidebarState.value.name == name
            ? {
                filter:
                  " brightness(0) saturate(100%) invert(85%) sepia(29%) saturate(1149%) hue-rotate(75deg) brightness(83%) contrast(94%)",
              }
            : {}
        }
        src={img}
      />
      <div style={sidebarState.isEnabled ? {} : { visibility: "hidden" }}>
        {name}
      </div>
    </div>
  );
}
