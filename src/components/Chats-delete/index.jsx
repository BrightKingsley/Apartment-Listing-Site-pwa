// import { useContext, useEffect, useState } from "react";
// import { doc } from "firebase/firestore";
// import { onSnapshot } from "firebase/firestore";

// import { AuthContext } from "../../context/AuthContext";
// import { db } from "../../firebase";
// import { ChatContext } from "../../context/ChatContext";
// import Message from "../Message/index";

// import classes from "./Chats.module.css";
// import { getUsers } from "../../api/users";
// import { getConversations } from "../../api/conversations";

// const Chats = () => {
  
//   // const [chats, setChats] = useState([]);

//   // const { currentUser } = useContext(AuthContext);
//   // const { dispatch } = useContext(ChatContext);

//   // useEffect(() => {
//   //   const getChats = () => {
//   //     const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
//   //       setChats(Object.entries(doc.data()));
//   //     });

//   //     return () => {
//   //       unsub();
//   //     };
//   //   };
//   //   currentUser.uid && getChats();
//   // }, [currentUser, currentUser.uid]);

//   // const handleSelect = (u) => {
//   //   dispatch({ type: "CHANGE_USER", payload: u });
//   // };

<div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia doloremque ipsum dolores saepe dolorem libero optio iste doloribus? Libero nulla corporis laboriosam ducimus? Accusamus quas eligendi facilis odit iusto quae, iste ut unde eaque, accusantium nisi? Sed culpa sapiente ad animi suscipit error minima unde quis officiis quod possimus ipsum, libero tempore quas nemo natus sit dolorem enim autem illo molestias modi vero. Nisi laudantium ab commodi vero reprehenderit accusamus nam aliquid! Fugit atque voluptatibus doloribus qui quos quasi quo itaque voluptates cum provident, eum eos necessitatibus distinctio soluta molestiae maxime explicabo voluptate obcaecati excepturi dolore. Nisi voluptatibus itaque eius.
</div>
//   return (
//     <div className={classes.chats}>
//       {/* {chats &&
//         chats
//           ?.sort((a, b) => b[1].date - a[1].date)
//           .map((user, index) => {
//             const chat = chats[index];

//             return (
//               user.uid !== currentUser.uid && (
//                 <div
//                   className="userChat"
//                   key={chat && chat[0]}
//                   onClick={() => {
//                     handleSelect(chat && chat[1]?.userInfo);
//                   }}
//                 >
//                   <img src={chat[1]?.userInfo.photoURL} alt="" />
//                   <div className="userChatInfo">
//                     <span>{chat[1]?.userInfo.displayName}</span>
//                     {chat && chat[1]?.lastMessage ? (
//                       <p className="lastMessage">{`${
//                         currentUser.uid === chat[1]?.lastMessage.senderId
//                           ? "me"
//                           : chat[1]?.userInfo.displayName
//                       }: ${chat[1]?.lastMessage?.text}`}</p>
//                     ) : (
//                       <p className="lastMessage">{`click to send ${
//                         chat && chat[1]?.userInfo.displayName
//                       } a message`}</p>
//                     )}
//                   </div>
//                 </div>
//               )
//             );
//           })} */}
//       {loading ? (
//         <h2>Loading</h2>
//       ) : (
//         conversations
//           ?.sort((a, b) => b[1] - a[1])
//           .map((conversation, index) => {
//             return (
//               <div
//                 className={`${classes.userChat} ${
//                   index + 1 === active ? classes.active : null
//                 }`}
//                 key={conversation._id}
//                 onClick={() => {
//                   setActive(index + 1);
//                 }}
//               >
//                 <img src={`../../assets/${1}.jpg`} alt="user" />
//                 <div className={classes.userChatInfo}>
//                   <span>sender</span>

//                   <p className={classes.lastMessage}>
//                     This was my last Message
//                   </p>
//                 </div>
//               </div>
//             );
//           })
//       )}
//     </div>
//   );
// };

// export default Chats;
