import style from "../DashBoard.module.scss";
import { Notes } from "@material-ui/icons";
import { useState, useEffect } from "react";
import axios from "axios";

type NoteInfo = {
  _id: string;
  title: string;
  body: string;
  parentId: string;
  createdAt: string;
  updatedAt: string;
};

function RecentModify(): JSX.Element {
  const [notes, setNotes] = useState<NoteInfo[]>([]);

  async function getNoteData() {
    await axios.get("https://meemo.kr/api/notes").then((response) => {
      setNotes(response.data);
    });
  }

  useEffect(() => {
    getNoteData();
  }, []);

  const noteItem: NoteInfo[] = [];

  notes.map((item) => {
    noteItem.push({
      _id: item._id,
      title: item.title,
      body: item.body,
      parentId: item.parentId,
      createdAt: item.createdAt,
      //최근 업데이트 시간 비교 위해 변환
      updatedAt: item.updatedAt.substr(0, 19).replace(/T/g, " "),
    });
  });

  noteItem.sort((a, b) => {
    return a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0;
  });

  return (
    <div className={style.recent_modify}>
      <div className={style.title}>Recent Modified Note</div>
      <div className={style.note_wrapper}>
        {
          <>
            {noteItem.map((item, index) => {
              if (index < 4) {
                return (
                  <div className={style.note_container}>
                    <div className={style.note_div}>
                      <div className={style.icon_div}>
                        <Notes className={style.note_icon} />
                      </div>
                      <div className={style.title_div}>
                        <p>{item.title}</p>
                      </div>
                      <div className={style.time_div}>
                        <small>최근 수정: {item.updatedAt}</small>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </>
        }
      </div>
    </div>
  );
}

export default RecentModify;
