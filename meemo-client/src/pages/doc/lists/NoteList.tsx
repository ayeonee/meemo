import { useState, useEffect } from "react";
import { useRouteMatch, useHistory, useParams } from "react-router-dom";

import axios from "axios";
import style from "../styles/NoteList.module.scss";
import { Add, Delete, Notes, Create } from "@material-ui/icons";

import AddRenameModal from "../modals/AddRenameModal";
import DeleteModal from "../modals/DeleteModal";
import RouteShow from "../misc/RouteShow";
import LoaderSpinner from "../misc/LoaderSpinner";

import { BASE_URL } from "../../../_data/urlData";

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
  const [parentId, setParentId] = useState("");

  const [userId, setUserId] = useState<string | null>("");

  const [popupType, setPopupType] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showDelModal, setShowDelModal] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

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

  // 빌드할 때 지울것
  useEffect(() => {
    localStorage.setItem("meemo-user-id", "testmeemo");
  });

  useEffect(() => {
    setUserId(localStorage.getItem("meemo-user-id"));
  });

  useEffect(() => {
    setUpdate(!update);
  }, []);

  useEffect(() => {
    let temp: any[] = [];

    const loadNotes = async () => {
      try {
        const res = await axios.get(BASE_URL + "/notes", {
          cancelToken: source.token,
        });
        res.data.forEach((note: any) => {
          if (note.parentId === parentId) {
            temp.push(note);
          }
        });
        setNotes(temp.map((note: any) => note));
        console.log("Got the notes!");
        setUpdate(false); // update 바뀜에 따라 실행되는 useEffect 안에서 update 하기위함
        setIsLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Caught a cancel.");
        } else {
          throw err;
        }
      }
    };
    getParentId().then(loadNotes);

    return () => {
      console.log("Unmounting NoteList.");
      source.cancel();
      clearTimeout();
    };
  }, [update]);

  const getParentId = async () => {
    try {
      const res = await axios.get(BASE_URL + "/folders", {
        cancelToken: source.token,
      });
      res.data.forEach((folder: any) => {
        if (
          (folder.title === folderTitle && folder.userId === userId) === true
        ) {
          setParentId(folder._id);
        } else {
          history.push({
            pathname: "/error", // no such page as error, just a random path not registered
          });
        }
      });
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Caught a cancel.");
      } else {
        throw err;
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
        body: "this is the body",
        parentId: `${parentId}`,
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
                  <div className={style.note_front}>
                    <div className={style.iconDiv}>
                      <Notes className={style.noteIcon} />
                    </div>
                    <div className={style.titleDiv}>
                      <p>{note.title}</p>
                    </div>
                  </div>
                  <div className={style.timeDiv}>
                    <small>최근 수정: {setTime(note.updatedAt)}</small>
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
