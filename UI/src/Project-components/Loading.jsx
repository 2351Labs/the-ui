import "../css/loading.css";
import Spinner from '../assets/spinner.svg?react'
export default function Loading() {
  return (
    <div className="Loading">
      <Spinner className="spinner"/>
    </div>
  );
}
