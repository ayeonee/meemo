import { CircularProgress } from "@material-ui/core";

import style from "../styles/LoaderSpinner.module.scss";

export default function LoaderSpinner() {
  return (
    <div className={style.wrapper}>
      <CircularProgress
        className={style.spinner}
        color="primary"
        size="40px"
        thickness={5.5}
      />
    </div>
  );
}
