import { createContext, useContext, useState, ReactNode } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

interface AppContextType {
    value: boolean;
    setValue: React.Dispatch<React.SetStateAction<boolean>>;
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

interface AppProviderProps {
    children: ReactNode;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    },
});

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [value, setValue] = useState<boolean>(false);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode);
    };

    const contextValue: AppContextType = {
        value,
        setValue,
        isDarkMode,
        toggleDarkMode,
    };

    return (
        <AppContext.Provider value={contextValue}>
            <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
                {children}
            </ThemeProvider>
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
