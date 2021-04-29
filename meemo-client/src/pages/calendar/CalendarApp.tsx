import React, { useState, useEffect } from "react";
import FullCalendar, {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
  EventInput,
} from "@fullcalendar/react";
import axios from "axios";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { INITIAL_EVENTS, createEventId } from "./event-utils";

import style from "./styles/CalendarApp.module.scss";

import CalendarModal from "./modals/CalendarModal";

interface CalendarState {
  weekendsVisible: boolean;
  currentEvents: EventApi[];
}

let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

const eventt: EventInput[] = [
  {
    title: "DongHo",
    start: todayStr,
    end: "2021-04-28",
  },
  {
    title: "Yes",
    start: todayStr + "T16:30:00",
  },
];

// function renderEventContent(eventContent: EventContentArg) {
//   return (
//     <>
//       <b>{eventContent.timeText}</b>
//       {eventContent.event.title}
//     </>
//   );
// }

export default function CalendarApp(): JSX.Element {
  const [currentEvents, setCurrentEvents]: any[] = useState([]);

  const [showModal, setShowModal] = useState<boolean>(false);

  const [selectInfo, setSelectInfo] = useState({});

  useEffect(() => {
    let source = axios.CancelToken.source();

    const loadEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/calendar", {
          cancelToken: source.token,
        });
        console.log("Got the folders!");
        setCurrentEvents(res.data.map((cal: any) => cal));
        // setIsLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Caught a cancel.");
        } else {
          throw err;
        }
      }
    };
    loadEvents();

    return () => {
      console.log("Unmounting Calendar");
      source.cancel();
    };
  }, []);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const getSelectInfo = (selInfo: DateSelectArg) => {
    const info = {
      allDay: selInfo.allDay,
      startStr: selInfo.startStr.split("T")[0],
      endStr: selInfo.endStr.split("T")[0],
      startTime:
        selInfo.startStr.split("T")[1] === undefined
          ? "00:00"
          : selInfo.startStr.split("T")[1].substring(0, 5),
      endTime:
        selInfo.endStr.split("T")[1] === undefined
          ? "00:00"
          : selInfo.endStr.split("T")[1].substring(0, 5),
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
    console.log(clickInfo.event);
    const info = {
      title: clickInfo.event.title,
      body: "",
      allDay: clickInfo.event.allDay,
      startStr: clickInfo.event.startStr.split("T")[0],
      endStr: clickInfo.event.endStr.split("T")[0],
      startTime:
        clickInfo.event.startStr.split("T")[1] === undefined
          ? "00:00"
          : clickInfo.event.startStr.split("T")[1].substring(0, 5),
      endTime:
        clickInfo.event.endStr.split("T")[1] === undefined
          ? "00:00"
          : clickInfo.event.endStr.split("T")[1].substring(0, 5),
    };
    setSelectInfo(info);
    setShowModal(!showModal);
  };

  // const handleEvents = (events: EventApi[]) => {
  //   setCurrentEvents(events);
  // };

  return (
    <div className={style.wrapper}>
      {showModal ? (
        <CalendarModal toggleModal={toggleModal} selectInfo={selectInfo} />
      ) : null}
      <div className={style.calendarDiv}>
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
          events={currentEvents}
          // initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
          select={getSelectInfo}
          //  select(dateOrObj: DateInput | any, endDate?: DateInput): void;
          // eventContent={renderEventContent} // custom render function
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
