import { Input } from "../../../../_types/scheduleTypes";
import style from "../InputBoxStyle.module.scss";

type InputTextProps = {
  input: Input;
  onChangeTxt: React.ChangeEventHandler;
};

function InputText({ input, onChangeTxt }: InputTextProps): JSX.Element {
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
