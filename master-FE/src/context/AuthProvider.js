import { createContext, useContext } from "react";

const AuthContext = createContext({
  login: () => {},
  logout: () => {},
  user:null,
  setUserData:()=>{}
});

export const AuthProvider = AuthContext.Provider;

export default function useAuth() {
  return useContext(AuthContext);
}
