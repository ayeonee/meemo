export type IInput = {
  name: string;
  place: string;
};

export type ISchedule = {
  index: number;
  date: number;
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
};

export type Schedule = Array<ISchedule>;

export type IData = {
  id: number;
  name: string;
  place: string;
  schedule: Schedule;
};

export type AllData = IData[];

export type DataProps = {
  addData: Function;
  allData: AllData;
};
