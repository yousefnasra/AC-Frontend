import { createContext, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {

    const [userToken, setUserToken] = useState(null);
    const [isBlocked, setIsBlocked] = useState(0);


    return <UserContext.Provider value={{ userToken, setUserToken, isBlocked, setIsBlocked }}>
        {children}
    </UserContext.Provider>
}