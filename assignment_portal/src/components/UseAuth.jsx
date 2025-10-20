import { createContext, useState } from "react";

const UserInfo = createContext();

const InfoProvider = ({ children }) => {
  const [user, setUser] = useState(()=>{

    const saveduser =localStorage.getItem('user')
    return saveduser? JSON.parse(saveduser):null
  });
  

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user',JSON.stringify(userData))
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user')
  };

  return (
    <UserInfo.Provider value={{ user, login, logout }}>
      {children}
    </UserInfo.Provider>
  );
};

export {UserInfo,InfoProvider}
