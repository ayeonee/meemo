import { AllData } from "../../../_types/scheduleTypes";

//dummyData
//월:1~토:6

export const ScheduleData: AllData = [
  {
    id: "sda",
    name: "객체지향프로그래밍",
    place: "정보과학관",
    schedule: [
      {
        index: 0,
        date: 1,
        startHour: 10,
        startMin: 30,
        endHour: 11,
        endMin: 45,
      },
    ],
  },
  {
    id: "saddas",
    name: "VISUAL STORY",
    place: "정보과학관",
    schedule: [
      {
        index: 0,
        date: 2,
        startHour: 10,
        startMin: 30,
        endHour: 11,
        endMin: 45,
      },
      {
        index: 1,
        date: 4,
        startHour: 12,
        startMin: 0,
        endHour: 13,
        endMin: 15,
      },
    ],
  },
  {
    id: "dsadsadsa",
    name: "모바일시스템및응용",
    place: "온라인 강의",
    schedule: [
      {
        index: 0,
        date: 3,
        startHour: 13,
        startMin: 30,
        endHour: 14,
        endMin: 45,
      },
    ],
  },
  {
    id: "dsadsasda",
    name: "졸업프로젝트",
    place: "온라인 강의",
    schedule: [
      {
        index: 0,
        date: 2,
        startHour: 16,
        startMin: 30,
        endHour: 17,
        endMin: 45,
      },
    ],
  },
];
