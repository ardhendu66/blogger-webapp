import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export default function UserProvider({children}) {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [loggedInUser, setLoggedInUser] = useState([]);
    const [clearUser, setClearUser] = useState(false);

    useEffect(() => {
        if(clearUser === true) {
            ls?.setItem('user', JSON.stringify([]));
        }
    }, [clearUser])

    useEffect(() => {
        if(Object.keys(loggedInUser).length > 0) {
            ls?.setItem("user", JSON.stringify(loggedInUser));
        }
    }, [loggedInUser])

    useEffect(() => {
        if(ls && ls.getItem("user")) {
            setLoggedInUser(JSON.parse(ls.getItem("user")));
        }
    }, [])

    const emptyUser = () => {
        setClearUser(true);
        setLoggedInUser([]);
    }

    return (
        <UserContext.Provider value={{loggedInUser, setLoggedInUser, emptyUser}}>
            {children}
        </UserContext.Provider>
    )
}