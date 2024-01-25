import React, { createContext, useState, useEffect } from "react";

export const CurrentUser = createContext();

function CurrentUserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch the current user from the backend
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch("/path-to-your-api/current-user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          credentials: "include", // send cookies with the request
        });
        const data = await response.json();
        if (data.user) {
          setCurrentUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <CurrentUser.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUser.Provider>
  );
}

export default CurrentUserProvider;
