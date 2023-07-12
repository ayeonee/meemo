import { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import NavItem from "./NavItem";
import DarkMode from "../DarkMode";
import logo from "../../img/logo.svg";
import logoDark from "../../img/logo_dark.svg";
import logout from "../../img/logout.svg";
import logoutDark from "../../img/logout_dark.svg";
import removeLocalStorage from "../../hooks/removeLocalStorage";
import style from "./styles/Navigation.module.scss";
import style_hidden from "../../styles/hidden.module.scss";
import style_mode from "./styles/modeColor.module.scss";

import { useSelector } from "react-redux";
import { RootState } from "../../reducers";

function Navigation({
  location: { pathname },
}: {
  location: {
    pathname: string;
  };
}): JSX.Element {
  const modeInfo = useSelector((state: RootState) => state.modeReducer.mode);
  const userName = localStorage.getItem("meemo-user-name");
  const [media, setMedia] = useState<boolean>(false);
  const [menuColor, setMenuColor] = useState<
    {
      name: string;
      state: boolean;
      address: string;
    }[]
  >([
    { name: "Home", state: true, address: "/home" },
    { name: "To-Do List", state: false, address: "/todo" },
    { name: "Schedule", state: false, address: "/schedule" },
    { name: "Folders", state: false, address: "/folders" },
    { name: "Calendar", state: false, address: "/calendar" },
  ]);

  const handleNavColor = (address: string) => {
    setMenuColor(
      menuColor.map((elem) =>
        elem.address.substring(0, 5) === address.substring(0, 5)
          ? { ...elem, state: true }
          : { ...elem, state: false }
      )
    );
  };

  const onClickLogout = () => {
    axios
      .get("/api/users/logout")
      .then((res) => {
        if (res.data.success) {
          removeLocalStorage();
        } else {
          alert("failed");
        }
      })
      .then(() => (document.location.href = "/auth"));
  };

  const onClickBurger = () => {
    if (media) {
      setMedia(false);
    } else {
      setMedia(true);
    }
  };

  useEffect(() => {
    handleNavColor(pathname);
  }, [pathname]);

  return (
    <div
      className={
        pathname === "/auth" || pathname === "/"
          ? style_hidden.hidden
          : [
              style.nav_wrapper,
              modeInfo === "light"
                ? style_mode.nav_wrapper_light
                : style_mode.nav_wrapper_dark,
            ].join(" ")
      }
    >
      <nav className={style.nav_inside}>
        <div
          className={media ? style.burger_toggle : style.burger_menu}
          onClick={onClickBurger}
        >
          <div className={style.burger_line1}></div>
          <div className={style.burger_line2}></div>
          <div className={style.burger_line3}></div>
        </div>

        <Link to="/home">
          <img
            className={style.logo}
            src={modeInfo === "light" ? `${logo}` : `${logoDark}`}
            alt="logo"
            onClick={() => handleNavColor("/home")}
          />
        </Link>

        <div
          className={
            media
              ? [
                  style.nav_items_on,
                  modeInfo === "light"
                    ? style_mode.nav_items_light
                    : style_mode.nav_items_dark,
                ].join(" ")
              : [
                  style.nav_items_off,
                  modeInfo === "light"
                    ? style_mode.nav_items_light
                    : style_mode.nav_items_dark,
                ].join(" ")
          }
        >
          <div className={style.nav_menus}>
            {menuColor.map((data) => (
              <NavItem
                data={data}
                handleNavColor={handleNavColor}
                key={data.address}
                modeInfo={modeInfo}
                offNav={() => setMedia(false)}
              />
            ))}
          </div>

          <div className={style.user_menu}>
            <p
              className={[
                style.nav_username,
                modeInfo === "light"
                  ? style_mode.nav_username_light
                  : style_mode.nav_username_dark,
              ].join(" ")}
            >
              {userName !== null && userName.length > 5
                ? userName.substring(0, 4) + "..."
                : userName}
              님의 미-모
            </p>
            <div onClick={onClickLogout} className={style.logout_wrapper}>
              <img
                className={style.logout_icon}
                src={modeInfo === "light" ? `${logout}` : `${logoutDark}`}
                alt="logout"
              />
              <button
                className={[
                  style.logout_btn,
                  modeInfo === "light"
                    ? style_mode.logout_btn_light
                    : style_mode.logout_btn_dark,
                ].join(" ")}
              >
                로그아웃
              </button>
            </div>
          </div>

          <div className={style.dark_mode_wrapper}>
            <DarkMode pathname={pathname} />
            <p
              className={
                modeInfo === "light"
                  ? style.mode_toggle_light
                  : style.mode_toggle_dark
              }
            >
              {modeInfo === "light" ? "Dark" : "Light"}
              -Mode
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
