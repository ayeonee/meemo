import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

const NoteContainer = styled.div`
  margin: 10vh auto;
  padding: 10px;

  width: 50vw;
  height: 800px;
  background-color: skyblue;
`;

const IconDiv = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
`;

const NoteDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: flex-start;

  width: 100%;
  height: 100%;
`;

const Note = styled.div`
  ${(p) =>
    p.isSelected === p.id
      ? `border: dotted 2px black;`
      : `border: solid 2px black;`}

  margin: 10px;

  width: 30%;
  height: 25%;
`;

const removeMd = require("remove-markdown");

const setTitle = (str) => {
  const rep = str.replace(/\\n|\\/g, "");
  const rem = removeMd(rep);
  return rem;
};

const setTime = (utcTime) => {
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
        const res = await axios.get("http://localhost:5000/notes", {
          cancelToken: source.token,
        });
        console.log("Got the notes!");
        setNotes(res.data.map((note) => note));
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

  const onSelect = (notes) => {
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
      .post("http://localhost:5000/notes/create", note)
      .then(() => setUpdate(!update))
      .then(() => console.log("New note added!"))
      .then(() => setSelectedNote(""));
  };

  const deleteNote = (id) => {
    axios
      .delete("http://localhost:5000/notes/" + id)
      .then(() => setUpdate(!update))
      .then(() => console.log("Note deleted."))
      .then(() => setSelectedNote(""))
      .catch(() => {
        console.log("no note selected");
      });
  };

  return (
    <NoteContainer>
      <IconDiv>
        <IconButton onClick={() => deleteNote(selectedNote)}>
          <Delete />
        </IconButton>
        <IconButton onClick={addNote}>
          <Add />
        </IconButton>
      </IconDiv>
      <NoteDiv>
        {/* note list needs to be fixed */}
        {notes.map((note) => (
          <Note
            key={note._id}
            id={note._id}
            onClick={() => onSelect(note)}
            isSelected={isSelected}
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
          </Note>
        ))}
      </NoteDiv>
    </NoteContainer>
  );
}
