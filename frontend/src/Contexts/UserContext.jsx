import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ childern }) => {
    
    return (
        <UserContext.Provider value>{childern}</UserContext.Provider>
    )
}