import { ILogUser } from "@/interfaces/ILogUser";
import { createContext, useEffect, useState, useContext, ReactNode } from "react";

interface IAuthContextProps {
  authenticate: (data: ILogUser) => void;
  logout: () => void;
  user: ILogUser;
}

const AuthContext = createContext({} as IAuthContextProps);

export const setUserLocalStorage = (user: ILogUser) => {
  localStorage.setItem("FOODAPIUXSOFTWARE2023", JSON.stringify(user));
};

export const getUserLocalStorage = () => {
  const json = localStorage.getItem("FOODAPIUXSOFTWARE2023");

  if (!json) return null;

  const user: ILogUser = JSON.parse(json);
  return user ?? null;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState({} as ILogUser);

  useEffect(() => {
    const data = getUserLocalStorage();
    if (data) setUser(data);
  }, []);

  const authenticate = async (data: ILogUser) => {
    setUser(data);
    setUserLocalStorage(data);
  };

  const logout = async () => {
    setUser({} as ILogUser);
    setUserLocalStorage({} as ILogUser);
  };

  return (
    <AuthContext.Provider value={{ user, authenticate, logout }}>{children}</AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };

export default function useAuth() {
  return useContext(AuthContext);
}
