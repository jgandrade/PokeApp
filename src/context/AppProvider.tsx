import { createContext, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const AppContext = createContext<any>({});

export default function AppProvider({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <AppContext.Provider value={{ loading: loading, setLoading: setLoading }}>
      {children}
    </AppContext.Provider>
  );
}
