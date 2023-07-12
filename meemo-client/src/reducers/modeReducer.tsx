import { DARK, LIGHT } from "../_types/actionTypes";
import { ModeType } from "../_types/modeTypes";

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
