import { Link } from "react-router-dom";
import style from "./styles/Navigation.module.scss";
import style_mode from "./styles/modeColor.module.scss";

interface NavProps {
  data: {
    name: string;
    state: boolean;
    address: string;
  };
  modeInfo: string;
  handleNavColor: Function;
  offNav: Function;
}

function NavItem({
  data,
  handleNavColor,
  offNav,
  modeInfo,
}: NavProps): JSX.Element {
  const { name, state, address } = data;

  const handleOnOff = () => {
    handleNavColor(address);
    offNav();
  };

  return (
    <Link
      to={`${address}`}
      onClick={handleOnOff}
      className={
        state
          ? [
              style.nav_menu_checked,
              modeInfo === "light"
                ? style_mode.nav_menu_checked_light
                : style_mode.nav_menu_checked_dark,
            ].join(" ")
          : [
              style.nav_menu,
              modeInfo === "light"
                ? style_mode.nav_menu_light
                : style_mode.nav_menu_dark,
            ].join(" ")
      }
    >
      {name}
    </Link>
  );
}

export default NavItem;
