import React, { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

export default function Search() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState("");
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSearch = async () => {};

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleClick = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  const handleSelect = async () => {
    // const combinedId =
    //   currentUser.uid > user.uid
    //     ? currentUser.uid + user.uid
    //     : user.uid + currentUser.uid;
    // try {
    //   const res = await getDoc(doc(db, "chats", combinedId));
    //   //create a chat in chats collection
    //   if (!res.exists())
    //     await setDoc(doc(db, "chats", combinedId), { messages: [] });
    //   //create user chats
    //   // create user chats
    //   await updateDoc(doc(db, "userChats", currentUser.uid), {
    //     [combinedId + ".userInfo"]: {
    //       uid: user.uid,
    //       displayName: user.displayName,
    //       photoURL: user.photoURL,
    //     },
    //     [combinedId + ".date"]: serverTimestamp(),
    //   });
    //   await updateDoc(doc(db, "userChats", user.uid), {
    //     [combinedId + ".userInfo"]: {
    //       uid: currentUser.uid,
    //       displayName: currentUser.displayName,
    //       photoURL: currentUser.photoURL,
    //     },
    //     [combinedId + ".date"]: serverTimestamp(),
    //   });
    // } catch (err) {
    //   setErr(err);
    // }
    // setUser(null);
    // setUsername("");
    // setErr(err);
  };

  return (
    <div className="search">
      <div className="searchForm">
        <div>
          <input
            type="text"
            placeholder="Find a user"
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <button className="searchButton" onClick={handleSearch}>
          Search
        </button>
      </div>
      {err && <p>User not found</p>}
      {user && (
        <div
          className="userChat userSearch"
          onClick={() => {
            handleClick(user);
            handleSelect();
          }}
        >
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
}
