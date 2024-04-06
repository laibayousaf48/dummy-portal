import LoginScreen from "./modules/Auth/LoginScreen"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import VerifyScreen from "./modules/Auth/VerifyScreen";
import SignupScreen from "./modules/Auth/SignupScreen";
function App() {

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          {/* <Route exact path="/login" element={<LoginScreen />}></Route>
          <Route exact path="/verify" element={<SignupScreen />}></Route> */}
          <Route exact path="/signup" element={<SignupScreen />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
