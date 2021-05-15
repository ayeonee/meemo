import CalendarApp from "./CalendarApp";
import "./styles/main.css";
import "./styles/override.css";

export default function Calendar(): JSX.Element {
  return (
    <div className="calendarWrapper">
      <CalendarApp />
    </div>
  );
}
