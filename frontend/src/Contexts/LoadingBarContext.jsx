import React, { createContext, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';

const LoadingBarContext = createContext();

export const LoadingBarProvider = ({ children }) => {
    const loadingBarRef = useRef(null);

    return (
        <LoadingBarContext.Provider value={loadingBarRef}>
            <LoadingBar color="var(--accent-color)" ref={loadingBarRef} height={3} />
            {children}
        </LoadingBarContext.Provider>
    );
};

export const useLoadingBar = () => React.useContext(LoadingBarContext);