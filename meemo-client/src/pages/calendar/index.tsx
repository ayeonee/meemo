import React from "react";
import { render } from "react-dom";
import CalendarApp from "./CalendarApp";
import "./main.css";

export default function Calendar(): JSX.Element {
  return (
    <div>
      <CalendarApp />
    </div>
  );
}
