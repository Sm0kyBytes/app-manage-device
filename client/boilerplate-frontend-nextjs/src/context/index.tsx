'use client'
import React, { createContext, useContext } from 'react';
import { AuthContext } from './authContext';
import { NavContext } from './navContext';

interface contextType {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;

  navRoute: boolean;
  setNavRoute: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = createContext<contextType | undefined>(undefined);

// Combine all providers into one component
const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const authContext = AuthContext();
  const navConetxt = NavContext();

  return (
    <Context.Provider value={{ ...authContext, ...navConetxt }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;

export const useContexts = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
