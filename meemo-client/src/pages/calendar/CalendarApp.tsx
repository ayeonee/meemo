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
// import { INITIAL_EVENTS, createEventId } from "./event-utils";

import moment from "moment";

import style from "./styles/CalendarApp.module.scss";

import CalendarModal from "./modals/CalendarModal";

// let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

// const TestEvent: EventInput[] = [
//   {
//     title: "DongHo",
//     start: "2021-04-30",
//     end: "2021-04-28",
//   },
//   {
//     title: "Yes",
//     start: "2021-04-30" + "T16:30:00",
//   },
// ];

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

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const [selectInfo, setSelectInfo] = useState({});

  const [update, setUpdate] = useState<boolean>(false);

  useEffect(() => {
    let source = axios.CancelToken.source();

    const loadEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/calendar", {
          cancelToken: source.token,
        });
        console.log("Got the Calendar Events!");
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
  }, [update]);

  const toggleModal = () => {
    if (showAddModal === true) {
      setShowAddModal(!showAddModal);
    }
    if (showUpdateModal === true) {
      setShowUpdateModal(!showUpdateModal);
    }
  };

  const handleNewEvent = (selInfo: DateSelectArg) => {
    const info = {
      title: "",
      body: "",
      allDay: selInfo.allDay,
      startStr: selInfo.startStr.split("T")[0],
      endStr: selInfo.endStr.split("T")[0],
      startTime:
        selInfo.startStr.split("T")[1] === undefined
          ? "09:00"
          : selInfo.startStr.split("T")[1].substring(0, 5),
      endTime:
        selInfo.endStr.split("T")[1] === undefined
          ? "12:00"
          : selInfo.endStr.split("T")[1].substring(0, 5),
    };
    setSelectInfo(info);
    setShowAddModal(!showAddModal);
  };

  const handleEventClick = (clickInfo: EventClickArg) => {
    const info = {
      id: clickInfo.event.extendedProps._id,
      title: clickInfo.event.title,
      body: clickInfo.event.extendedProps.body,
      allDay: clickInfo.event.allDay,
      startStr: clickInfo.event.startStr.split("T")[0],
      endStr: clickInfo.event.endStr.split("T")[0],
      startTime:
        clickInfo.event.startStr.split("T")[1] === undefined
          ? "09:00"
          : clickInfo.event.startStr.split("T")[1].substring(0, 5),
      endTime:
        clickInfo.event.endStr.split("T")[1] === undefined
          ? "12:00"
          : clickInfo.event.endStr.split("T")[1].substring(0, 5),
    };
    setSelectInfo(info);
    setShowUpdateModal(!showUpdateModal);
  };

  const handleSubmit = async (evnt: object) => {
    const calEvnt: any = await evnt;
    if (calEvnt.type === "ADD") {
      try {
        axios
          .post("http://localhost:5000/api/calendar/create", calEvnt)
          .then(() => setUpdate(!update))
          .then(() => console.log("New Calendar Event Added!"))
          .then(() => setShowAddModal(!showAddModal))
          .catch((err) => console.log(`error: ${err}`));
      } catch (err) {
        throw err;
      }
    }
    if (calEvnt.type === "UPDATE") {
      try {
        axios
          .put("http://localhost:5000/api/calendar/" + calEvnt.id, evnt)
          .then(() => console.log("Calendar Event Updated"))
          .then(() => setUpdate(!update))
          .then(() => setShowUpdateModal(false))
          .catch((err) => console.log(`error: ${err}`));
      } catch (err) {
        throw err;
      }
    }
  };

  // const handleUpdate = async (evnt: object) => {
  //   try {
  //     axios
  //       .put("https://meemo.kr/api/calendar/" + evnt.id, evnt)
  //       .then(() => console.log("Calendar Event Updated"))
  //       .then(() => setUpdate(!update))
  //       .then(() => setShowUpdateModal(false))
  //       .catch((err) => console.log(`error: ${err}`));
  //   } catch (err) {
  //     throw err;
  //   }
  // };

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

  const handleDelete = (id: string) => {
    axios
      .delete("http://localhost:5000/api/calendar/" + id)
      .then(() => setUpdate(!update))
      .then(() => console.log("Calendar Event Deleted"))
      .then(() => setShowUpdateModal(!showUpdateModal))
      .catch(() => {
        console.log("no event selected");
      });
  };

  // const handleEvents = (events: EventApi[]) => {
  //   setCurrentEvents(events);
  // };

  return (
    <div className={style.wrapper}>
      {showAddModal ? (
        <CalendarModal
          modalType="ADD"
          toggleModal={toggleModal}
          selectInfo={selectInfo}
          submit={handleSubmit}
          handleDelete={handleDelete}
        />
      ) : null}
      {showUpdateModal ? (
        <CalendarModal
          modalType="UPDATE"
          toggleModal={toggleModal}
          selectInfo={selectInfo}
          submit={handleSubmit}
          handleDelete={handleDelete}
        />
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
          select={handleNewEvent}
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