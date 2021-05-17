import { useState, useEffect, useRef } from "react";
import RMDEditor from "rich-markdown-editor";
import axios from "axios";
import debounce from "lodash/debounce";
import { UserIdType } from "../../../_types/authTypes";
import { Mode } from "../../../_types/modeTypes";
import { BASE_URL } from "../../../_data/urlData";
import style from "../styles/StickyMemo.module.scss";
import style_mode from "../styles/modeColor.module.scss";

function StickyMemo({ userIdInfo, modeInfo }: UserIdType & Mode): JSX.Element {
  const [body, setBody] = useState<string>("");

  const [gotUserId, setGotUserId] = useState<boolean>(false);

  const [getUserId, setGetUserId] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  const editor: any = useRef();

  let source = axios.CancelToken.source();

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
    } else {
      setGotUserId(true);
      setUpdate(!update);
    }
  };

  const getBody = async (userId: string | null) => {
    if (gotUserId === true) {
      try {
        const res = await axios.get(BASE_URL + "/stickynote/user/" + userId);
        if (res.data.length === 0) {
          const stickymemoInit = {
            body: "",
            userId: userIdInfo,
          };
          axios
            .post(BASE_URL + "/stickynote/create", stickymemoInit)
            .then((res) => console.log(res.data));
        } else {
          res.data.forEach((note: any) => {
            setBody(note.body);
          });
        }
      } catch (err) {
        throw err;
      }
    }
  };

  const handleChange = debounce((value) => {
    const noteInfo = {
      body: `${value()}`,
    };
    try {
      axios
        .put(BASE_URL + "/stickynote/user/" + userIdInfo, noteInfo, {
          cancelToken: source.token,
        })
        .then((res) => console.log(res.data));
    } catch (err) {
      source.cancel();
      console.log(err, "\nOperation canceled by the user.");
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
          if (e.target.className === "StickyMemo_sticky_wrapper__Q7axL") {
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
          handleDOMEvents={
            {
              // focus: () => console.log("FOCUS"),
              // blur: () => console.log("BLUR"),
              // paste: () => console.log("PASTE"),
              // touchstart: () => console.log("TOUCH START"),
            }
          }
          onSave={(options) => console.log("Save triggered", options)}
          onCancel={() => console.log("Cancel triggered")}
          onChange={handleChange}
          onClickLink={(href, event) =>
            console.log("Clicked link: ", href, event)
          }
          onHoverLink={(event: any) => {
            console.log("Hovered link: ", event.target.href);
            return false;
          }}
          onClickHashtag={(tag, event) =>
            console.log("Clicked hashtag: ", tag, event)
          }
          onCreateLink={(title) => {
            // Delay to simulate time taken for remote API request to complete
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                if (title !== "error") {
                  return resolve(
                    `/doc/${encodeURIComponent(title.toLowerCase())}`
                  );
                } else {
                  reject("500 error");
                }
              }, 1500);
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
