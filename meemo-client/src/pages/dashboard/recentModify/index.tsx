import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../../_data/urlData";
import style from "../styles/RecentModify.module.scss";
import axios from "axios";
import moment from "moment";
import { Notes } from "@material-ui/icons";

type NoteInfo = {
  _id: string;
  title: string;
  body: string;
  parentId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

type FolderInfo = {
  _id: string;
  title: string;
  userId: string;
  updatedAt: string;
  createdAt: string;
};

function RecentModify(): JSX.Element {
  const [notes, setNotes] = useState<NoteInfo[]>([]);
  const [folders, setFolders] = useState<FolderInfo[]>([]);
  const [rearrangedNotes, setRearrangedNotes] = useState<NoteInfo[]>([]);

  const history = useHistory();

  /* user id별로 가져오는 것 해야 함 */
  const getNoteData = async (userId: string | null) => {
    await axios({
      method: "GET",
      baseURL: BASE_URL,
      url: "/notes",
    })
      .then((res) => {
        res.data.forEach((item: any) => {
          if (item.userId === userId) {
            setNotes(notes.concat(item));
          }
        });
      })
      .catch((err) => console.log(err));
  };

  const getFolderData = async (userId: string | null) => {
    await axios({
      method: "GET",
      baseURL: BASE_URL,
      url: "/folders",
    })
      .then((res) => {
        res.data.forEach((item: any)=>{
          if(item.userId === userId){
            setFolders(folders.concat(item));
          }
        });
        setFolders(res.data);
      })
      .catch((err) => console.log(err));
  };

  const sortNoteItems = () => {
    setRearrangedNotes((rearrangedNotes) =>
      rearrangedNotes.sort((a, b) => {
        return a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0;
      })
    );
  };

  const arrangeNoteItems = () => {
    notes.forEach((item) => {
      setRearrangedNotes((rearrangedNotes) =>
        rearrangedNotes.concat({
          ...rearrangedNotes,
          _id: item._id,
          title: item.title,
          body: item.body,
          parentId: item.parentId,
          createdAt: item.createdAt,
          //최근 업데이트 시간 비교 위해 변환
          updatedAt: moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
        })
      );
    });

    sortNoteItems();
  };

  const goSelectedNotePage = (parentId: string, noteId: string) => {
    for (let i = 0; i < folders.length; i++) {
      if (folders[i]._id === parentId) {
        history.push({
          pathname: `folders/${folders[i].title}/${noteId}`,
        });
        break;
      }
    }
  };

  useEffect(() => {
    getNoteData(localStorage.getItem("meemo-user-id"));
    getFolderData(localStorage.getItem("meemo-user-id"));
  }, []);

  useEffect(() => {
    arrangeNoteItems();
  }, [notes]);

  return (
    <div className={style.recent_modify}>
      <div className={style.title}>RECENTLY MODIFIED NOTE</div>
      <div className={style.sub_title}>
        <span>최근 수정된 목록</span>
      </div>
      {rearrangedNotes.length === 0 ? (
        <div className={style.null_message}>
          <p>생성된 노트가 없습니다.</p>
        </div>
      ) : (
        <div className={style.note_wrapper}>
          <div className={style.visible_notes}>
            {rearrangedNotes.map((item, index) => {
              if (index < 4) {
                return (
                  <div key={index} className={style.note_container}>
                    <div
                      className={style.note_div}
                      onClick={() => goSelectedNotePage(item.parentId, item._id)}
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
          </div>
        </div>
      )}
    </div>
  );
}

export default RecentModify;
