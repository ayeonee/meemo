import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import debounce from "lodash/debounce";
import RMDEditor from "rich-markdown-editor";
import style from "../styles/Editor.module.scss";

import RouteShow from "../misc/RouteShow";

import fs from "fs";

interface Props {}

const YoutubeEmbed: React.FC<any> = (props) => {
  const { attrs } = props;
  const videoId = attrs.matches[1];

  return (
    <iframe
      className={props.isSelected ? "ProseMirror-selectednode" : ""}
      src={`https://www.youtube.com/embed/${videoId}?modestbranding=1`}
      width="100%"
      height="400px"
    />
  );
};

export default function Editor(): JSX.Element {
  let history = useHistory<any>();
  const [value, setValue] = useState<any>(history.location.state.body);

  //title update uses put; editor body uses post + update.
  //to fix, add another prop in popup to get the body from the editor and feed in put.
  const handleChange = debounce((value) => {
    let source = axios.CancelToken.source();
    const noteInfo = {
      body: `${value()}`,
    };
    try {
      axios
        .post(
          "https://meemo.kr/api/notes/update/" + history.location.state.id,
          noteInfo,
          {
            cancelToken: source.token,
          }
        )
        .then((res) => console.log(res.data));
    } catch (err) {
      // Not sure that this is the right way to cancel the request. Might contain unknown problems.
      // check if can fix the original error which is err
      source.cancel();
      console.log(err, "\nOperation canceled by the user.");
    }
  }, 1000);

  return (
    <div className={style.wrapper}>
      <RouteShow
        type="editor"
        folderId={history.location.state.folderId}
        folderTitle={history.location.state.folderTitle}
        noteTitle={history.location.state.title}
      />
      <div className={style.editor}>
        {/* need thorough study of each prop, such as image upload */}
        <RMDEditor
          id="example"
          readOnly={false}
          readOnlyWriteCheckboxes
          value={value}
          defaultValue={value}
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
          uploadImage={(file) => {
            // console.log("File upload triggered: ", file);

            // check if the file is an image, and reject if not;

            const data = new FormData();
            data.append("imgFile", file);

            return new Promise(async (resolve) => {
              const res = await axios.post(
                "http://localhost:5000/api/s3/upload",
                data
              );
              resolve(res.data);
            });
          }}
          embeds={[
            {
              title: "YouTube",
              keywords: "youtube video tube",
              icon: () => (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/75/YouTube_social_white_squircle_%282017%29.svg"
                  width={24}
                  height={24}
                />
              ),
              matcher: (url: any) => {
                return url.match(
                  /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([a-zA-Z0-9_-]{11})$/i
                );
              },
              component: YoutubeEmbed,
            },
          ]}
          dark={false}
          autoFocus
        />
      </div>
    </div>
  );
}
