import style from "../DashBoard.module.scss";
import { noteData } from "./noteData";

type NoteInfo = {
  _id: string;
  title: string;
  body: string;
  parentId: string;
  createdAt: string;
  updatedAt: string;
};

function RecentModify(): JSX.Element {
  const notes: Promise<NoteInfo[]> = noteData();
  const noteItem: NoteInfo[] = [];

  notes
    .then((note) => {
      note.map((item) => {
        noteItem.push({
          _id: item._id,
          title: item.title,
          body: item.body,
          parentId: item.parentId,
          createdAt: item.createdAt,
          //최근 업데이트 시간 비교 위해 변환
          updatedAt: item.updatedAt.substr(0, 19).replace(/:|-|T/g, ""),
        });
      });
    })
    .then(() => {
      noteItem.sort((a, b) => {
        return a.updatedAt < b.updatedAt ? 1 : a.updatedAt > b.updatedAt ? -1 : 0;
      });
    });

  return (
    <div className={style.recent_modify}>
      <div className={style.title}>Recent Modified Note</div>
      <div className={style.note_wrapper}>
        <div>
          {noteItem.map((item) => (
            <div className={style.schedule_list}>
              <b>{item.title}</b>
              <p>{item.body}</p>
              <small>최근 수정: {new Date(item.updatedAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecentModify;
