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
        const res = await fetch("http://localhost:8000/api/v1/users/current-user", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (res.ok && data?.data) {
          setDetails(data.data);
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
  }, []);

  // ✅ Logout function that clears cookies + context state
  const logoutUser = async () => {
    try {
      await fetch("http://localhost:8000/api/v1/users/logout", {
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

  return !userFetched ? (
    <p className="text-white">Loading...</p>
  ) : (
    <UserContext.Provider
      value={{ isUserLoggedIn, setisUserLoggedIn, details, logoutUser }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
