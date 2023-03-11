import React, { createContext, useEffect, useState } from "react";

export const AdminContext = createContext({
  loggedIn: {},
  logIn: () => {},
});

export const AdminContextProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = (staus) => {
    setLoggedIn(staus);
  };

  //   useEffect(() => {
  //     // const unsub = onAuthStateChanged(auth, (user) => {
  //     //   setLoggedIn(user);
  //     // });
  //     // return () => {
  //     //   unsub();
  //     // };
  //   }, [loggedIn]);

  return (
    <AdminContext.Provider value={{ loggedIn, logIn }}>
      {children}
    </AdminContext.Provider>
  );
};
