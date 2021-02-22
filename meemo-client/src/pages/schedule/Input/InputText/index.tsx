import { IInput } from "../../../../lib/types/scheduleTypes";
import style from "../InputBoxStyle.module.scss";

interface Props {
  input: IInput;
  onChangeTxt: React.ChangeEventHandler;
}

const InputText: React.FC<Props> = ({ input, onChangeTxt }) => {
  return (
    <>
      <input
        className={style.input_content}
        type="text"
        name="name"
        value={input.name}
        onChange={onChangeTxt}
        placeholder="일정(필수입력)"
      />
      <input
        className={style.input_content}
        type="text"
        name="place"
        value={input.place}
        onChange={onChangeTxt}
        placeholder="장소"
      />
    </>
  );
};

export default InputText;
