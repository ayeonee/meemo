import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import debounce from "lodash/debounce";
import RMDEditor from "rich-markdown-editor";
import style from "../styles/Editor.module.scss";

import LoaderSpinner from "../misc/LoaderSpinner";
import RouteShow from "../misc/RouteShow";

import { BASE_URL } from "../../../_data/urlData";

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
  let { folderTitle, noteId }: any = useParams();

  const [update, setUpdate] = useState(false);

  const [value, setValue] = useState<string>("");
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [folderId, setFolderId] = useState<string>("");

  const [userId, setUserId] = useState<string | null>("");

  const [isLoading, setIsLoading] = useState<boolean>(true);

  let history = useHistory<any>();

  let source = axios.CancelToken.source();

  // 빌드할 때 지울것
  // useEffect(() => {
  //   localStorage.setItem("meemo-user-id", "testmeemo");
  // });

  useEffect(() => {
    setUserId(localStorage.getItem("meemo-user-id"));
    setUpdate(!update);
    return () => {
      console.log("Unmounting Editor.");
      source.cancel();
    };
  }, []);

  useEffect(() => {
    loadNote(userId);
  }, [update]);

  const loadNote = async (userId: string | null) => {
    try {
      const folderRes = await axios.get(BASE_URL + "/folders", {
        cancelToken: source.token,
      });
      try {
        const noteRes = await axios.get(BASE_URL + "/notes/" + noteId, {
          cancelToken: source.token,
        });
        if (userId !== "") {
          folderRes.data.forEach((folder: any) => {
            if (
              (folder.title === folderTitle && folder.userId === userId) ===
              true
            ) {
              console.log("Got the note!");
              setValue(noteRes.data.body);
              setNoteTitle(noteRes.data.title);
              setFolderId(noteRes.data.parentId);
              setIsLoading(false);
            } else {
              history.push({
                pathname: "/error",
              });
            }
          });
        }
      } catch {
        history.push({
          pathname: "/error",
        });
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Caught a cancel.");
      } else {
        throw err;
      }
    }
  };

  //title update uses put; editor body uses post + update.
  //to fix, add another prop in popup to get the body from the editor and feed in put.
  const handleChange = debounce((value) => {
    let source = axios.CancelToken.source();
    const noteInfo = {
      body: `${value()}`,
    };
    try {
      axios
        .post(BASE_URL + "/notes/update/" + noteId, noteInfo, {
          cancelToken: source.token,
        })
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
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <>
          <RouteShow
            type="editor"
            folderId={folderId}
            folderTitle={folderTitle}
            noteTitle={noteTitle}
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
              onShowToast={(message, type) =>
                window.alert(`${type}: ${message}`)
              }
              uploadImage={(file) => {
                // console.log("File upload triggered: ", file);

                // check if the file is an image, and reject if not;

                const data = new FormData();
                data.append("imgFile", file);

                return new Promise(async (resolve) => {
                  const res = await axios.post(BASE_URL + "/s3/upload/", data);
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
        </>
      )}
    </div>
  );
}
