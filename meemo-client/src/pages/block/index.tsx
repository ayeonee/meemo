import { useState, useEffect } from "react";
import style from "./styles/Block.module.scss";
import style_hidden from "../../styles/hidden.module.scss";
import block from "../../img/block.svg";
export default function BlockPage(): JSX.Element {
  // const [blockVisible, setBlockVisible] = useState<boolean>(false);

  // useEffect(() => {
  //   const userId = localStorage.getItem("meemo-user-id");
  //   if (userId !== null || userId !== undefined || !userId) {
  //     setBlockVisible(true);
  //   }
  // }, []);

  return (
    <div className={style.block_wrapper}>
      <h1 className={style.block_title}>LOGIN FIRST!</h1>
      <div className={style.block_section}>
        <img src={`${block}`} alt="block icon" />
        <div className={style.script}>
          <p>로그인을 먼저 진행해주세요.</p>
          <p>인터넷이 연결되어있지 않거나 로그인이 되어있지 않습니다.</p>
        </div>
      </div>
    </div>
  );
}
