import { createContext, useState, useEffect } from "react";

import { API_URL } from "../../config";

export const UserContext = createContext(null);

export default function UserContextProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(window.localStorage.getItem("user")) || null
  );

  const logIn = async (data) => {
    try {
      const res = await fetch(API_URL + "/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Asegúrate de especificar el tipo de contenido como JSON
        },

        body: JSON.stringify(data),
      });
      console.log(res.status);
      if (res.status === 200) {
        const data = await res.json();

        setUser(data.user);
        window.localStorage.setItem("user", JSON.stringify(data.user));
        window.localStorage.setItem("token", JSON.stringify(data.token));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    window.localStorage.clear();
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        logIn,
        user,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
