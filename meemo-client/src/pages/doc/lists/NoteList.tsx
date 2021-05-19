import { useState, useEffect } from "react";
import { useRouteMatch, useHistory, useParams } from "react-router-dom";

import axios from "axios";
import moment from "moment";
import style from "../styles/NoteList.module.scss";
import style_mode from "../styles/modeColor.module.scss";
import { Delete, Notes, Create } from "@material-ui/icons";

import AddRenameModal from "../modals/AddRenameModal";
import DeleteModal from "../modals/DeleteModal";
import RouteShow from "../misc/RouteShow";
import LoaderSpinner from "../misc/LoaderSpinner";

import { BASE_URL } from "../../../_data/urlData";

import { useSelector } from "react-redux";
import { RootState } from "../../../_reducers";

export default function NoteList() {
  const modeInfo = useSelector((state: RootState) => state.modeReducer.mode);
  const userIdInfo = useSelector(
    (state: RootState) => state.userReducer.userData.userId
  );
  const [notes, setNotes]: any = useState([]);
  const [selectedNote, setSelectedNote] = useState<string>("");
  const [delBtn, setDelBtn] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [folderId, setFolderId] = useState<string>("");
  const [gotFolderId, setGotFolderId] = useState<boolean>(false);
  const [popupType, setPopupType] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showDelModal, setShowDelModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [userId, setUserId] = useState<string | null>(userIdInfo);

  let { url }: any = useRouteMatch();
  let { folderTitle }: any = useParams();

  let history = useHistory<any>();
  let source = axios.CancelToken.source();

  useEffect(() => {
    document.onclick = (event: any) => {
      if (event.target.id !== "noDeselect") {
        setDelBtn(false);
        setSelectedNote("");
      }
    };
    return () => {
      clearTimeout();
      setSelectedNote("");
      setNoteTitle("");
      setNotes([]);
      source.cancel();
    };
  }, []);

  useEffect(() => {
    getParentId();
  }, []);

  useEffect(() => {
    if (gotFolderId === true) {
      loadNotes();
    }
  }, [update]);

  const loadNotes = async () => {
    try {
      const res = await axios.get(
        BASE_URL + `/notes/userParent/${userId}/${folderId}`,
        {
          cancelToken: source.token,
        }
      );
      if (res.data.length === 0) {
        setNotes([]);
        setIsLoading(false);
      } else {
        setNotes(res.data.map((note: any) => note));
        setIsLoading(false);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Caught a cancel.");
      } else {
      }
    }
  };

  const getParentId = async () => {
    try {
      const res = await axios.get(
        BASE_URL + `/folders/userTitle/${userId}/${folderTitle}`,
        {
          cancelToken: source.token,
        }
      );
      if (res.data.length === 0) {
        history.push({
          pathname: "/error",
        });
      } else {
        setFolderId(res.data[0]._id);
        setGotFolderId(true);
        setUpdate(!update);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Caught a cancel.");
      } else {
      }
    }
  };

  const getTitle = async (id: string) => {
    try {
      const res = await axios.get(BASE_URL + "/notes/" + id);
      setNoteTitle(res.data.title);
    } catch (err) {
      throw err;
    }
  };

  const addNote = async (t: string) => {
    let title = t;
    let i = 1;
    try {
      while (true) {
        const res = await axios.get(
          BASE_URL + `/notes/userParentTitle/${userId}/${folderId}/${title}`
        );
        if (res.data.length === 0) {
          const note = {
            title: `${title}`,
            body: "",
            parentId: `${folderId}`,
            userId: userId,
          };
          axios
            .post(BASE_URL + "/notes/create", note)
            .then(() => setUpdate(!update))
            .then(() => setShowPopup(!showPopup))
            .then(() => setSelectedNote(""))
            .catch((err) => console.log(`error: ${err}`));
          break;
        } else {
          title = `${t} ${i}`;
          i = i + 1;
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteNote = (id: any) => {
    axios
      .delete(BASE_URL + "/notes/" + id)
      .then(() => setShowDelModal(!showDelModal))
      .then(() => setDelBtn(false))
      .then(() => setUpdate(!update))
      .catch((err) => console.log(`error: ${err}`));
  };

  const updateNote = async (id: string, t: string) => {
    try {
      const title = await {
        title: `${t}`,
      };

      axios
        .put(BASE_URL + "/notes/" + id, title)
        .then(() => setUpdate(!update))
        .then(() => setShowPopup(false))
        .then(() => setSelectedNote(""))
        .catch((err) => console.log(`error: ${err}`));
    } catch (err) {
      throw err;
    }
  };

  const onSelect = (note: any) => {
    selectedNote === note._id
      ? history.push({
          pathname: `${url}/${note._id}`,
          state: {
            folderId: note.parentId,
            folderTitle: folderTitle,
            id: note._id,
            title: note.title,
            body: note.body,
            updatedAt: note.updatedAt,
          },
        })
      : setSelectedNote(note._id);
    setSelectedNote(note._id);
    getTitle(note._id);
    setDelBtn(true);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleDelModal = () => {
    setShowDelModal(!showDelModal);
  };

  return (
    <div className={style.noteList}>
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <>
          <RouteShow
            folderId={""}
            type="notelist"
            folderTitle={folderTitle}
            noteTitle=""
          />
          <div className={style.noteContainer}>
            <div className={style.noteDiv}>
              {notes.map((note: any) => (
                <div
                  key={note._id}
                  id={`noDeselect`}
                  className={
                    selectedNote === note._id
                      ? [
                          style.notesSelected,
                          modeInfo === "light"
                            ? style_mode.note_selected_light
                            : style_mode.note_selected_dark,
                        ].join(" ")
                      : [
                          style.notes,
                          modeInfo === "light"
                            ? style_mode.notes_light
                            : style_mode.notes_dark,
                        ].join(" ")
                  }
                  onClick={() => {
                    onSelect(note);
                  }}
                >
                  <div className={style.iconDiv} id={`noDeselect`}>
                    <Notes
                      className={[
                        style.noteIcon,
                        modeInfo === "light"
                          ? style_mode.note_icon_light
                          : style_mode.note_icon_dark,
                      ].join(" ")}
                      id={`noDeselect`}
                    />
                  </div>
                  <div className={style.titleDiv}>
                    <p className={style.title}>{note.title}</p>
                  </div>
                  <div
                    className={[
                      style.timeDiv,
                      modeInfo === "light"
                        ? style_mode.timeDiv_light
                        : style_mode.timeDiv_dark,
                    ].join(" ")}
                  >
                    <p className={style.timeMent}>최근 수정:&nbsp;</p>
                    <p>{moment(note.updatedAt).format("YY-MM-DD HH:mm")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={style.toolDiv} id={`noDeselect`}>
            <div
              className={
                delBtn
                  ? [
                      style.renameBtn,
                      modeInfo === "light"
                        ? style_mode.btn_light
                        : style_mode.btn_dark,
                    ].join(" ")
                  : style.hideRenameBtn
              }
              id={`noDeselect`}
              onClick={() => {
                setPopupType("rename");
                setShowPopup(!showPopup);
              }}
            >
              <Create className={style.renameIcon} id={`noDeselect`} />
            </div>
            <div
              className={[
                style.addBtn,
                modeInfo === "light"
                  ? style_mode.btn_light
                  : style_mode.btn_dark,
              ].join(" ")}
              id={`noDeselect`}
              onClick={() => {
                setPopupType("notelist");
                setShowPopup(!showPopup);
              }}
            >
              <span id={`noDeselect`}> + </span>
            </div>
            <div
              className={
                delBtn
                  ? [
                      style.deleteBtn,
                      modeInfo === "light"
                        ? style_mode.btn_light
                        : style_mode.btn_dark,
                    ].join(" ")
                  : style.hideDelBtn
              }
              id={`noDeselect`}
              onClick={() => {
                setShowDelModal(!showDelModal);
              }}
            >
              <Delete className={style.deleteIcon} id={`noDeselect`} />
            </div>
          </div>
        </>
      )}
      {showPopup ? (
        <AddRenameModal
          prevTitle={noteTitle}
          selectedId={selectedNote}
          component={popupType}
          togglePopup={togglePopup}
          getTitle={addNote}
          getRename={updateNote}
        />
      ) : null}
      {showDelModal ? (
        <DeleteModal
          type="notelist"
          childTitles={[]}
          selectedTitle={noteTitle}
          selectedId={selectedNote}
          delete={deleteNote}
          toggleDelModal={toggleDelModal}
        />
      ) : null}
    </div>
  );
}
