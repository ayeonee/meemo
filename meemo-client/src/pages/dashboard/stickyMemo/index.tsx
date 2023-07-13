import { useState, useEffect, useRef } from "react";
import RMDEditor from "rich-markdown-editor";
import axios from "axios";
import debounce from "lodash/debounce";
import { UserIdInfo } from "../../../_types/auth";
import { Mode } from "../../../_types/mode";
import { BASE_URL } from "../../../constants/url";
import style from "../styles/StickyMemo.module.scss";
import style_mode from "../styles/modeColor.module.scss";

function StickyMemo({ userIdInfo, modeInfo }: UserIdInfo & Mode) {
  const [body, setBody] = useState<string>("");
  const [gotUserId, setGotUserId] = useState<boolean>(false);
  const [getUserId, setGetUserId] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  const editor: any = useRef();
  const source = axios.CancelToken.source();

  useEffect(() => {
    fetchUserId();
  }, [getUserId]);

  useEffect(() => {
    getBody(userIdInfo);

    return () => {
      setBody("");
      source.cancel();
    };
  }, [update]);

  const fetchUserId = () => {
    if (userIdInfo === "" || userIdInfo === undefined) {
      setGetUserId(!getUserId);

      return;
    }

    setGotUserId(true);
    setUpdate(!update);
  };

  const getBody = async (userId: string | null) => {
    if (!gotUserId) {
      return;
    }

    const res = await axios.get(BASE_URL + "/stickynote/user/" + userId);

    if (!res.data) {
      return;
    }

    if (res.data.length === 0) {
      const stickymemoInit = {
        body: "",
        userId: userIdInfo,
      };

      await axios.post(BASE_URL + "/stickynote/create", stickymemoInit);
      return;
    }

    res.data.forEach((note: any) => {
      setBody(note.body);
    });
  };

  const handleChange = debounce((value) => {
    const noteInfo = {
      body: `${value()}`,
    };

    try {
      axios.put(BASE_URL + "/stickynote/user/" + userIdInfo, noteInfo, {
        cancelToken: source.token,
      });
    } catch (err) {
      source.cancel();
    }
  }, 1000);

  return (
    <div
      className={[
        style.sticky_memo,
        modeInfo === "light"
          ? style_mode.sticky_memo_light
          : style_mode.sticky_memo_dark,
      ].join(" ")}
    >
      <div className={style.title}>STICKY MEMO</div>
      <div className={style.sub_title}>
        <span>간단한 메모를 작성할 수 있습니다.</span>
      </div>
      <div
        className={[
          style.sticky_wrapper,
          modeInfo === "light"
            ? style_mode.sticky_wrapper_light
            : style_mode.sticky_wrapper_dark,
        ].join(" ")}
        onClick={(e: any) => {
          if (
            e.target.className === "StickyMemo_sticky_wrapper__Q7axL " ||
            e.target.className ===
              "StickyMemo_sticky_wrapper__Q7axL modeColor_sticky_wrapper_light__2QDKe"
          ) {
            editor.current.focusAtEnd();
          }
        }}
      >
        <RMDEditor
          id="stickymemo"
          ref={editor}
          readOnly={false}
          readOnlyWriteCheckboxes
          value={body}
          placeholder={"메모를 적어보세요.."}
          defaultValue={body}
          scrollTo={window.location.hash}
          onCancel={() => console.log("Cancel triggered")}
          onChange={handleChange}
          onCreateLink={(title) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                if (title !== "error") {
                  return resolve(
                    `/doc/${encodeURIComponent(title.toLowerCase())}`
                  );
                }

                reject("500 error");
              }, 1000);
            });
          }}
          onShowToast={(message, type) => window.alert(`${type}: ${message}`)}
          dark={modeInfo === "dark" ? true : false}
        />
      </div>
    </div>
  );
}

export default StickyMemo;
