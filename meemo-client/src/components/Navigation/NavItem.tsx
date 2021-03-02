import React from "react";
import { Link } from "react-router-dom";
import style from "./Navigation.module.scss";

interface Props {
  data: {
    name: string;
    menuId: number;
    state: boolean;
    address: string;
  };

  handleNavColor: Function;
}

const NavItem: React.FC<Props> = ({ data, handleNavColor }) => {
  const { name, menuId, state, address } = data;

  const handleOnOff = () => {
    handleNavColor(menuId);
  };
  return (
    <Link
      to={`/${address}`}
      onClick={handleOnOff}
      className={state ? style.nav_menu_checked : style.nav_menu}
    >
      {name}
    </Link>
  );
};

export default NavItem;
