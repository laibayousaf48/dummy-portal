import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import LoginScreen from './modules/Auth/LoginScreen.jsx';
import AuthContextProvider from './contexts/AuthContext.jsx';
import VerifyScreen from './modules/Auth/VerifyScreen.jsx';
import SignupScreen from './modules/Auth/SignupScreen';
// import Dashboard from './modules/Auth/Dashboard';
// import Analysis from './modules/Auth/Analysis';
import DashboardTemplate from './components/Templates/DashboardTemplate.jsx';
import DashboardScreen from './modules/Dashboard/DashboardScreen.jsx';
import AnalyticsScreen from './modules/Analytics/AnalyticsScreen.jsx';
import CustomersScreen from './modules/Customers/CustomersScreen.jsx';
import OffersRequestsScreen from './modules/OffersRequests/OffersRequestsScreen.jsx';
import JobsScreen from './modules/Jobs/JobsScreen.jsx';
import MessagesScreen from './modules/Messages/MessagesScreen.jsx';
import HelpScreen from './modules/Help/HelpScreen.jsx';
import ProfileSettingsScreen from './modules/ProfileSettings/ProfileSettingsScreen.jsx';
import PrivateRouteWrapper from './components/PrivateRouteWrapper';
import PublicRouteWrapper from './components/PublicRouteWrapper.jsx';
import ChannelsScreen from './modules/Channels/ChannelsScreen';
import GrowthScreen from './modules/Growth/GrowthScreen';
import IntegrationsScreen from './modules/Integrations/IntegrationsScreen';
import BillingsScreen from './modules/Billing/BillingsScreen';
import DemographicsScreen from './modules/Demographics/DemographicsScreen';
import NotificationsScreen from './modules/Notifications/NotificationsScreen';
import InvitationsScreen from './modules/Invitations/InvitationsScreen';
import ProductsScreen from './modules/Products/ProductsScreen';
import Form from './modules/Notifications/Form';
import MessageVerifyScreen from './modules/Auth/MessageVerifyScreen.jsx';
import MapScreen from './modules/Map/MapScreen.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
            <Route path="/message/verify/:number" element={<MessageVerifyScreen />} />
            <Route path="/verify/:number" element={<VerifyScreen />} />
          <Route element={<PublicRouteWrapper />}>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
          </Route>

          <Route element={<PrivateRouteWrapper />}>
            <Route path="/" element={<DashboardScreen />} />
            <Route path="/analytics" element={<AnalyticsScreen />} />
            {/* <Route path="/customers" element={<CustomersScreen />} /> */}
            <Route path="/offers-requests" element={<OffersRequestsScreen />} />
            {/* <Route path="/jobs" element={<JobsScreen />} /> */}
            <Route path="/growth" element={<GrowthScreen />} />
            <Route path="/integrations" element={<IntegrationsScreen />} />
            <Route path="/billing" element={<BillingsScreen />} />
            <Route path="/demographics" element={<DemographicsScreen />} />
            {/* <Route path="/messages" element={<MessagesScreen />} /> */}
            <Route path="/help" element={<HelpScreen />} />
            <Route path="/channels" element={<ChannelsScreen />} />
            <Route path="/settings" element={<ProfileSettingsScreen />} />
            <Route path="/notifications" element={<NotificationsScreen />} />
            <Route path="/form" element={<Form />} />
            <Route path="/invitations" element={<InvitationsScreen />} />
            <Route path="/products" element={<ProductsScreen />} />
            <Route path="/map" element={<MapScreen />} />
          </Route>

          <Route
            path="*"
            element={
              <DashboardTemplate>
                <h1>Coming Soon!</h1>
              </DashboardTemplate>
            }
          />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
