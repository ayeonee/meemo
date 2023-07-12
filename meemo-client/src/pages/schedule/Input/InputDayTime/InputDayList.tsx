import { useSelector } from "react-redux";
import { RootState } from "../../../../reducers";
import style from "../../styles/InputBoxStyle.module.scss";
import style_mode from "../../styles/modeColor.module.scss";
interface InputDayListProps {
  data: {
    id: number;
    name: string;
    checked: boolean;
  };
  handleToggle: Function;
}

export default function InputDayList({
  data,
  handleToggle,
}: InputDayListProps): JSX.Element {
  const modeInfo = useSelector((state: RootState) => state.modeReducer.mode);
  const { name, id, checked } = data;

  const handleOnOff = () => {
    handleToggle(id);
  };

  return (
    <li
      className={
        checked
          ? [
              style.day_check_true,
              modeInfo === "light"
                ? style_mode.day_check_true_light
                : style_mode.day_check_true_dark,
            ].join(" ")
          : [
              style.day_check,
              modeInfo === "light"
                ? style_mode.day_check_light
                : style_mode.day_check_dark,
            ].join(" ")
      }
      onClick={handleOnOff}
      value={id}
    >
      {name}
    </li>
  );
}
