import { useState, useEffect } from "react";
import FullCalendar, {
  DateSelectArg,
  EventClickArg,
} from "@fullcalendar/react";
import axios from "axios";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

import style from "./styles/CalendarApp.module.scss";
import style_mode from "./styles/modeColor.module.scss";

import LoaderSpinner from "../doc/misc/LoaderSpinner";

import CalendarModal from "./modals/CalendarModal";

import { BASE_URL } from "../../constants/url";

export default function CalendarApp(): JSX.Element {
  const userIdInfo = useSelector(
    (state: RootState) => state.userReducer.userData.userId
  );
  const modeInfo = useSelector((state: RootState) => state.modeReducer.mode);
  const [currentEvents, setCurrentEvents]: any[] = useState([]);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [selectInfo, setSelectInfo] = useState({});
  const [update, setUpdate] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let source = axios.CancelToken.source();

  const prevBtn = document.getElementsByClassName("fc-prev-button");
  const nextBtn = document.getElementsByClassName("fc-next-button");
  const todayBtn = document.getElementsByClassName("fc-today-button");
  const monthBtn = document.getElementsByClassName("fc-dayGridMonth-button");
  const weekBtn = document.getElementsByClassName("fc-timeGridWeek-button");

  useEffect(() => {
    loadEvents(userIdInfo ?? "");
    return () => {
      source.cancel();
    };
  }, [update]);

  useEffect(() => {
    if (todayBtn[0] === undefined) {
      return;
    } else {
      todayBtn[0].innerHTML = `<span style='color: ${
        modeInfo === "light" ? "white" : "rgb(27, 27, 27)"
      }; font-weight: bold;'>오늘</span>`;
      monthBtn[0].innerHTML = `<span style='color: ${
        modeInfo === "light" ? "white" : "rgb(27, 27, 27)"
      }; font-weight: bold;'>월</span>`;
      weekBtn[0].innerHTML = `<span style='color: ${
        modeInfo === "light" ? "white" : "rgb(27, 27, 27)"
      }; font-weight: bold;'>주</span>`;
    }

    prevBtn[0].innerHTML = `<span style='color: ${
      modeInfo === "light" ? "white" : "rgb(27, 27, 27)"
    }; font-weight: bold;'> &#9664; </span>`;
    nextBtn[0].innerHTML = `<span style='color: ${
      modeInfo === "light" ? "white" : "rgb(27, 27, 27)"
    }; font-weight: bold;'>	&#9654; </span>`;
  });

  const loadEvents = async (userId: string | null) => {
    const res = await axios.get(BASE_URL + "/calendar/user/" + userId, {
      cancelToken: source.token,
    });

    if (!res.data) {
      return;
    }

    if (res.data.length === 0) {
      setIsLoading(false);
      setCurrentEvents([]);

      return;
    }

    setCurrentEvents(res.data.map((cal: any) => cal));
    setIsLoading(false);
  };

  const handleToggleModal = () => {
    if (showAddModal) {
      setShowAddModal(!showAddModal);
    }
    if (showUpdateModal) {
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
    const calEvnt: any = evnt;

    if (calEvnt.type === "ADD") {
      const res = await axios.post(BASE_URL + "/calendar/create", calEvnt);

      if (!res.data) {
        alert("error");
        return;
      }

      setUpdate(!update);
      setShowAddModal(!showAddModal);

      return;
    }

    if (calEvnt.type === "UPDATE") {
      const res = await axios.put(BASE_URL + "/calendar/" + calEvnt.id, evnt);

      if (!res.data) {
        alert("error");
        return;
      }

      setUpdate(!update);
      setShowUpdateModal(false);
    }
  };

  const handleDelete = (id: string) => {
    axios
      .delete(BASE_URL + "/calendar/" + id)
      .then(() => {
        setUpdate(!update);
        setShowUpdateModal(!showUpdateModal);
      })
      .catch(() => {
        console.log("no event selected");
      });
  };

  return (
    <div
      className={[
        style.wrapper,
        modeInfo === "light"
          ? style_mode.wrapper_light
          : style_mode.wrapper_dark,
      ].join(" ")}
    >
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <>
          <div className={style.calendarDiv}>
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              locale="ko"
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
              select={handleNewEvent}
              eventClick={handleEventClick}
            />
          </div>
        </>
      )}
      {showAddModal ? (
        <CalendarModal
          modalType="ADD"
          toggleModal={handleToggleModal}
          selectInfo={selectInfo}
          submit={handleSubmit}
          handleDelete={handleDelete}
        />
      ) : null}
      {showUpdateModal ? (
        <CalendarModal
          modalType="UPDATE"
          toggleModal={handleToggleModal}
          selectInfo={selectInfo}
          submit={handleSubmit}
          handleDelete={handleDelete}
        />
      ) : null}
    </div>
  );
}
