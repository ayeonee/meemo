export interface Input {
  name: string;
  place: string;
}

export interface Schedule {
  index: number;
  date: number;
  startHour: number;
  startMin: number;
  endHour: number;
  endMin: number;
  code: string;
}

export type ScheduleArray = Array<Schedule>;

export type Data = {
  id: string;
  name: string;
  place: string;
  schedule: ScheduleArray;
};

export type AllData = Array<Data>;

export interface DataProps {
  addData: Function;
  allData: AllData;
}
