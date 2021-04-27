import React, { useState, useEffect } from "react";
import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
  EventInput,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";

import CalendarModal from "./modals/CalendarModal";

interface CalendarState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
}

let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
const eventt: EventInput[] = [
  {
    id: createEventId(),
    title: "DongHo",
    start: todayStr,
    end: "2021-04-28",
  },
  {
    id: createEventId(),
    title: "Yes",
    start: todayStr + "T16:30:00",
  },
];

function renderEventContent(eventContent: EventContentArg) {
  return (
    <>
      <b>{eventContent.timeText}</b>
      {eventContent.event.title}
    </>
  );
}

export default function CalendarApp(): JSX.Element {
  const [currentEvents, setCurrentEvents]: any[] = useState([]);
  const [showModal, setShowModal] = useState<boolean>(false);

  const [selectInfo, setSelectInfo] = useState({});

  // useEffect(() => {
  //   console.log(eventt);
  // }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getSelectInfo = (selInfo: DateSelectArg) => {
    const info = {
      startStr: selInfo.startStr,
      endStr: selInfo.endStr,
    };
    setSelectInfo(info);
    setShowModal(!showModal);
  };

  // const handleDateSelect = (selectInfo: DateSelectArg) => {
  //   let title = prompt("Please enter a new title for your event");
  //   let calendarApi = selectInfo.view.calendar;

  //   calendarApi.unselect(); // clear date selection

  //   if (title) {
  //     calendarApi.addEvent({
  //       id: createEventId(),
  //       title,
  //       start: selectInfo.startStr,
  //       end: selectInfo.endStr,
  //       allDay: selectInfo.allDay,
  //     });
  //   }
  // };

  const handleEventClick = (clickInfo: EventClickArg) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  // const handleEvents = (events: EventApi[]) => {
  //   setCurrentEvents(events);
  // };

  return (
    <div className="app">
      {showModal ? (
        <CalendarModal toggleModal={toggleModal} selectInfo={selectInfo} />
      ) : null}
      <div className="app-main">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek",
          }}
          initialView="dayGridMonth"
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          events={eventt}
          // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={getSelectInfo}
          //  select(dateOrObj: DateInput | any, endDate?: DateInput): void;
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          /* you can update a remote database when these fire:
            eventAdd={function(){}}
            eventChange={function(){}}
            eventRemove={function(){}}
            */
        />
      </div>
    </div>
  );
}
