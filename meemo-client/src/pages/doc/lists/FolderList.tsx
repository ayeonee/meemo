import { useState, useEffect } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import axios from "axios";
import { Add, Delete, FolderOpen, Create } from "@material-ui/icons";
import style from "../styles/FolderList.module.scss";

import AddRenameModal from "../modals/AddRenameModal";
import RouteShow from "../misc/RouteShow";
import LoaderSpinner from "../misc/LoaderSpinner";
import DeleteModal from "../modals/DeleteModal";

export default function FolderList(): JSX.Element {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState<string>("");
  const [delBtn, setDelBtn] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  const [folderTitle, setFolderTitle] = useState<string>("");
  const [folderChildren, setFolderChildren]: any = useState([]);

  const [popupType, setPopupType] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showDelModal, setShowDelModal] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  let { url } = useRouteMatch();
  let history = useHistory();

  useEffect(() => {
    document.onclick = (event: any) => {
      setTimeout(() => {
        if (event.target.id !== "noDeselect") {
          setDelBtn(false);
          setSelectedFolder("");
        }
      }, 100);
    };
    return () => {
      clearTimeout();
      setSelectedFolder("");
      setFolderTitle("");
      setFolders([]);
    };
  }, []);

  useEffect(() => {
    let source = axios.CancelToken.source();

    const loadFolders = async () => {
      try {
        const res = await axios.get("https://meemo.kr/api/folders", {
          cancelToken: source.token,
        });
        console.log("Got the folders!");
        setFolders(res.data.map((folder: any) => folder));
        setIsLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Caught a cancel.");
        } else {
          throw err;
        }
      }
    };
    loadFolders();

    return () => {
      console.log("Unmounting FolderList.");
      source.cancel();
    };
  }, [update]);

  const getTitle = async (id: string) => {
    try {
      const res = await axios.get("https://meemo.kr/api/folders/" + id);
      setFolderTitle(res.data.title);
    } catch (err) {
      throw err;
    }
  };

  const getChildren = async (id: string) => {
    let temp: any[] = [];
    try {
      const res = await axios.get("https://meemo.kr/api/notes");
      res.data.map((note: any) => {
        if (note.parentId === id) {
          temp.push(note);
        }
      });
      setFolderChildren(temp.map((note: any) => note.title));
    } catch (err) {
      throw err;
    }
  };

  const addFolder = async (t: string) => {
    try {
      const folder = {
        title: `${t}`,
      };
      axios
        .post("https://meemo.kr/api/folders/create", folder)
        .then(() => setUpdate(!update))
        .then(() => console.log("New folder added!"))
        .then(() => setShowPopup(!showPopup))
        .then(() => setSelectedFolder(""));
    } catch (err) {
      throw err;
    }
  };

  const deleteFolder = async (id: string) => {
    let temp: any[] = [];
    try {
      const res = await axios.get("https://meemo.kr/api/notes");
      res.data.map((note: any) => {
        if (note.parentId === id) {
          temp.push(note);
        }
      });
      temp.map((note) => {
        axios.delete("https://meemo.kr/api/notes/" + note._id);
      });
    } catch (err) {
      throw err;
    }
    try {
      axios
        .delete("https://meemo.kr/api/folders/" + id)
        .then(() => console.log("Folder deleted."))
        .then(() => setUpdate(!update))
        .then(() => setDelBtn(false))
        .then(() => setShowDelModal(!showDelModal))
        .catch(() => {
          console.log("no folder selected");
        });
    } catch (err) {
      throw err;
    }
  };

  const updateFolder = async (id: string, t: string) => {
    try {
      const title = await {
        title: `${t}`,
      };

      axios
        .put("https://meemo.kr/api/folders/" + id, title)
        .then(() => console.log("Folder Renamed"))
        .then(() => setUpdate(!update))
        .then(() => setShowPopup(false))
        .then(() => setSelectedFolder(""))
        .catch((err) => console.log(`error: ${err}`));
    } catch (err) {
      throw err;
    }
  };

  const onSelect = (folder: any) => {
    console.log(url, folder.title);
    selectedFolder === folder._id
      ? history.push({
          pathname: `${url}/${folder.title}`,
          state: {
            folderTitle: folder.title,
            folderId: folder._id,
          },
        })
      : setSelectedFolder(folder._id);
    setSelectedFolder(folder._id);
    getTitle(folder._id);
    getChildren(folder._id);
    setDelBtn(true);
    console.log(`folder ${folder._id} selected!`);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleDelModal = () => {
    setShowDelModal(!showDelModal);
  };

  return (
    <div className={style.folderList}>
      <RouteShow type="" folderId="" folderTitle={folderTitle} noteTitle="" />
      {isLoading ? (
        <LoaderSpinner />
      ) : (
        <>
          <div className={style.folderContainer}>
            <div className={style.folderDiv}>
              {folders.map((folder: any) => (
                <div
                  key={folder._id}
                  id={`noDeselect`}
                  className={
                    selectedFolder === folder._id
                      ? style.foldersSelected
                      : style.folders
                  }
                  onClick={() => onSelect(folder)}
                >
                  <div className={style.iconDiv}>
                    <FolderOpen className={style.folderIcon} />
                  </div>
                  <div className={style.titleDiv}>
                    <p>{folder.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={style.toolDiv}>
            <div
              className={delBtn ? style.renameBtn : style.hideRenameBtn}
              id={`noDeselect`}
              onClick={() => {
                setPopupType("rename");
                setShowPopup(!showPopup);
              }}
            >
              <Create className={style.renameIcon} />
              &nbsp; 수정 &nbsp;
            </div>

            <div
              className={style.addBtn}
              id={`noDeselect`}
              onClick={() => {
                setPopupType("folderlist");
                setShowPopup(!showPopup);
              }}
            >
              + &nbsp; 폴더 추가 &nbsp;
            </div>
            <div
              className={delBtn ? style.deleteBtn : style.hideDelBtn}
              id={`noDeselect`}
              onClick={() => {
                setShowDelModal(!showDelModal);
              }}
            >
              <Delete className={style.deleteIcon} />
              &nbsp; 삭제 &nbsp;
            </div>
          </div>
        </>
      )}
      {showPopup ? (
        <AddRenameModal
          prevTitle={folderTitle}
          selectedId={selectedFolder}
          component={popupType}
          togglePopup={togglePopup}
          getTitle={addFolder}
          getRename={updateFolder}
        />
      ) : null}
      {showDelModal ? (
        <DeleteModal
          type="folderlist"
          childTitles={folderChildren}
          selectedTitle={folderTitle}
          selectedId={selectedFolder}
          delete={deleteFolder}
          toggleDelModal={toggleDelModal}
        />
      ) : null}
    </div>
  );
}
