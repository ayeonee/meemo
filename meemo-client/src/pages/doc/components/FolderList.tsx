import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import style from "../styles/NoteList.module.scss";
import axios from "axios";
import { IconButton } from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

export default function FolderList() {
  // const [notes, setNotes] = useState([]);
  // const [selectedNote, setSelectedNote] = useState("");
  // const [isSelected, setIsSelected] = useState("");
  // const [update, setUpdate] = useState(false);
  // let history = useHistory();
  // let wrapperRef = useRef(new Array());

  // useEffect(() => {
  //   let source = axios.CancelToken.source();

  //   const loadNotes = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:5000/notes", {
  //         cancelToken: source.token,
  //       });
  //       console.log("Got the notes!");
  //       setNotes(res.data.map((note: any) => note));
  //     } catch (err) {
  //       if (axios.isCancel(err)) {
  //         console.log("Caught a cancel.");
  //       } else {
  //         throw err;
  //       }
  //     }
  //   };
  //   loadNotes();

  //   return () => {
  //     console.log("Unmounting NoteList.");
  //     source.cancel();
  //   };
  // }, [update]);

  // const onSelect = (notes: any) => {
  //   selectedNote === notes._id
  //     ? history.push({
  //         pathname: "/editor",
  //         state: {
  //           id: notes._id,
  //           body: notes.body,
  //           updatedAt: notes.updatedAt,
  //         },
  //       })
  //     : setSelectedNote(notes._id);
  //   setIsSelected(notes._id);
  //   console.log(`note ${notes._id} selected!`);
  // };

  // const addNote = () => {
  //   const note = {
  //     title: "set set title",
  //     body: "this is the body",
  //   };

  //   axios
  //     .post("http://localhost:5000/notes/create", note)
  //     .then(() => setUpdate(!update))
  //     .then(() => console.log("New note added!"))
  //     .then(() => setSelectedNote(""));
  // };

  // const deleteNote = (id: any) => {
  //   axios
  //     .delete("http://localhost:5000/notes/" + id)
  //     .then(() => setUpdate(!update))
  //     .then(() => console.log("Note deleted."))
  //     .then(() => setSelectedNote(""))
  //     .catch(() => {
  //       console.log("no note selected");
  //     });
  // };

  return (
    <div className={style.folderList}>
      <div className={style.folderContainer}>
        <div className={style.folderDiv}>
          <div className={style.folders}>
            <div className={style.iconDiv}></div>
            <div className={style.titleDiv}></div>
          </div>
        </div>
      </div>
      <div className={style.toolDiv}>
        <button className={style.addBtn}>
          <Add />
        </button>
        <button className={style.deleteBtn}>
          <Delete />
        </button>
      </div>
    </div>
  );
}
