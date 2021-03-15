import style from "../InputBoxStyle.module.scss";

interface Props {
  data: {
    id: number;
    name: string;
    checked: boolean;
  };
  handleToggle: Function;
}

function InputDayList({ data, handleToggle }: Props) {
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

export default InputDayList;
