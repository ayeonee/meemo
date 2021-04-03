import style from "../InputBoxStyle.module.scss";

type InputDayListProps = {
  data: {
    id: number;
    name: string;
    checked: boolean;
  };
  handleToggle: Function;
};

export default function InputDayList({
  data,
  handleToggle,
}: InputDayListProps): JSX.Element {
  const { name, id, checked } = data;

  const handleOnOff = () => {
    handleToggle(id);
  };

  return (
    <li
      className={checked ? style.day_check_true : style.day_check}
      onClick={handleOnOff}
      value={id}
    >
      {name}
    </li>
  );
}
