import "../../css/filterBar.css";
import DropDown from "./DropDown";
export default function FilterBar(props) {
  const { filterConfigurationState } = props;
  return (
    <div className="FilterBar">
      <DropDown
        filterConfigurationState={filterConfigurationState}
        label={"Search By"}
        list={["Name", "Tags", "Ownership"]}
      />
      <DropDown
        filterConfigurationState={filterConfigurationState}
        label={"Status"}
        list={["Active", "Offline"]}
      />
      <DropDown
        filterConfigurationState={filterConfigurationState}
        label={"Criticality"}
        list={["Active", "Offline"]}
      />
      <DropDown
        filterConfigurationState={filterConfigurationState}
        label={"Dependencies"}
        list={["Active", "Offline"]}
      />
    </div>
  );
}
