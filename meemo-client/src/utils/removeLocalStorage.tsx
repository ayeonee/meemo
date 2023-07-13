const removeLocalStorage = () => {
  localStorage.removeItem("meemo-user-name");
  localStorage.removeItem("meemo-user-id");
};

export default removeLocalStorage;
