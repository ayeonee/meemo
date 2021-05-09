import { Input } from "../../../../_types/scheduleTypes";
import style from "../../styles/InputBoxStyle.module.scss";

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
        placeholder="강의명을 입력해주세요"
      />
      <input
        className={style.input_content}
        type="text"
        name="place"
        value={input.place}
        onChange={onChangeTxt}
        placeholder="장소를 입력해주세요"
      />
    </>
  );
}

export default InputText;
