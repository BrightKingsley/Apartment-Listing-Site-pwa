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
});

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);

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
      console.log("ONe of these--------1");
      logoutHandler();
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      console.log("ONe of these--------2");
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
    setAutoLogout(remainingMilliseconds);
  }, [setAutoLogout, isAuth]);

  const signupHandler = async (event, authData) => {
    event.preventDefault();
    setAuthLoading(true);
    try {
      const response = await signupUser(authData, token);
      const user = response.data;

      if (user.token) {
        setIsAuth(true);
        setAuthLoading(false);
        setIsAuth(true);
        setToken(user.token);
        setAuthLoading(false);
        addTokenToLocalStorage(user.token, user.id);
        setUser(user);
        console.log(user);
      } else {
        const { errors } = response.data;
        setError(errors);
      }
    } catch (error) {
      console.log(error);
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
        console.log("LOGIN_RUNNING");
        setIsAuth(true);
        setToken(user.token);
        setAuthLoading(false);
        setUser(user);
        setUserById(user?.id);
        addTokenToLocalStorage(user.token, user.id);
        triggerNotification("logged in");
      } else {
        const { errors } = response.data;
        console.log(errors);
        setError(errors);
      }
    } catch (error) {
      console.log(error);
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
