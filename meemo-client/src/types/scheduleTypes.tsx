export type Input = {
  name: string;
  place: string;
};

export type Schedule = {
  index: number;
  date: number;
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
};

export type ScheduleArray = Array<Schedule>;

export type Data = {
  id: number;
  name: string;
  place: string;
  schedule: ScheduleArray;
};

export type AllData = Data[];

export type DataProps = {
  addData: Function;
  allData: AllData;
};
