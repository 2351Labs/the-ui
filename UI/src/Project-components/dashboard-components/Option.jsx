export default function Option(props) {
  const { img, name, id, sidebarState, style } = props;
  return (
    <div
      onClick={() => {
        sidebarState.setter(name);
      }}
      style={
        sidebarState.value == name
          ? { backgroundColor: "var(--dashboard-grey-hover)", ...style }
          : { opacity: "50%", ...style }
      }
      id={id}
      className="option"
    >
      <img src={img} />
      <div 
      style={sidebarState.isEnabled ? {} : { visibility: "hidden" }}
      >
        {name}
      </div>
    </div>
  );
}
