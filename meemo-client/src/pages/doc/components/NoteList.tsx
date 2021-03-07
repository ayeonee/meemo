import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import style from "../styles/NoteList.module.scss";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

const removeMd = require("remove-markdown");

const setTitle = (str: string) => {
  const rep = str.replace(/\\n|\\/g, "");
  const rem = removeMd(rep);
  return rem;
};

const setTime = (utcTime: any) => {
  const localTime = new Date(utcTime).toLocaleString();
  return localTime;
};

export default function NoteList() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState("");
  const [isSelected, setIsSelected] = useState("");
  const [update, setUpdate] = useState(false);
  let history = useHistory();
  let wrapperRef = useRef(new Array());

  useEffect(() => {
    let source = axios.CancelToken.source();

    const loadNotes = async () => {
      try {
        const res = await axios.get("https://meemo.kr/api/notes", {
          cancelToken: source.token,
        });
        console.log("Got the notes!");
        setNotes(res.data.map((note: any) => note));
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Caught a cancel.");
        } else {
          throw err;
        }
      }
    };
    loadNotes();

    return () => {
      console.log("Unmounting NoteList.");
      source.cancel();
    };
  }, [update]);

  const onSelect = (notes: any) => {
    selectedNote === notes._id
      ? history.push({
          pathname: "/editor",
          state: {
            id: notes._id,
            body: notes.body,
            updatedAt: notes.updatedAt,
          },
        })
      : setSelectedNote(notes._id);
    setIsSelected(notes._id);
    console.log(`note ${notes._id} selected!`);
  };

  const addNote = () => {
    const note = {
      body: "# New Note!",
    };

    axios
      .post("https://meemo.kr/api/notes/create", note)
      .then(() => setUpdate(!update))
      .then(() => console.log("New note added!"))
      .then(() => setSelectedNote(""));
  };

  const deleteNote = (id: any) => {
    axios
      .delete("https://meemo.kr/api/notes/" + id)
      .then(() => setUpdate(!update))
      .then(() => console.log("Note deleted."))
      .then(() => setSelectedNote(""))
      .catch(() => {
        console.log("no note selected");
      });
  };

  return (
    <div className={style.noteContainer}>
      <div className={style.iconDiv}>
        <IconButton onClick={() => deleteNote(selectedNote)}>
          <Delete />
        </IconButton>
        <IconButton onClick={addNote}>
          <Add />
        </IconButton>
      </div>
      <div className={style.noteDiv}>
        {/* note list needs to be fixed */}
        {notes.map((note: any) => (
          <div
            className={style.notes}
            key={note._id}
            id={note._id}
            onClick={() => onSelect(note)}
          >
            {setTitle(note.body)}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            last updated: <br />
            {setTime(note.updatedAt)}
          </div>
        ))}
      </div>
    </div>
  );
}
