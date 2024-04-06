import { createContext, useState } from "react";
import { matchRoutes, useLocation } from "react-router-dom";
import SidebarItems from "../data/SidebarItems.jsx";

export const BaseContext = createContext({
  activeItemId: 1,
  setActiveItemId: (id) => {}
})
function BaseContextProvider({ children }) {
  
  const location = useLocation()
  const routes = SidebarItems.map(item => ({path: item.route}))
  const matchedRoutes = matchRoutes(routes, location)
  const activeItemOnLoad = !matchedRoutes ? null : SidebarItems.find(i => i.route === matchedRoutes[0]?.route?.path)
  const [activeItemId, setActiveItemId] = useState(activeItemOnLoad?.id ?? null)
  
  const value = {
    activeItemId,
    setActiveItemId
  }
  
  return (  
    <BaseContext.Provider value={value}>
      {children}
    </BaseContext.Provider>
  );
}

export default BaseContextProvider;