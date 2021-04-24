type NoteInfo = {
  title: string;
  body: string;
  updatedAt: string;
};

function ShowNoteInfo({ title, body, updatedAt }: NoteInfo): JSX.Element {
  return (
    <>
      <p>
        <b>{title}</b>
        <small>
          최근 수정:{" "}
          {updatedAt.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, "$1-$2-$3 $4:$5:$6")}
        </small>
      </p>
    </>
  );
}

export default ShowNoteInfo;
