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
  console.log(notes);

  return (
    <div className={style.recent_modify}>
      <div className={style.title}>Recent Modified Note</div>
    </div>
  );
}

export default RecentModify;
