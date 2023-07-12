import { combineReducers } from "redux";
import userReducer from "./userReducer";
import modeReducer from "./modeReducer";

const rootReducer = combineReducers({
  userReducer,
  modeReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
