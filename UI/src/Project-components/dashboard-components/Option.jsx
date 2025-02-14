import { Link } from "react-router-dom";

export default function Option(props) {
  // use URL to determine sidebar selection
  const url = window.location.pathname;
  const currentSidebarOption = url.substring(url.lastIndexOf("/") + 1);

  const { svg, name, id, sidebarState, style, element } = props;
  return (
    <Link
      to={name.toLowerCase()}
      onClick={() => {
        sidebarState.setter({ name: name, element: element });
        // location.href  = '/dashboard'\
      }}
      style={
        currentSidebarOption == name.toLowerCase()
          ? { backgroundColor: "var(--dashboard-grey-hover)", ...style }
          : { ...style }
      }
      id={id}
      className={`option ${
        currentSidebarOption == name.toLowerCase() && "highlighted"
      }`}
    >
      {svg}
      <div style={sidebarState.isEnabled ? {} : { visibility: "hidden" }}>
        {name}
      </div>
    </Link>
  );
}
