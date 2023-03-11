// import React, { createContext, useEffect, useState } from "react";
// import { useContext } from "react";
// import { getUser } from "../api/user";
// import { AuthContext } from "./AuthContext";
// export const UserContext = createContext({
//   user: null,
//   setUser: () => {},
//   setId: () => {},
//   getUserId: () => {},
// });

// export const UserContextProvider = ({ children }) => {
//   const { isAuth, token, userId, authLoading } = useContext(AuthContext);

//   const [user, setUser] = useState(null);
//   // const [id, setId] = useState(null);

//   const getUserId = async (userId) => {
//     // console.log("USERTOKEN", token);
//     const response = await getUser(userId, token);
//     // console.log("USER", response.data);
//     const user = response.data?.user || null;
//     setUser(user);
//   };

//   useEffect(() => {
//     console.log("isAuth", isAuth);
//     const id = localStorage.getItem("userId");
//     // console.log("ID", id);
//     getUserId(id);
//   }, [isAuth, userId, authLoading, token]);

//   return (
//     <UserContext.Provider
//       value={{
//         user,
//         getUserId,
//       }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };
