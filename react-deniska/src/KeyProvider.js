import React, { createContext, useContext, useState } from 'react';

const KeyContext = createContext(undefined);

export const KeyProvider = ({ children }) => {
    const [keyAdmin, setKeyAdmin] = useState(null);

    return (
        <KeyContext.Provider value={{ keyAdmin, setKeyAdmin }}>
            {children}
        </KeyContext.Provider>
    );
};

export const useKey = () => {
    return useContext(KeyContext);
};