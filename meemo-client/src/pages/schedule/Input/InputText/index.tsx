import { Mode } from "../../../../_types/mode";
import { Input } from "../../../../_types/schedule";
import style from "../../styles/InputBoxStyle.module.scss";
import style_mode from "../../styles/modeColor.module.scss";

type InputTextProps = {
  input: Input;
  onChangeTxt: React.ChangeEventHandler;
};

function InputText({ input, onChangeTxt, modeInfo }: InputTextProps & Mode) {
  return (
    <>
      <input
        className={[
          style.input_content,
          modeInfo === "light"
            ? style_mode.input_content_light
            : style_mode.input_content_dark,
        ].join(" ")}
        type="text"
        name="name"
        value={input.name}
        onChange={onChangeTxt}
        placeholder="일정을 입력해주세요"
      />
      <input
        className={[
          style.input_content,
          modeInfo === "light"
            ? style_mode.input_content_light
            : style_mode.input_content_dark,
        ].join(" ")}
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
