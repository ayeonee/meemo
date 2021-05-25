# 📗 &nbsp;나만의 온라인 스케쥴러, 미-모

<div align="center">
  <br/>
  <br/>
  <br/>
  <img src="https://user-images.githubusercontent.com/60544994/118817711-7afc1480-b8ee-11eb-8338-69af65085c1f.png"  width="320" />
  <br/>
  <br/>
  <h3>
    대학생들을 위한 가장 효율적인 스케쥴 관리법, me:emo 
  </h3>
  <br/>
  <br/>
</div>

## 🖥 WEB SITE

&nbsp;[https://meemo.kr](https://meemo.kr)
<br/>
<br/>

## 🤷‍♂️ Needs

언택트 시대를 살아가는 대학생들의 삶에서 가장 필요한 것은 무엇인가? 미모는 이 물음에 답하기 위해 기획되었습니다.

예기치 못한 전면 비대면 수업으로 학생들은 온라인으로 대학 생활을 보내고 있으며, 온라인 강의를 들으며 메모장이나 문서 작성 프로그램으로 필기합니다. **종이 노트는 더는 필요하지 않습니다.**<br/>
미모는 이들을 도와줍니다. **더욱 간편하게 필기를 하고 실시간으로 저장합니다. 할 일을 작성하고 달성도를 보여줍니다. 달력과 시간표를 통해 일정을 관리합니다.**

"너는 어떻게 공부하고 스케쥴을 관리해?" 라는 질문에 "미모를 사용해" 라는 대답으로 설명이 충분한 서비스가 되기를 기대합니다.
<br/>
<br/>

## ✍️ Service

#### 1. Dashboard

개인 스케쥴과 목표 달성치, 기타 **정보들에 대해 중앙 집중적으로 관리가 가능한 대시보드** 기능을 제공합니다.

#### 2. WYSIWIG Editor

**실시간으로 저장되는 위지위그 에디터 기능**을 탑재하였습니다. Text/Mark Down, Image, Youtube 등 문서 작성에 특화된 강력한 온라인 에디터 기능을 제공합니다. **노트/폴더 별로 정리가 가능**하여 효율적으로 문서를 관리할 수 있습니다.

#### 3. To-Do List

실제 노트에 기록하는 듯한 체킹 방식과 **목표 달성률을 제공하여 효과적으로 스케쥴을 관리**할 수 있습니다.

#### 4. Scheduler

강의나 일정 등을 손쉽게 등록할 수 있는 **시간표 기능**을 제공합니다.

#### 5. Calendar

**주/달 단위의 달력 기능**을 제공합니다. **간단한 메모와 일정을 작성**할 수 있으며, 효율적인 일정관리에 도움을 줍니다.

#### 6. Dark Mode

**라이트모드/다크모드 기능을 탑재**하여 색다른 감성과 분위기/시각적 보호를 제공합니다.
<br/>
<br/>

## 🔧 Development Stack

#### Front-End

- React, Typescript
- Css & Sass(styles), Material UI(icons)
- Redux

#### Back-End

- Node.js, Express.js, Javascript
- MongoDB, Mongoose
- AWS EC2/S3
- Json-Web-Token, Bcrypt
  <br/>

## 📞 API

#### External

- Google Login API
- Kakao Login API
- Google Map Geocoding API
- Weather API : https://api.openweathermap.org

#### Internal

- 인증 관련 API

  - `POST` /api/users/register : 회원가입
  - `POST` /api/users/login : 로그인
  - `GET` /api/users/auth : 인증
  - `GET` /api/users/logout : 로그아웃

- 기능 관련 API
  - `GET, POST, PUT` /api/stickynote/.. : 스티키 노트 저장, 수정, 데이터 불러오기
  - `GET, POST, PUT` /api/folders/.. : 유저별 폴더 저장, 수정, 데이터 불러오기
  - `GET, POST, PUT` /api/notes/.. : 유저/폴더 별 노트 리스트 저장, 수정, 데이터 불러오기
  - `GET, POST, PUT` /api/calendar/.. : 유저별 캘린더 저장, 수정, 데이터 불러오기
  - `POST` /api/save/todo : 할 일 목록(To-Do list) 저장
  - `POST` /api/get/todo : 유저별 할 일 목록(To-Do list) 데이터 불러오기
  - `POST` /api/save/schedule : 시간표 저장
  - `POST` /api/get/schedule : 유저별 시간표 데이터 불러오기
  - `POST` /api/s3/.. : 에디터 저장, 수정
    <br/>

## 🖼 Overview

<img src="https://user-images.githubusercontent.com/60544994/118839683-a76d5c00-b901-11eb-990c-74f64b625dea.png" width="480" />
<br/>

## Team. SongAZi

- [KIM AYEON](https://github.com/ayeonee) : Dashboard, Open Authentication(Google/KaKao)
- [LEEJEEWON](https://github.com/leejiwon6315) : Dashboard, Authentication/Authorization, Scheduler, To-Do List, Navigation, Dark Mode, Design & Style
- [Ben Jeong](https://github.com/benintheb) : Dashboard, Folder/Note List, WYSIWIG Editor, Calendar, AWS
