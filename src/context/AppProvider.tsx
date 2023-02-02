import { createContext } from "react";

interface Props {
  children: React.ReactNode;
}

const AppContext = createContext({ loading: false });

export default function AppProvider({ children }: Props) {
  return (
    <AppContext.Provider value={{ loading: false }}>
      {children}
    </AppContext.Provider>
  );
}
