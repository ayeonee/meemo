import { useState, useEffect } from "react";
import RMDEditor from "rich-markdown-editor";
import axios from "axios";

import { BASE_URL } from "../../../_data/urlData";

import style from "../styles/StickyMemo.module.scss";

function StickyMemo(): JSX.Element {
  const [user, setUser] = useState("");
  const [body, setBody] = useState<string>("");
  const [updateBody, setUpdateBody] = useState<string>("");

  useEffect(() => {
    getBody(localStorage.getItem("meemo-user-id"));
  }, []);

  const getBody = async (userId: string | null) => {
    const res = await axios.get(BASE_URL + "/dashnote");
    res.data.forEach((note: any) => {
      if (note.userId === userId) {
        setBody(note.body);
      }
    });
  };

  return (
    <div className={style.sticky_memo}>
      <div className={style.title}>Sticky Memo</div>
      <div className={style.sticky_wrapper}>
        <RMDEditor
          id="example"
          readOnly={false}
          readOnlyWriteCheckboxes
          // value={}
          placeholder={"메모를 적어보세요..."}
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
          onChange={(value) => console.log(value)}
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
