import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext(null);

export const useUserContext = () => useContext(UserContext);

export const UserProvider = (props) => {
  const [isUserLoggedIn, setisUserLoggedIn] = useState(false);
  const [details, setDetails] = useState(null);
  const [userFetched, setUserFetched] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          "https://fluxplay-backend.onrender.com/api/v1/users/current-user",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (res.status != 200) {
          throw new Error("user not logged in");
        }

        const data = await res.json();
        console.log(data);
        
        if (data?.user) {
          console.log("user", data.user)
          setDetails(data.user);
          setisUserLoggedIn(true);
        } else {
          setDetails(null);
          setisUserLoggedIn(false);
        }
      } catch (err) {
        console.error("Failed to fetch user", err);
        setDetails(null);
        setisUserLoggedIn(false);
      } finally {
        setUserFetched(true);
      }
    };

    fetchUser();
  }, [isUserLoggedIn]);

  //Logout function that clears cookies + context state
  const logoutUser = async () => {
    try {
      await fetch("https://fluxplay-backend.onrender.com/api/v1/users/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout request failed:", err);
    } finally {
      // Clear user state whether logout succeeded or failed
      setDetails(null);
      setisUserLoggedIn(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isUserLoggedIn,
        setisUserLoggedIn,
        details,
        logoutUser,
        userFetched,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
