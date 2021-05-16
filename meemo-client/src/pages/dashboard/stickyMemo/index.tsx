import { useState, useEffect } from "react";
import RMDEditor from "rich-markdown-editor";
import axios from "axios";
import debounce from "lodash/debounce";
import { UserIdType } from "../../../_types/authTypes";
import { BASE_URL } from "../../../_data/urlData";
import style from "../styles/StickyMemo.module.scss";

function StickyMemo({ userIdInfo }: UserIdType): JSX.Element {
  const [noteId, setNoteId] = useState<string>("");
  const [body, setBody] = useState<string>("");

  useEffect(() => {
    console.log("first useEffect");
    getBody(userIdInfo);

    return () => {
      setBody("");
      setNoteId("");
    };
  }, []);

  const getBody = async (userId: string | null) => {
    try {
      const res = await axios.get(BASE_URL + "/stickynote/user/" + userId);
      res.data.forEach((note: any) => {
        setBody(note.body);
        setNoteId(note._id);
      });
    } catch {
      console.log(userIdInfo);
      const stickymemoInit = {
        body: "",
        userId: userIdInfo,
      };
      console.log(stickymemoInit);
      axios
        .post(BASE_URL + "/stickynote/create", stickymemoInit)
        .then((res) => console.log(res.data));
    }
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
    <div className={style.sticky_memo}>
      <div className={style.title}>STICKY MEMO</div>
      <div className={style.sub_title}>
        <span>간단한 메모를 작성할 수 있습니다.</span>
      </div>
      <div className={style.sticky_wrapper}>
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
          dark={false}
        />
      </div>
    </div>
  );
}

export default StickyMemo;
