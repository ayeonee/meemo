import { DARK, LIGHT } from "../_types/actionTypes";

export const darkModeAction = () => {
  localStorage.setItem("meemo-mode", "dark");
  return {
    type: DARK,
    mode: "dark",
  };
};

export const lightModeAction = () => {
  localStorage.setItem("meemo-mode", "light");
  return {
    type: LIGHT,
    mode: "light",
  };
};
