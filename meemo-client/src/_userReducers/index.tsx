import { combineReducers } from "redux";
import user from "./userReducer";

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
