import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import NavItem from "./NavItem";
import logo from "../../img/logo.svg";
import style from "./Navigation.module.scss";

function Navigation() {
  const history = useHistory();
  const username = "User Name";
  const [menuColor, setMenuColor] = useState<
    {
      name: string;
      menuId: number;
      state: boolean;
      address: string;
    }[]
  >([
    { name: "To-Do List", menuId: 1, state: false, address: "todo" },
    { name: "Schedule", menuId: 2, state: true, address: "schedule" },
    { name: "Note List", menuId: 3, state: false, address: "notelist" },
    { name: "Calender", menuId: 4, state: false, address: "calender" },
  ]);

  const handleNavColor = (menuId: number) => {
    setMenuColor(
      menuColor.map((elem) =>
        elem.menuId === menuId
          ? { ...elem, state: true }
          : { ...elem, state: false }
      )
    );
  };

  const onClickLogout = () => {
    axios.get("/api/users/logout").then((res) => {
      if (res.data.success) {
        history.push("/login");
      } else {
        alert("failed");
      }
    });
  };

  return (
    <div className={style.nav_wrapper}>
      <div className={style.nav_inside}>
        <Link to="/schedule">
          <img className={style.logo} src={`${logo}`} alt="logo" />
        </Link>
        <div className={style.nav_items}>
          <div className={style.nav_menus}>
            {menuColor.map((data) => (
              <NavItem
                data={data}
                handleNavColor={handleNavColor}
                key={data.menuId}
              />
            ))}
          </div>
        </div>
        <div className={style.user_menu}>
          <p className={style.nav_username}>{username}님</p>
          <button className={style.logout_btn} onClick={onClickLogout}>
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
