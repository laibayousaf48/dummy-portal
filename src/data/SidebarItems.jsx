import { MdOutlineSpaceDashboard } from "react-icons/md"
import { IoAnalytics, IoHelpCircleOutline, IoPersonOutline, IoSettingsOutline } from "react-icons/io5"
import { FiMessageSquare } from "react-icons/fi"
import { PiBriefcase, PiStarLight } from "react-icons/pi"
import { HiOutlineDocumentText } from "react-icons/hi";
import { LiaExchangeAltSolid } from "react-icons/lia";


const SidebarItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: <MdOutlineSpaceDashboard color={"#AFAFAF"} size={"24px"} />,
    activeIcon: <MdOutlineSpaceDashboard color={"#24ACE3"} size={"24px"} />,
    route: "/",
  },
  {
    id: 2,
    title: "Channels",
    icon: <PiStarLight color={"#AFAFAF"} size={"24px"} />,
    activeIcon: <PiStarLight color={"#24ACE3"} size={"24px"} />,
    route: "/channels",
  },
  {
    id: 3,
    title: "Offers",
    icon: <IoPersonOutline color={"#AFAFAF"} size={"24px"} />,
    activeIcon: <IoPersonOutline color={"#24ACE3"} size={"24px"} />,
    route: "/offers-requests",
  },
  {
    id: 4,
    title: "Analytics",
    icon: <IoAnalytics color={"#AFAFAF"} size={"24px"} />,
    activeIcon: <IoAnalytics color={"#24ACE3"} size={"24px"} />,
    route: "/analytics",
  },
  {
    id: 5,
    title: "Demographics",
    icon: <PiBriefcase color={"#AFAFAF"} size={"24px"} />,
    activeIcon: <PiBriefcase color={"#24ACE3"} size={"24px"} />,
    route: "/demographics",
  },
  {
    id: 6,
    title: "Growth",
    icon: <FiMessageSquare color={"#AFAFAF"} size={"24px"} />,
    activeIcon: <FiMessageSquare color={"#24ACE3"} size={"24px"} />,
    route: "/growth",
  },
  {
    id: 7,
    title: "Help",
    icon: <IoHelpCircleOutline color={"#AFAFAF"} size={"24px"} />,
    activeIcon: <IoHelpCircleOutline color={"#24ACE3"} size={"24px"} />,
    route: "/help",
  },
  {
    id: 8,
    title: "Profile Settings",
    icon: <IoSettingsOutline color={"#AFAFAF"} size={"24px"} />,
    activeIcon: <IoSettingsOutline color={"#24ACE3"} size={"24px"} />,
    route: "/settings",
  },
  {
    id: 9,
    title: "Integrations",
    icon: <LiaExchangeAltSolid color={"#AFAFAF"} size={"24px"} />,
    activeIcon: <LiaExchangeAltSolid color={"#24ACE3"} size={"24px"} />,
    route: "/integrations",
  },
  {
    id: 10,
    title: "Billing",
    icon: <HiOutlineDocumentText color={"#AFAFAF"} size={"24px"} />,
    activeIcon: <HiOutlineDocumentText color={"#24ACE3"} size={"24px"} />,
    route: "/billing",
  },
];
export default SidebarItems 