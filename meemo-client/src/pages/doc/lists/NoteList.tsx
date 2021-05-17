import { useState, useEffect } from "react";
import { useRouteMatch, useHistory, useParams } from "react-router-dom";

import axios from "axios";
import moment from "moment";
import style from "../styles/NoteList.module.scss";
import { Add, Delete, Notes, Create } from "@material-ui/icons";

import AddRenameModal from "../modals/AddRenameModal";
import DeleteModal from "../modals/DeleteModal";
import RouteShow from "../misc/RouteShow";
import LoaderSpinner from "../misc/LoaderSpinner";

import { BASE_URL } from "../../../_data/urlData";

import { useSelector } from "react-redux";
import { RootState } from "../../../_reducers";

const removeMd = require("remove-markdown");

// removing remaining md strings; maybe not needed
const onlyLet = (str: string) => {
  const rep = str.replace(/\\n|\\/g, "");
  const rem = removeMd(rep);
  return rem;
};

export default function NoteList() {
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

  const userIdInfo = useSelector(
    (state: RootState) => state.userReducer.userData.userId
  );
  const [userId, setUserId] = useState<string | null>(userIdInfo);

  let { url }: any = useRouteMatch();
  let { folderTitle }: any = useParams();

  // passing note information into Editor component
  let history = useHistory<any>();
  let source = axios.CancelToken.source();

  // if element doesnt have noDeselect as id, deselect upon click
  useEffect(() => {
    document.onclick = (event: any) => {
      setTimeout(() => {
        if (event.target.id !== "noDeselect") {
          setDelBtn(false);
          setSelectedNote("");
        }
      }, 100);
    };
    return () => {
      clearTimeout();
      setSelectedNote("");
      setNoteTitle("");
      setNotes([]);
    };
  }, []);

  useEffect(() => {
    getParentId();
    return () => {
      source.cancel();
    };
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
        console.log("Got the notes!");
      } else {
        setNotes(res.data.map((note: any) => note));
        console.log("Got the notes!");
        // setUpdate(false);
        setIsLoading(false);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Caught a cancel.");
      } else {
        // history.push({
        //   pathname: "/error",
        // });
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
        // history.push({
        //   pathname: "/error",
        // });
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

  const addNote = async (title: string) => {
    try {
      const note = {
        title: `${title}`,
        body: "",
        parentId: `${folderId}`,
        userId: userId,
      };
      axios
        .post(BASE_URL + "/notes/create", note)
        .then(() => setUpdate(!update))
        .then(() => console.log("New note added!"))
        .then(() => setShowPopup(!showPopup))
        .then(() => setSelectedNote(""));
    } catch (err) {
      throw err;
    }
  };

  const deleteNote = (id: any) => {
    axios
      .delete(BASE_URL + "/notes/" + id)
      .then(() => console.log("Note deleted."))
      .then(() => setShowDelModal(!showDelModal))
      .then(() => setDelBtn(false))
      .then(() => setUpdate(!update))
      .catch(() => {
        console.log("no note selected");
      });
  };

  //title update uses put; editor body uses post + update.
  //to fix, add another prop in popup to get the body from the editor and feed in put.
  const updateNote = async (id: string, t: string) => {
    try {
      const title = await {
        title: `${t}`,
      };

      axios
        .put(BASE_URL + "/notes/" + id, title)
        .then(() => console.log("Note Renamed"))
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
    console.log(`note ${note._id} selected!`);
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
                      ? style.notesSelected
                      : style.notes
                  }
                  onClick={() => {
                    onSelect(note);
                  }}
                >
                  <div className={style.iconDiv}>
                    <Notes className={style.noteIcon} />
                  </div>
                  <div className={style.titleDiv}>{note.title}</div>
                  <div className={style.timeDiv}>
                    <p>
                      <div className={style.timeMent}>최근 수정 :&nbsp;</div>
                      {moment(note.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={style.toolDiv}>
            <div
              className={delBtn ? style.renameBtn : style.hideRenameBtn}
              id={`noDeselect`}
              onClick={() => {
                setPopupType("rename");
                setShowPopup(!showPopup);
              }}
            >
              <Create className={style.renameIcon} />
            </div>
            <div
              className={style.addBtn}
              id={`noDeselect`}
              onClick={() => {
                setPopupType("notelist");
                setShowPopup(!showPopup);
              }}
            >
              <Add className={style.addIcon} />
            </div>
            <div
              className={delBtn ? style.deleteBtn : style.hideDelBtn}
              id={`noDeselect`}
              onClick={() => {
                setShowDelModal(!showDelModal);
              }}
            >
              <Delete className={style.deleteIcon} />
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
