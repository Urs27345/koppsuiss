"use client"; // Required for contexts in App Router

import { createContext, useContext, useState, ReactNode } from "react";

type MyContextType = {
  dictionary: { [key: string]: string };
  setDictionary: (val: { [key: string]: string }) => void;
};

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [dictionary, setDictionary] = useState<{ [key: string]: string }>({});

  return <MyContext.Provider value={{ dictionary, setDictionary }}>{children}</MyContext.Provider>;
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error("useMyContext must be used within MyContextProvider");
  return context;
};
