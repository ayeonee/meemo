type NoteInfo = {
  title: string;
  body: string;
  updatedAt: string;
};

function ShowNoteInfo({ title, body, updatedAt }: NoteInfo): JSX.Element {
  console.log(title);
  return (
    <>
      <p>
        <b>{title}</b>
        <p>{body}</p>
        <small>최근 수정: {new Date(updatedAt).toLocaleString()}</small>
      </p>
    </>
  );
}

export default ShowNoteInfo;
