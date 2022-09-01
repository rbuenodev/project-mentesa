import React, { createContext, useState, useContext, ReactNode } from "react";
import { isAuthenticated, logout } from "../../services/Auth/service";

interface BaseLayoutProps {
  children?: ReactNode;
}
interface IAuthContext {
  logged: boolean;
  singIn(): void;
  singOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

const AuthProvider: React.FC<BaseLayoutProps> = ({ children }) => {
  const [logged, setLogged] = useState<boolean>(() => {
    return isAuthenticated();
  });

  const singIn = () => {
    setLogged(isAuthenticated());
  };

  const singOut = () => {
    logout();
    setLogged(false);
  };

  return (
    <AuthContext.Provider value={{ logged, singIn, singOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): IAuthContext {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
