import { createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (val) => {},
  user: null,
  setUser: (val) => {},
  login: (token, user, business, redirectRoute = "/") => {},
  
})

function AuthContextProvider({children}) {
  const token = localStorage.getItem('auth.token')
  const [isLoggedIn, setIsLoggedIn] = useState(token ? true : false)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  // console.log(location.state)
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    user, 
    setUser,
    login: (token, user, redirectRoute = "/") => {
      localStorage.setItem('auth.token', token)
      setUser(user)
      setIsLoggedIn(true)
      navigate(redirectRoute)
    }
  }
  return (  
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;