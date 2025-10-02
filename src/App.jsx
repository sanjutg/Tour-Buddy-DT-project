import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen.jsx";
import RoleScreen from "./pages/Role.jsx";
import UserLoginScreen from "./pages/UserLogin.jsx";
import BusinessLogin from "./pages/BusinessLogin.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Routes>
          <Route path="/" element={<SplashScreen />} />
        <Route path="/role" element={<RoleScreen />} />
        <Route path="/userlogin" element={<UserLoginScreen />} />
        <Route path="/businessLogin" element={<BusinessLogin />} />
        <Route path="/adminLogin" element={<AdminLogin/>} />

        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
