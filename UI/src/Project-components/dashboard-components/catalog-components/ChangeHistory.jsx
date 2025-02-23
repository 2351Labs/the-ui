import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { Timeline } from "primereact/timeline";
import "../../../css/changeHistory.css";
export default function ChangeHistory() {
  const events = [
    {
      status: "Registered",
      date: "12/3/2022",
    },
    {
      status: "Updated Documentation",
      date: "12/11/2021",
    },
    {
      status: "Added Dependencies",
      date: "4/10/2020",
    },
    {
      status: "Registered",
      date: "12/3/2022",
    },
    {
      status: "Updated Documentation",
      date: "12/11/2021",
    },
    {
      status: "Added Dependencies",
      date: "6/10/2020",
    },
    {
      status: "Registered",
      date: "12/3/2022",
    },
    {
      status: "Updated Documentation",
      date: "12/11/2021",
    },
    {
      status: "Added Dependencies",
      date: "5/10/2020",
    },
    {
      status: "OR",
    },
    {
      status: "Track git version history?",
      date: "5/10/2020",
    },
  ];
  return (
    <div className="changeHistory">
      <h3 className="option-header">Timeline</h3>
      <Timeline
        value={events}
        opposite={(item) => item.status}
        // marker={<div>test</div>}
        content={(item) => (
          <>
            <small className="text-color-secondary">{item.date}</small>

            {/* <div>Added</div> */}
          </>
        )}
      />
    </div>
  );
}
