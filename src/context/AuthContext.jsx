import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import { loginUser, signupUser } from "../api/auth";
import { NotificationContext } from "./NotificationContext";
import { getUser } from "../api/user";

export const AuthContext = createContext({
  userId: !null,
  user: !null,
  isAuth: false,
  token: null,
  authLoading: false,
  error: {},
  setUserById: () => {},
  setUser: () => {},
  setError: () => {},
  loginHandler: () => {},
  signupHandler: () => {},
  logoutHandler: () => {},
  adminWriteAccess: false,
  setAdminWriteAccess: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);
  const [adminWriteAccess, setAdminWriteAccess] = useState(false);

  const { triggerNotification } = useContext(NotificationContext);

  const setAutoLogout = useCallback(
    (milliseconds) => {
      setTimeout(() => {
        logoutHandler();
      }, milliseconds);
    },
    [isAuth]
  );

  const addTokenToLocalStorage = (token, userId) => {
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
    localStorage.setItem("expiryDate", expiryDate.toISOString());
    setAutoLogout(remainingMilliseconds);
  };

  const setUserById = async (id, token) => {
    const response = await getUser(id, token);
    const user = response?.data;
    if (user) {
      setUser(user);
    } else {
      setError(response.data);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedId = localStorage.getItem("userId");

    const expiryDate = localStorage.getItem("expiryDate");
    if (!savedToken || !expiryDate) {
      logoutHandler();
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();

    setIsAuth(true);
    setAuthLoading(false);
    setToken(savedToken);
    setUserId(savedId);
    setUserById(savedId);
    user?.isAdmin && setAdminWriteAccess(true);
    setAutoLogout(remainingMilliseconds);
  }, [setAutoLogout, isAuth]);

  const signupHandler = async (event, authData) => {
    event.preventDefault();
    console.log("SIGNUP_HANDLER");
    setAuthLoading(true);
    try {
      const response = await signupUser(authData, token);
      const user = response.data;

      console.log("SIGNUP_USER", user);

      if (user.token) {
        setIsAuth(true);
        setAuthLoading(false);
        setIsAuth(true);
        setToken(user.token);
        setAuthLoading(false);
        addTokenToLocalStorage(user.token, user.id);
        setUser(user);
      } else {
        const { errors } = response.data;
        setError(errors);
      }
    } catch (error) {
      console.error(error)
      setIsAuth(false);
      setAuthLoading(false);
      setError(error);
    }
  };

  const loginHandler = async (event, authData) => {
    event.preventDefault();
    setAuthLoading(true);
    try {
      const response = await loginUser(authData, token);
      const user = response.data;

      if (user?.token) {
        setIsAuth(true);
        setToken(user.token);
        setAuthLoading(false);
        setUser(user);
        setUserById(user?.id);
        addTokenToLocalStorage(user.token, user.id);
        user?.isAdmin && setAdminWriteAccess(true);
        triggerNotification("logged in");
      } else {
        const { errors } = response.data;
        user?.isAdmin && setAdminWriteAccess(false);
        setError(errors);
      }
    } catch (error) {
      setIsAuth(false);
      setAuthLoading(false);
      setError(error);
    }
  };

  // const errorHandler = () => {
  //   setError(null);
  // };

  const logoutHandler = () => {
    if (userId || user || isAuth) {
      setIsAuth(false);
      setToken(null);
      setUser(null);
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("expiryDate");
      triggerNotification("logged out");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        token,
        authLoading,
        error,
        user,
        userId,
        setUserById,
        setUser,
        setError,
        loginHandler,
        signupHandler,
        logoutHandler,
        adminWriteAccess,
        setAdminWriteAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
