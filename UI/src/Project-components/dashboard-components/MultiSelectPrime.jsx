//styling in SearchBar.css
import "../../css/multiSelectPrime.css";
import { useState } from "react";
import { MultiSelect } from "primereact/multiselect";
import { FloatLabel } from "primereact/floatlabel";
export default function MultiSelectPrime() {
  const [selectedCities, setSelectedCities] = useState();
  const data = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];
  return (
    <div className="MultiSelectPrime">
      <MultiSelect
        value={selectedCities}
        onChange={(e) => setSelectedCities(e.value)}
        options={data}
        optionLabel="name"
        maxSelectedLabels={4}
        // display="chip"
        // filter
        placeholder="Select Items"
      />
    </div>
  );
}
