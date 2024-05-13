import {FaRegBell} from "react-icons/fa"
import Sidebar from "../Sidebar.jsx";
import BaseContextProvider from "../../contexts/BaseContext.jsx";
import {useNavigate } from "react-router-dom";
function DashboardTemplate({ children, pageTitle }) {
  const navigate = useNavigate();
 const handleClick = () =>{
  navigate("/notifications")
 }
  return (  
    <BaseContextProvider>
      <div className="flex">
        <Sidebar />
        <main className="w-[80%] ml-[20%] bg-white ">
          <div className="">
            <div className="flex justify-between items-center p-4">
              <div>
                <h1 className="font-bold text-xl">{pageTitle}</h1>
              </div>
              <div>
                <div className="bg-slate-200 p-2 rounded-full" onClick={handleClick}>
                  <FaRegBell />
                </div>
              </div>
            </div>
          </div>
          <div className="min-h-screen bg-slate-100">
            <div className="px-10 pt-10">
              {children}
            </div>
          </div>
        </main>
      </div>
    </BaseContextProvider>
  );
}

export default DashboardTemplate;