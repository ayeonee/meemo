import { Input } from "../../../../types/scheduleTypes";
import style from "../InputBoxStyle.module.scss";

interface Props {
  input: Input;
  onChangeTxt: React.ChangeEventHandler;
}

function InputText({ input, onChangeTxt }: Props) {
  return (
    <>
      <input
        className={style.input_content}
        type="text"
        name="name"
        value={input.name}
        onChange={onChangeTxt}
        placeholder="일정 (필수입력)"
      />
      <input
        className={style.input_content}
        type="text"
        name="place"
        value={input.place}
        onChange={onChangeTxt}
        placeholder="세부 사항"
      />
    </>
  );
}

export default InputText;
