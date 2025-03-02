import "../css/score.css";
export default function Score({ score, invertForNightMode }) {
  function getColor() {
    if (score < 50) {
      return "danger";
    } else if (score < 70) {
      return "warning";
    } else {
      return "good";
    }
  }
  return (
    <div
      status={`${getColor()}`}
      invert={`${invertForNightMode}`}
      className="Score"
    >
      {score}
    </div>
  );
}
