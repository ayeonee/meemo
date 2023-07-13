import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import debounce from "lodash/debounce";
import RMDEditor from "rich-markdown-editor";
import { useSelector } from "react-redux";
import { RootState } from "../../../reducers";
import style from "../styles/Editor.module.scss";

import LoaderSpinner from "../misc/LoaderSpinner";
import RouteShow from "../misc/RouteShow";

import { BASE_URL } from "../../../constants/url";

const YoutubeEmbed: React.FC<any> = (props) => {
  const { attrs } = props;
  const videoId = attrs.matches[1];

  return (
    <iframe
      className={props.isSelected ? "ProseMirror-selectednode" : ""}
      src={`https://www.youtube.com/embed/${videoId}?modestbranding=1`}
      width="100%"
    />
  );
};

export default function Editor(): JSX.Element {
  const modeInfo = useSelector((state: RootState) => state.modeReducer.mode);
  const userIdInfo = useSelector(
    (state: RootState) => state.userReducer.userData.userId
  );
  let { folderTitle, noteId }: any = useParams();
  const [update, setUpdate] = useState(false);
  const [value, setValue] = useState<string>("");
  const [noteTitle, setNoteTitle] = useState<string>("");
  const [folderId, setFolderId] = useState<string>("");
  const [gotFolderId, setGotFolderId] = useState<boolean>(false);

  const [userId, setUserId] = useState<string | null>(userIdInfo);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  let history = useHistory<any>();

  const editor: any = useRef();

  let source = axios.CancelToken.source();

  useEffect(() => {
    getParentId();
    return () => {
      source.cancel();
      clearTimeout();
    };
  }, []);

  useEffect(() => {
    if (gotFolderId === true) {
      loadNote();
    }
  }, [update]);

  const loadNote = async () => {
    try {
      const res = await axios.get(BASE_URL + "/notes/" + noteId, {
        cancelToken: source.token,
      });

      if (res.data === null) {
        history.push({
          pathname: "/error",
        });
      } else {
        setValue(res.data.body);
        setNoteTitle(res.data.title);
        setIsLoading(false);
      }
    } catch {
      history.push({
        pathname: "/error",
      });
    }
  };

  const getParentId = async () => {
    try {
      const res = await axios.get(
        BASE_URL + `/folders/userTitle/${userId}/${folderTitle}`,
        {
          cancelToken: source.token,
        }
      );
      if (res.data.length === 0) {
        history.push({
          pathname: "/error",
        });
      } else {
        setFolderId(res.data[0]._id);
        setGotFolderId(true);
        setUpdate(!update);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Caught a cancel.");
      } else {
      }
    }
  };

  const handleChange = debounce((value) => {
    const noteInfo = {
      body: `${value()}`,
    };
    try {
      axios.post(BASE_URL + "/notes/update/" + noteId, noteInfo, {
        cancelToken: source.token,
      });
    } catch (err) {
      source.cancel();
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
          <div
            className={
              modeInfo === "light"
                ? style.editor_wrapper
                : style.editor_wrapper_dark
            }
          >
            <div
              className={style.editor}
              onClick={(e: any) => {
                if (e.target.className === "Editor_editor__qwGTj") {
                  editor.current.focusAtEnd();
                }
              }}
            >
              <RMDEditor
                id="example"
                ref={editor}
                readOnly={false}
                readOnlyWriteCheckboxes
                value={value}
                defaultValue={value}
                placeholder="문서를 작성해 보세요!"
                scrollTo={window.location.hash}
                onChange={handleChange}
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
                    }, 1000);
                  });
                }}
                onShowToast={(message, type) =>
                  window.alert(`${type}: ${message}`)
                }
                uploadImage={(file) => {
                  const data = new FormData();
                  data.append("imgFile", file);

                  return new Promise(async (resolve) => {
                    const res = await axios.post(
                      BASE_URL + "/s3/upload/",
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
                        alt="youtube upload icon"
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
                dark={modeInfo === "light" ? false : true}
                autoFocus
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
