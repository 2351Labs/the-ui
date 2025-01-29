import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { Timeline } from "primereact/timeline";
import "../../../css/changeHistory.css";
export default function ChangeHistory() {
  const events = [
    {
      status: "Registered",
      date: "15/10/2020",
    },
    {
      status: "Updated Documentation",
      date: "15/10/2020",
    },
    {
      status: "Added Dependencies",
      date: "15/10/2020",
    },
    {
      status: "OR",
    },
    {
      status: "Track git version history?",
      date: "15/10/2020",
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
          <small className="text-color-secondary">{item.date}</small>
        )}
      />
    </div>
  );
}
