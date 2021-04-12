import { Link } from "react-router-dom";
import style from "./Navigation.module.scss";

interface NavProps {
  data: {
    name: string;
    menuId: number;
    state: boolean;
    address: string;
  };

  handleNavColor: Function;
}

function NavItem({ data, handleNavColor }: NavProps): JSX.Element {
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
}

export default NavItem;
