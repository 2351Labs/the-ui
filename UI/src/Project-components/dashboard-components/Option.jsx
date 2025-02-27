import { Link } from "react-router-dom";
import capitalizeFirstLetter from "../../helpers/capitilizeFirstLetter";
export default function Option(props) {
  const { svg, name, id, sidebarState, style, element } = props;
  console.log("N sidebarState.valueAME", sidebarState);
  return (
    <Link
      to={name}
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
        {capitalizeFirstLetter(name)}
      </div>
    </Link>
  );
}
