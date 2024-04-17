import DashboardTemplate from "../../components/Templates/DashboardTemplate.jsx";
import Form from "./Form.jsx";
import NotificationList from "./NotificationList.jsx";
function NotificationsScreen() {
  return (  
    <DashboardTemplate pageTitle={"Notifications"}>
     {/* <Form /> */}
     <NotificationList />
    </DashboardTemplate>
  );
}

export default NotificationsScreen;