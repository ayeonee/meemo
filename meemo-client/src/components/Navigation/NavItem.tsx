import { Link } from "react-router-dom";
import style from "./Navigation.module.scss";

interface NavProps {
  data: {
    name: string;
    state: boolean;
    address: string;
  };

  handleNavColor: Function;
  offNav: Function;
}

function NavItem({ data, handleNavColor, offNav }: NavProps): JSX.Element {
  const { name, state, address } = data;

  const handleOnOff = () => {
    handleNavColor(address);
    offNav();
  };

  return (
    <Link
      to={`${address}`}
      onClick={handleOnOff}
      className={state ? style.nav_menu_checked : style.nav_menu}
    >
      {name}
    </Link>
  );
}

export default NavItem;
