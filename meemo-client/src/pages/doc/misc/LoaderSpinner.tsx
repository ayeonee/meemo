import { CircularProgress } from "@material-ui/core";

import style from "../styles/LoaderSpinner.module.scss";

type LoaderSpinnerProps = {
  type: string;
};

export default function LoaderSpinner(props: LoaderSpinnerProps): JSX.Element {
  const { type } = props;
  return (
    <>
      {type === "" ? (
        <div className={style.wrapper}>
          <CircularProgress
            className={style.spinner}
            color="primary"
            size="40px"
            thickness={5.5}
          />
        </div>
      ) : (
        <div className={style.wrapperType}>
          <CircularProgress
            className={style.spinnerType}
            color="primary"
            size="20px"
            thickness={3}
          />
        </div>
      )}
    </>
  );
}
