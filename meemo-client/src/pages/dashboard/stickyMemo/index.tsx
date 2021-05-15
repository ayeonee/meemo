import { useState, useEffect } from "react";
import RMDEditor from "rich-markdown-editor";
import axios from "axios";
import debounce from "lodash/debounce";
import { UserIdType } from "../../../_types/authTypes";
import { BASE_URL } from "../../../_data/urlData";
import style from "../styles/StickyMemo.module.scss";
import style_mode from "../styles/modeColor.module.scss";

function StickyMemo({ userIdInfo, modeInfo }: UserIdType): JSX.Element {
  const [noteId, setNoteId] = useState<string>("");
  const [body, setBody] = useState<string>("");

  // useEffect(() => {
  //   localStorage.setItem("meemo-user-id", "testmeemo");
  // }, []);

  useEffect(() => {
    getBody(userIdInfo);

    return () => {
      setBody("");
      setNoteId("");
    };
  }, []);

  const getBody = async (userId: string | null) => {
    const res = await axios.get(BASE_URL + "/stickynote");
    res.data.forEach((note: any) => {
      if (note.userId === userId) {
        setBody(note.body);
        setNoteId(note._id);
      }
    });
  };

  const handleChange = debounce((value) => {
    let source = axios.CancelToken.source();
    const noteInfo = {
      body: `${value()}`,
    };
    try {
      axios
        .put(BASE_URL + "/stickynote/" + noteId, noteInfo, {
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
      >
        <RMDEditor
          id="example"
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
