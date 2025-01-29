import React, { createContext, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';

export const LoadingBarContext = createContext();

export const LoadingBarProvider = ({ children }) => {
    const loadingBarRef = useRef(null);

    return (
        <LoadingBarContext.Provider value={loadingBarRef}>
            <LoadingBar color="var(--accent-color)" ref={loadingBarRef} height={4} />
            {children}
        </LoadingBarContext.Provider>
    );
};