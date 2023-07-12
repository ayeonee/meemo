import { DARK, LIGHT } from "../_types/action";
import { ModeType } from "../_types/mode";

const modeReducer = (
  state = {
    mode: "light",
  },
  action: ModeType
) => {
  switch (action.type) {
    case DARK:
      return { mode: action.mode };

    case LIGHT:
      return { mode: action.mode };

    default:
      return state;
  }
};

export default modeReducer;
