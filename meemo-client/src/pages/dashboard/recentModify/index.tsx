import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../../../constants/url";
import style_mode from "../styles/modeColor.module.scss";
import style from "../styles/RecentModify.module.scss";
import axios from "axios";
import moment from "moment";
import { UserIdInfo } from "../../../_types/auth";
import { Mode } from "../../../_types/mode";
import { Notes } from "@material-ui/icons";

interface NoteInfo {
  _id: string;
  title: string;
  body: string;
  parentId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

interface FolderInfo {
  _id: string;
  title: string;
  userId: string;
  updatedAt: string;
  createdAt: string;
}

function RecentModify({
  userIdInfo,
  modeInfo,
}: UserIdInfo & Mode): JSX.Element {
  const [notes, setNotes] = useState<NoteInfo[]>([]);
  const [folders, setFolders] = useState<FolderInfo[]>([]);
  const [rearrangedNotes, setRearrangedNotes] = useState<NoteInfo[]>([]);

  const history = useHistory();

  const getNoteData = async (_userId: string | null) => {
    const noteData = await axios({
      method: "GET",
      baseURL: BASE_URL,
      url: "/notes",
    });

    if (!noteData.data) {
      return;
    }

    setNotes(
      noteData.data.filter(({ userId }: NoteInfo) => userId === _userId)
    );
  };

  const getFolderData = async (_userId: string | null) => {
    const folderData = await axios({
      method: "GET",
      baseURL: BASE_URL,
      url: "/folders",
    });

    if (!folderData.data) {
      return;
    }

    setFolders(
      folderData.data.filter(({ userId }: NoteInfo) => userId === _userId)
    );
  };

  const sortNoteItems = () => {
    setRearrangedNotes((rearrangedNotes) =>
      rearrangedNotes.sort((a, b) => {
        return a.updatedAt < b.updatedAt
          ? 1
          : a.updatedAt > b.updatedAt
          ? -1
          : 0;
      })
    );
  };

  const arrangeNoteItems = () => {
    const newNotes = notes.map((item) => ({
      _id: item._id,
      title: item.title,
      body: item.body,
      parentId: item.parentId,
      userId: item.userId,
      createdAt: item.createdAt,
      //최근 업데이트 시간 비교 위해 변환
      updatedAt: moment(item.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
    }));

    setRearrangedNotes(newNotes);
    sortNoteItems();
  };

  const goSelectedNotePage = (parentId: string, noteId: string) => {
    const selectedFolder = folders.find(({ _id }) => _id === parentId);

    if (selectedFolder) {
      history.push({
        pathname: `folders/${selectedFolder.title}/${noteId}`,
      });
    }
  };

  useEffect(() => {
    getNoteData(userIdInfo);
    getFolderData(userIdInfo);

    return () => {
      setNotes([]);
      setFolders([]);
    };
  }, []);

  useEffect(() => {
    arrangeNoteItems();
  }, [notes]);

  return (
    <div
      className={[
        style.recent_modify,
        modeInfo === "light"
          ? style_mode.recent_modify_light
          : style_mode.recent_modify_dark,
      ].join(" ")}
    >
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
            {rearrangedNotes.slice(0, 4).map((item, index) => {
              return (
                <div key={item._id} className={style.note_container}>
                  <div
                    className={style.note_div}
                    onClick={() => goSelectedNotePage(item.parentId, item._id)}
                  >
                    <div className={style.icon_div}>
                      <Notes className={style.note_icon} />
                    </div>
                    <p className={style.title_div}>{item.title}</p>
                    <p className={style.time_div}>
                      {item.updatedAt.substring(0, 16)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default RecentModify;
