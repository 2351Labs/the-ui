import "../../css/filterBar.css";
import DropDown from "./DropDown";
export default function FilterBar(props) {
  const { filterConfigurationState } = props;
  function optionClickHandler(option, label, e) {
    e.stopPropagation();
    // update main filter configuration state stored at dashboard level
    filterConfigurationState.setter((prev) => {
      return {
        ...prev,
        [label]: {
          ...prev[label],
          [option]: !filterConfigurationState.value[label]?.[option],
        },
      };
    });
  }

  return (
    <div className="FilterBar">
      <DropDown
        label={"Search By"}
        list={["Name", "Tags", "Ownership"]}
        listState={filterConfigurationState.value}
        optionClickHandler={optionClickHandler}
      />
      <DropDown
        label={"Status"}
        listState={filterConfigurationState.value}
        list={["Active", "Offline"]}
        optionClickHandler={optionClickHandler}
      />
      <DropDown
        label={"Criticality"}
        list={["Active", "Offline"]}
        listState={filterConfigurationState.value}
        optionClickHandler={optionClickHandler}
      />
      <DropDown
        label={"Dependencies"}
        list={["Active", "Offline"]}
        listState={filterConfigurationState.value}
        optionClickHandler={optionClickHandler}
      />
    </div>
  );
}
