import { Link } from "react-router-dom";

export default function Option(props) {
  const { svg, name, id, sidebarState, style, element } = props;
  return (
    <Link
      to={name.toLowerCase()}
      onClick={() => {
        sidebarState.setter({ name: name, element: element });
        // location.href  = '/dashboard'\
      }}
      style={
        sidebarState.value.name == name
          ? {
              backgroundColor: "var(--dashboard-grey-hover)",
              ...style,
              ...{ backgroundColor: "red !important" },
            }
          : { ...style }
      }
      id={id}
      className={`option ${sidebarState.value.name == name && "highlighted"}`}
    >
      {svg}
      <div style={sidebarState.isEnabled ? {} : { visibility: "hidden" }}>
        {name}
      </div>
    </Link>
  );
}
