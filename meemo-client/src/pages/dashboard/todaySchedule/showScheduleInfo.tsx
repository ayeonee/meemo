type ScheduleInfo = {
  name: string;
  place: string;
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
};

function ShowScheduleInfo({
  name,
  place,
  startHour,
  startMin,
  endHour,
  endMin,
}: ScheduleInfo): JSX.Element {
  return (
    <>
      <p>
        <b>{name}</b>
      </p>
      <p>{place}</p>
      <p>
        {startHour}:{startMin} ~ {endHour}:{endMin}
      </p>
    </>
  );
}

export default ShowScheduleInfo;
