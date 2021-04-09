import { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import style from "../styles/NoteList.module.scss";
import axios from "axios";
import { Add, Delete, Notes, Create } from "@material-ui/icons";

import Popup from "./Popup";
import RouteShow from "./RouteShow";
import LoaderSpinner from "./LoaderSpinner";
import DeleteModal from "./DeleteModal";

const removeMd = require("remove-markdown");

// removing remaining md strings; maybe not needed
const onlyLet = (str: string) => {
  const rep = str.replace(/\\n|\\/g, "");
  const rem = removeMd(rep);
  return rem;
};

const setTime = (utcTime: any) => {
  const localTime = new Date(utcTime).toLocaleString();
  return localTime;
};

export default function NoteList() {
  const [notes, setNotes]: any = useState([]);
  const [selectedNote, setSelectedNote] = useState("");
  const [delBtn, setDelBtn] = useState(false);
  const [update, setUpdate] = useState(false);

  const [noteTitle, setNoteTitle] = useState("");
  const [popupType, setPopupType] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  let { url } = useRouteMatch();

  // passing note information into Editor component
  let history = useHistory<any>();

  const parentId = history.location.state.folderId;

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
    let source = axios.CancelToken.source();
    let temp: any[] = [];

    const loadNotes = async () => {
      try {
        const res = await axios.get("https://meemo.kr/api/notes", {
          cancelToken: source.token,
        });
        console.log("Got the notes!");
        res.data.forEach((note: any) => {
          if (note.parentId === parentId) {
            temp.push(note);
          }
        });
        setNotes(temp.map((note: any) => note));
        setIsLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Caught a cancel.");
        } else {
          throw err;
        }
      }
    };
    loadNotes();

    // const loadNotes = async () => {
    //   childNotes.map(async (id: any) => {
    //     let res = await axios.get("http://localhost:5000/notes/" + id);
    //     test.push(res.data);
    //   });
    // };
    // loadNotes();

    return () => {
      console.log("Unmounting NoteList.");
      source.cancel();
    };
  }, [update]);

  const getTitle = async (id: string) => {
    try {
      const res = await axios.get("https://meemo.kr/api/notes/" + id);
      setNoteTitle(res.data.title);
    } catch (err) {
      throw err;
    }
  };

  const addNote = async (t: string) => {
    try {
      let title = await t;
      const note = {
        title: `${title}`,
        body: "this is the body",
        parentId: `${parentId}`,
      };
      axios
        .post("https://meemo.kr/api/notes/create", note)
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
      .delete("https://meemo.kr/api/notes/" + id)
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
        .put("https://meemo.kr/api/notes/" + id, title)
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
            folderId: history.location.state.folderId,
            folderTitle: history.location.state.folderTitle,
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
      <RouteShow
        folderId={parentId}
        type="notelist"
        folderTitle={history.location.state.folderTitle}
        noteTitle=""
      />
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <>
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
                  <div className={style.titleDiv}>
                    <p>{note.title}</p>
                  </div>
                  <div className={style.timeDiv}>
                    <small>최근 수정: {setTime(note.updatedAt)}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={style.toolDiv}>
            <button
              className={delBtn ? style.renameBtn : style.hideRenameBtn}
              id={`noDeselect`}
              onClick={() => {
                setPopupType("rename");
                setShowPopup(!showPopup);
              }}
            >
              <Create className={style.renameIcon} />
            </button>
            <button
              className={style.addBtn}
              id={`noDeselect`}
              onClick={() => {
                setPopupType("notelist");
                setShowPopup(!showPopup);
              }}
            >
              <Add className={style.addIcon} />
            </button>
            <button
              className={delBtn ? style.deleteBtn : style.hideDelBtn}
              id={`noDeselect`}
              onClick={() => {
                setShowDelModal(!showDelModal);
              }}
            >
              <Delete className={style.deleteIcon} />
            </button>
          </div>
        </>
      )}
      {showPopup ? (
        <Popup
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
