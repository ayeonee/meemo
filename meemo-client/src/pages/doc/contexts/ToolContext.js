import React, { useContext, useState } from "react";

// study process and relations again

const EditContext = React.createContext();
const EditUpdateContext = React.createContext();

const DarkContext = React.createContext();
const DarkUpdateContext = React.createContext();

export function useEdit() {
  return useContext(EditContext);
}
export function useEditUpdate() {
  return useContext(EditUpdateContext);
}

export function useDark() {
  return useContext(DarkContext);
}
export function useDarkUpdate() {
  return useContext(DarkUpdateContext);
}

export function ToolProvider({ children }) {
  const [dark, setDark] = useState(false);
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const toggleDark = () => {
    setDark((prevDark) => !prevDark);
    localStorage.setItem("dark", dark ? "enabled" : "disabled");
  };

  return (
    <EditContext.Provider value={edit}>
      <EditUpdateContext.Provider value={toggleEdit}>
        <DarkContext.Provider value={dark}>
          <DarkUpdateContext.Provider value={toggleDark}>
            {children}
          </DarkUpdateContext.Provider>
        </DarkContext.Provider>
      </EditUpdateContext.Provider>
    </EditContext.Provider>
  );
}
