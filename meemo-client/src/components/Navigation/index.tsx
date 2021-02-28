import React from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.svg";
import style from "./Navigation.module.scss";

interface Props {}

const Navigation: React.FC<Props> = () => {
  return (
    <div className={style.nav_wrapper}>
      <div className={style.nav_inside}>
        <div className={style.nav_items}>
          <img className={style.logo} src={`${logo}`} alt="logo" />
          <div className={style.nav_menus}>
            <Link to="/todo" className={style.nav_menu}>
              할 일
            </Link>
            <Link to="/schedule" className={style.nav_menu}>
              시간표
            </Link>
            <Link to="/postlist" className={style.nav_menu}>
              노트 목록
            </Link>
            <Link to="/calender" className={style.nav_menu}>
              캘린더
            </Link>
          </div>
        </div>
        <button className={style.logout_btn}>로그아웃</button>
      </div>
    </div>
  );
};

export default Navigation;
