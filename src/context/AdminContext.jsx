import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import { loginAdmin, signupAdmin } from "../api/admin";
import { NotificationContext } from "./NotificationContext";
import { getAdmin } from "../api/admin";

export const AdminContext = createContext({
  adminId: !null,
  admin: !null,
  isAuth: false,
  token: null,
  authLoading: false,
  error: {},
  setAdminById: () => {},
  setAdmin: () => {},
  setError: () => {},
  loginHandler: () => {},
  signupHandler: () => {},
  // logoutHandler: () => {},
  adminWriteAccess: false,
  setAdminWriteAccess: () => {},
});

export const AdminContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [adminWriteAccess, setAdminWriteAccess] = useState(false);
  const [adminId, setAdminId] = useState(null);
  const [token, setToken] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);

  const { triggerNotification } = useContext(NotificationContext);

  const setAutoLogout = useCallback(
    (milliseconds) => {
      setTimeout(() => {
        // logoutHandler();
      }, milliseconds);
    },
    [isAuth]
  );

  const addTokenToLocalStorage = (token, adminId) => {
    const remainingMilliseconds = 60 * 60 * 1000;
    const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminId", adminId);
    localStorage.setItem("adminExpiryDate", expiryDate.toISOString());
    setAutoLogout(remainingMilliseconds);
  };

  const setAdminById = async (id, token) => {
    const response = await getAdmin(id, token);
    const admin = response?.data;
    if (admin) {
      setAdmin(admin);
    } else {
      setError(response.data);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    const savedId = localStorage.getItem("adminId");
    const expiryDate = localStorage.getItem("adminExpiryDate");

    if (!savedToken || !expiryDate || !savedId) {
      console.log("ONe of these--------1");
      // logoutHandler();
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      console.log("ONe of these--------2");
      // logoutHandler();
      return;
    }
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();

    // console.log("REACHeD------->");
    setIsAuth(true);
    setAuthLoading(false);
    setToken(savedToken);
    setAdminId(savedId);
    setAdminById(savedId);
    setAutoLogout(remainingMilliseconds);
    setAdminWriteAccess(true);
  }, [setAutoLogout, isAuth]);

  const signupHandler = async (event, authData) => {
    event.preventDefault();
    setAuthLoading(true);
    try {
      const response = await signupAdmin(authData, token);
      const admin = response.data;
      console.log(admin);

      if (admin.token) {
        setIsAuth(true);
        setAuthLoading(false);
        setIsAuth(true);
        setToken(admin.token);
        setAuthLoading(false);
        addTokenToLocalStorage(admin.token, admin.id);
        setAdmin(admin);
        setAdminWriteAccess(true);
        console.log(admin);
        triggerNotification("admin signed up");
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
      const response = await loginAdmin(authData, token);
      const admin = response.data;

      if (admin?.token) {
        setIsAuth(true);
        setToken(admin.token);
        setAuthLoading(false);
        setAdmin(admin);
        setAdminById(admin?.id);
        addTokenToLocalStorage(admin.token, admin.id);
        setAdminWriteAccess(true);
        triggerNotification("admin logged in");
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

  // const logoutHandler = () => {
  //   // console.log(admin, adminId, isAuth);
  //   console.log("LOGGING_OUT=======>");
  //   setIsAuth(false);
  //   setToken(null);
  //   setAdmin(null);
  //   setAdminWriteAccess(false);
  //   setAdminId(null);

  //   localStorage.removeItem("adminToken");
  //   localStorage.removeItem("adminId");
  //   localStorage.removeItem("adinExpiryDate");
  //   triggerNotification("admin logged out");
  // };

  return (
    <AdminContext.Provider
      value={{
        isAuth,
        token,
        authLoading,
        error,
        admin,
        adminId,
        setAdminById,
        setAdmin,
        setError,
        loginHandler,
        signupHandler,
        // logoutHandler,
        adminWriteAccess,
        setAdminWriteAccess,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
