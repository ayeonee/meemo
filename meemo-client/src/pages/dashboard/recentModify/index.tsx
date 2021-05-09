import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import style from "../styles/RecentModify.module.scss";
import axios from "axios";
import moment from "moment";
import { Notes } from "@material-ui/icons";

type NoteInfo = {
  _id: string;
  title: string;
  body: string;
  parentId: string;
  createdAt: string;
  updatedAt: string;
};

type FolderInfo = {
  _id: string;
  title: string;
  updatedAt: string;
  createdAt: string;
};

function RecentModify(): JSX.Element {
  const [notes, setNotes] = useState<NoteInfo[]>([]);
  const [folders, setFolders] = useState<FolderInfo[]>([]);

  const history = useHistory();

  async function getNoteData() {
    await axios.get("https://meemo.kr/api/notes").then((response) => {
      setNotes(response.data);
    });
  }

  async function getFolderData() {
    await axios.get("https://meemo.kr/api/folders").then((response) => {
      setFolders(response.data);
    });
  }

  useEffect(() => {
    getNoteData();
    getFolderData();
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
      updatedAt: moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
    });
  });

  noteItem.sort((a, b) => {
    return a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0;
  });

  const onClick = (parentId: string, noteId: string) => {
    for (let i = 0; i < folders.length; i++) {
      if (folders[i]._id === parentId) {
        history.push({
          pathname: `folders/${folders[i].title}/${noteId}`,
        });
        break;
      }
    }
  };

  return (
    <div className={style.recent_modify}>
      <div className={style.title}>Recently Modified Note</div>
      <div className={style.note_wrapper}>
        {
          <>
            {noteItem.map((item, index) => {
              if (index < 4) {
                return (
                  <div key={index} className={style.note_container}>
                    <div
                      className={style.note_div}
                      onClick={() => onClick(item.parentId, item._id)}
                    >
                      <div className={style.icon_div}>
                        <Notes className={style.note_icon} />
                      </div>
                      <div className={style.title_div}>
                        <p>{item.title}</p>
                      </div>
                      <div className={style.time_div}>
                        <p>{item.updatedAt.substring(0, 16)}</p>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </>
        }
      </div>
    </div>
  );
}

export default RecentModify;
