import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { getConversations } from "../api/conversations";
import { getMessages } from "../api/messages";
import { AuthContext } from "./AuthContext";
import { getUser } from "../api/user";
import { io } from "socket.io-client";

export const ChatContext = createContext({
  receiver: null,
  currentConversation: null,
  setReceiver: () => {},
  getCurrentConversation: () => {},
  conversations: null,
  getAllConversations: () => {},
  setConversations: () => {},
  messages: null,
  setMessages: () => {},
  getAllMessages: () => {},
  error: null,
  msgLoading: false,
  convoLoading: false,
  socket: null,
});

export const ChatContextProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);
  const [msgLoading, setMsgLoading] = useState(false);
  const [convoLoading, setConvoLoading] = useState(false);
  const [receiver, setReceiver] = useState(null);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("ws://localhost:3001"));
  }, []);

  const getCurrentConversation = (conversation, token) => {
    // console.log("GETTING", conversation);
    setCurrentConversation(conversation);
    getAllMessages(conversation, token);
  };

  const getAllConversations = async (userId, token) => {
    console.log("ID____", userId);

    setConvoLoading(true);
    try {
      const response = await getConversations(userId, token);
      const { conversations } = response.data;
      if (conversations) {
        console.log("GOTTEN_CONVOS", conversations);
        setConversations(conversations);
        setConvoLoading(false);
        return conversations;
      } else {
        console.log("GOtten_RESponse", response.data);
        setError(response.data);
        setConvoLoading(false);
        return null;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllMessages = async (conversation, token) => {
    console.log("GET_CONVERSATION", conversation);
    setMsgLoading(true);
    try {
      const response = await getMessages(conversation?._id, token);
      const { messages } = response.data;
      if (messages) {
        setMessages(messages);
      } else {
        console.log(response.data);
      }
      setMsgLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        currentConversation,
        getCurrentConversation,
        receiver,
        setReceiver,
        conversations,
        getAllConversations,
        setConversations,
        messages,
        setMessages,
        error,
        msgLoading,
        convoLoading,
        socket,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// const INITIAL_STATE = {
//   chatId: "null",
//   user: {},
// };

// const chatReducer = (state, action) => {
//   switch (action.type) {
//     case "CHANGE_USER":
//       return {
//         user: action.payload,
//         chatId:
//           currentUser && currentUser.uid > action.payload.uid
//             ? currentUser.uid + action.payload.uid
//             : action.payload.uid + currentUser.uid,
//       };

//     default:
//       return state;
//   }
// };

// const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
