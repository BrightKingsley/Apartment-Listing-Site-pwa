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
import { SOCKET_URL } from "../constants";

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
    setSocket(io(SOCKET_URL));
  }, []);

  const getCurrentConversation = (conversation, token) => {
    setCurrentConversation(conversation);
    getAllMessages(conversation, token);
  };

  const getAllConversations = async (userId, token) => {

    setConvoLoading(true);
    try {
      const response = await getConversations(userId, token);
      const { conversations } = response.data;
      if (conversations) {
        setConversations(conversations);
        setConvoLoading(false);
        return conversations;
      } else {
        setError(response.data);
        setConvoLoading(false);
        return null;
      }
    } catch (error) {
    }
  };

  const getAllMessages = async (conversation, token) => {
    setMsgLoading(true);
    try {
      const response = await getMessages(conversation?._id, token);
      const { messages } = response.data;
      if (messages) {
        setMessages(messages);
      } else {
      }
      setMsgLoading(false);
    } catch (error) {
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
