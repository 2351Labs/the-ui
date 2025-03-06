import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import { Timeline } from "primereact/timeline";
import "../../../css/changeHistory.css";
export default function ChangeHistory({ history }) {
  function formattedDate(dateStr) {
    // Convert to a JavaScript Date object
    const date = new Date(dateStr);
    // Format the date to a more readable format
    const options = {
      // weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      // second: "numeric",
      timeZoneName: "short",
    };
    return date.toLocaleDateString("en-US", options);
  }

  return (
    <div className="changeHistory">
      <h4 className="option-header">Timeline</h4>
      {history ? (
        <Timeline
          value={history}
          opposite={(item) => item.description}
          // marker={<div>test</div>}
          content={(item) => (
            <>
              <small className="text-color-secondary">
                {formattedDate(item.time)}
              </small>

              {/* <div>Added</div> */}
            </>
          )}
        />
      ) : <div>No events to show</div>}
    </div>
  );
}
