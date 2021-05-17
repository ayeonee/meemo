import { useState, useEffect } from "react";
import { useRouteMatch, useHistory, useParams } from "react-router-dom";
import { Add, Delete, FolderOpen, Create } from "@material-ui/icons";
import axios from "axios";
import style from "../styles/FolderList.module.scss";

import AddRenameModal from "../modals/AddRenameModal";
import RouteShow from "../misc/RouteShow";
import LoaderSpinner from "../misc/LoaderSpinner";
import DeleteModal from "../modals/DeleteModal";

import { BASE_URL } from "../../../_data/urlData";
import { useSelector } from "react-redux";
import { RootState } from "../../../_userReducers";

export default function FolderList(): JSX.Element {
  const [folders, setFolders]: any = useState([]);
  const [selectedFolder, setSelectedFolder] = useState<string>("");
  const [delBtn, setDelBtn] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);

  const [folderTitle, setFolderTitle] = useState<string>("");
  const [folderChildren, setFolderChildren]: any = useState([]);

  const [popupType, setPopupType] = useState<string>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [showDelModal, setShowDelModal] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const userIdInfo = useSelector(
    (state: RootState) => state.user.userData.userId
  );
  const [userId, setUserId] = useState<string | null>(userIdInfo);

  let { url } = useRouteMatch();
  let history = useHistory();

  let source = axios.CancelToken.source();

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
      console.log("Unmounting FolderList.");
      clearTimeout();
      setSelectedFolder("");
      setFolderTitle("");
      setFolders([]);
      source.cancel();
    };
  }, []);

  useEffect(() => {
    loadFolders(userId);
  }, [update]);

  const loadFolders = async (userId: string | null) => {
    try {
      const res = await axios.get(BASE_URL + "/folders/user/" + userId, {
        cancelToken: source.token,
      });
      if (res.data.length === 0) {
        setIsLoading(false);
        setFolders([]);
      } else {
        setFolders(res.data.map((folder: any) => folder));
        console.log("Got the folders!");
        setIsLoading(false);
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Caught a cancel.");
      } else {
        throw err;
      }
    }
  };

  const getTitle = async (id: string) => {
    try {
      const res = await axios.get(BASE_URL + "/folders/" + id);
      setFolderTitle(res.data.title);
    } catch (err) {
      throw err;
    }
  };

  const getChildren = async (id: string) => {
    let temp: any[] = [];
    try {
      const res = await axios.get(BASE_URL + "/notes");
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
    let title = t;
    let i = 1;
    try {
      while (true) {
        const res = await axios.get(
          BASE_URL + `/folders/userTitle/${userId}/${title}`
        );

        if (res.data.length === 0) {
          const folder = {
            title: `${title}`,
            userId: userId,
          };
          axios
            .post(BASE_URL + "/folders/create", folder)
            .then(() => setUpdate(!update))
            .then(() => console.log("New folder added!"))
            .then(() => setShowPopup(!showPopup))
            .then(() => setSelectedFolder(""));

          break;
        } else {
          title = `${t} ${i}`;
          i = i + 1;
        }
      }
    } catch (err) {
      throw err;
    }
  };

  const deleteFolder = async (id: string) => {
    let temp: any[] = [];
    try {
      const res = await axios.get(BASE_URL + "/notes");
      res.data.map((note: any) => {
        if (note.parentId === id) {
          temp.push(note);
        }
      });
      temp.map((note) => {
        axios.delete(BASE_URL + "/notes/" + note._id);
      });
    } catch (err) {
      throw err;
    }
    try {
      axios
        .delete(BASE_URL + "/folders/" + id)
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
        .put(BASE_URL + "/folders/" + id, title)
        .then(() => console.log("Folder Renamed"))
        .then(() => setDelBtn(false))
        .then(() => setUpdate(!update))
        .then(() => setShowPopup(false))
        .then(() => setSelectedFolder(""))
        .catch((err) => console.log(`error: ${err}`));
    } catch (err) {
      throw err;
    }
  };

  const onSelect = (folder: any) => {
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
      <RouteShow
        type=""
        folderId=""
        folderTitle=""
        noteTitle=""
        isSaving={null}
        handleEdit={null}
        isReadOnly={null}
      />
      {isLoading ? (
        <LoaderSpinner type="" />
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
            </div>

            <div
              className={style.addBtn}
              id={`noDeselect`}
              onClick={() => {
                setPopupType("folderlist");
                setShowPopup(!showPopup);
              }}
            >
              <span> + </span>
            </div>
            <div
              className={delBtn ? style.deleteBtn : style.hideDelBtn}
              id={`noDeselect`}
              onClick={() => {
                setShowDelModal(!showDelModal);
              }}
            >
              <Delete className={style.deleteIcon} />
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
