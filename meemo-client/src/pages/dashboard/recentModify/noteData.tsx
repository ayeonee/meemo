import axios from "axios";

type NoteInfo = {
  _id: string;
  title: string;
  body: string;
  parentId: string;
  createdAt: string;
  updatedAt: string;
};

export const noteData = () => {
  const notes: Promise<NoteInfo[]> = axios({
    method: "GET",
    url: "https://meemo.kr/api/notes",
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return notes;
};
