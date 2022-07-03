import React, { useState, createContext } from "react";
export const MyContext = createContext();
export const AuthProvider = (props) => {
  const [user, setUser] = useState({});

  const signIn = (user, callback) => {
    setUser(user);
    return callback();
  };
  const signOut = (callback) => {
    setUser({});
    return callback();
  };

  let value = { user, signIn, signOut };
  return (
    <MyContext.Provider value={value}>{props.children}</MyContext.Provider>
  );
};
