import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UpdateContextProps {
    triggerUpdate: () => void;
}

const UpdateContext = createContext<UpdateContextProps | undefined>(undefined);

export const UpdateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [updateFlag, setUpdateFlag] = useState<boolean>(false);

    const triggerUpdate = () => {
        setUpdateFlag(prevFlag => !prevFlag);
    };

    return (
        <UpdateContext.Provider value={{ triggerUpdate }}>
            {children}
        </UpdateContext.Provider>
    );
};

export const useUpdate = () => {
    const context = useContext(UpdateContext);
    if (!context) {
        throw new Error('useUpdate must be used within an UpdateProvider');
    }
    return context;
};
