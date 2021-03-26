import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import debounce from "lodash/debounce";
import RMDEditor from "rich-markdown-editor";
import style from "../styles/Editor.module.scss";

import RouteShow from "./RouteShow";

// import { useEdit, useDark } from "../contexts/ToolContext";

// interface Props {}

// interface Youtube {}

interface Props {}

const YoutubeEmbed: React.FC<any> = (props) => {
  const { attrs } = props;
  const videoId = attrs.matches[1];

  return (
    <iframe
      className={props.isSelected ? "ProseMirror-selectednode" : ""}
      src={`https://www.youtube.com/embed/${videoId}?modestbranding=1`}
    />
  );
};

// function YoutubeEmbed(props) {
//   const { attrs } = props;
//   const videoId = attrs.matches[1];

//   return (
//     <iframe
//       className={props.isSelected ? "ProseMirror-selectednode" : ""}
//       src={`https://www.youtube.com/embed/${videoId}?modestbranding=1`}
//     />
//   );
// }
const Editor: React.FC<Props> = () => {
  let history = useHistory<any>();
  const [value, setValue] = useState<any>(history.location.state.body);

  // read/edit, dark value api using useContext and custom hooks
  // const edit = useEdit();
  // const dark = useDark();

  useEffect(() => {
    let source = axios.CancelToken.source();

    const loadNotes = async () => {
      try {
        const res = await axios.get(
          "https://meemo.kr/api/notes/" + history.location.state.id,
          {
            cancelToken: source.token,
          }
        );
        console.log("Got the note!");
        setValue(res.data.body);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Caught a cancel.");
        } else {
          throw err;
        }
      }
    };
    loadNotes();

    return () => {
      console.log("Unmounting Editor.");
      source.cancel();
    };
  }, [value]);

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
          "http://localhost:5000/notes/update/" + history.location.state.id,
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

  // const { body } = document;
  // if (body) body.style.backgroundColor = dark ? "#181A1B" : "#FFF";

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
            console.log("File upload triggered: ", file);

            // Delay to simulate time taken to upload
            return new Promise((resolve) => {
              setTimeout(() => resolve("https://picsum.photos/600/600"), 1500);
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
};

export default Editor;

// export default function Editor() {
//   let history = useHistory();
//   const [value, setValue] = useState(history.location.state.body);

//   // read/edit, dark value api using useContext and custom hooks
//   const edit = useEdit();
//   const dark = useDark();

//   useEffect(() => {
//     let source = axios.CancelToken.source();

//     const loadNotes = async () => {
//       try {
//         const res = await axios.get(
//           "http://localhost:5000/notes/" + history.location.state.id,
//           {
//             cancelToken: source.token,
//           }
//         );
//         console.log("Got the note!");
//         setValue(res.data);
//       } catch (err) {
//         if (axios.isCancel(err)) {
//           console.log("Caught a cancel.");
//         } else {
//           throw err;
//         }
//       }
//     };
//     loadNotes();

//     return () => {
//       console.log("Unmounting Editor.");
//       source.cancel();
//     };
//   }, [value]);

//   const handleChange = debounce((value) => {
//     let source = axios.CancelToken.source();
//     const body = {
//       body: `${value()}`,
//     };
//     try {
//       axios
//         .post(
//           "http://localhost:5000/notes/update/" + history.location.state.id,
//           body,
//           {
//             cancelToken: source.token,
//           }
//         )
//         .then((res) => console.log(res.data));
//     } catch (err) {
//       // Not sure that this is the right way to cancel the request. Might contain unknown problems.
//       // check if can fix the original error which is err
//       source.cancel();
//       console.log(err, "\nOperation canceled by the user.");
//     }
//   }, 1000);

//   const { body } = document;
//   if (body) body.style.backgroundColor = dark ? "#181A1B" : "#FFF";

//   return (
//     <div className="editor">
//       {/* need thorough study of each prop, such as image upload */}
//       <RMDEditor
//         id="example"
//         readOnly={edit}
//         readOnlyWriteCheckboxes
//         value={value}
//         defaultValue={value}
//         scrollTo={window.location.hash}
//         handleDOMEvents={
//           {
//             // focus: () => console.log("FOCUS"),
//             // blur: () => console.log("BLUR"),
//             // paste: () => console.log("PASTE"),
//             // touchstart: () => console.log("TOUCH START"),
//           }
//         }
//         onSave={(options) => console.log("Save triggered", options)}
//         onCancel={() => console.log("Cancel triggered")}
//         onChange={handleChange}
//         onClickLink={(href, event) =>
//           console.log("Clicked link: ", href, event)
//         }
//         onHoverLink={(event) => {
//           console.log("Hovered link: ", event.target.href);
//           return false;
//         }}
//         onClickHashtag={(tag, event) =>
//           console.log("Clicked hashtag: ", tag, event)
//         }
//         onCreateLink={(title) => {
//           // Delay to simulate time taken for remote API request to complete
//           return new Promise((resolve, reject) => {
//             setTimeout(() => {
//               if (title !== "error") {
//                 return resolve(
//                   `/doc/${encodeURIComponent(title.toLowerCase())}`
//                 );
//               } else {
//                 reject("500 error");
//               }
//             }, 1500);
//           });
//         }}
//         onShowToast={(message, type) => window.alert(`${type}: ${message}`)}
//         uploadImage={(file) => {
//           console.log("File upload triggered: ", file);

//           // Delay to simulate time taken to upload
//           return new Promise((resolve) => {
//             setTimeout(() => resolve("https://picsum.photos/600/600"), 1500);
//           });
//         }}
//         embeds={[
//           {
//             title: "YouTube",
//             keywords: "youtube video tube",
//             icon: () => (
//               <img
//                 src="https://upload.wikimedia.org/wikipedia/commons/7/75/YouTube_social_white_squircle_%282017%29.svg"
//                 width={24}
//                 height={24}
//               />
//             ),
//             matcher: (url) => {
//               return url.match(
//                 /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([a-zA-Z0-9_-]{11})$/i
//               );
//             },
//             component: YoutubeEmbed,
//           },
//         ]}
//         dark={dark}
//         autoFocus
//       />
//     </div>
//   );
// }
