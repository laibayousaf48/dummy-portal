import { MdOutlineSpaceDashboard } from "react-icons/md"
import { IoAnalytics, IoHelpCircleOutline, IoPersonOutline, IoSettingsOutline } from "react-icons/io5"
import { FiMessageSquare } from "react-icons/fi"
import { PiBriefcase, PiStarLight } from "react-icons/pi"
import { HiOutlineDocumentText } from "react-icons/hi";
import { LiaExchangeAltSolid } from "react-icons/lia";


const HKPSidebarItem = [
  {
    id: 1,
    title: "Dashboard",
    icon: <MdOutlineSpaceDashboard color={"#AFAFAF"} size={"24px"} />,
    activeIcon: <MdOutlineSpaceDashboard color={"#24ACE3"} size={"24px"} />,
    route: "/",
  }
];
export default HKPSidebarItem 