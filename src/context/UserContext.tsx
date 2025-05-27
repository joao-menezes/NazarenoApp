import React, { createContext, useState, ReactNode, useContext } from 'react';

interface UserContextType {
    username: string;
    userIcon: string;
    setUser: React.Dispatch<React.SetStateAction<{ username: string; userIcon: string }>>;
}

const defaultUserContext: UserContextType = {
    username: 'João Silva',
    userIcon: 'person',
    setUser: () => {}
};

export const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<{ username: string; userIcon: string }>({
        username: 'João Silva',
        userIcon: 'person',
    });

    return (
        <UserContext.Provider value={{ ...user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
