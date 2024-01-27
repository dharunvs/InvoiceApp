import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Pages from "./Pages";
import Components from "./Components";
import Assets from "./Assets";

function App() {
  const [device, setDevice] = useState("unknown");
  const [dashboardNav, setDashboardNav] = useState(false);

  useEffect(() => {
    const updateDevice = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth <= 600) {
        setDevice("mobile");
      } else if (windowWidth <= 1366) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
    };

    updateDevice();
    window.addEventListener("resize", updateDevice);
    return () => {
      window.removeEventListener("resize", updateDevice);
    };
  }, []);

  const [menuHide, setMenuHide] = useState(false);
  const toggleMenu = () => {
    setMenuHide(!menuHide);
  };

  const showMenu = () => {
    setMenuHide(false);
  };

  const hideMenu = () => {
    setMenuHide(true);
  };

  useEffect(() => {
    switch (device) {
      case "mobile":
        setMenuHide(true);
        break;
      case "tablet":
        setMenuHide(true);
        break;
      case "desktop":
        setMenuHide(false);
        break;
      default:
        // setMenuHide(false);
        break;
    }
  }, [device]);

  return (
    <div className="App">
      <Router>
        {dashboardNav ? (
          <Components.DashboardNavbar
            // device={device}
            menuHide={menuHide}
            showMenu={showMenu}
            hideMenu={hideMenu}
            toggleMenu={toggleMenu}
          />
        ) : (
          <Components.Navbar />
        )}
        <Routes>
          <Route
            path="/"
            exact
            element={<Pages.Dummy setNav={setDashboardNav} />}
          />
          <Route
            path="/order"
            element={<Pages.Dummy setNav={setDashboardNav} />}
          />
          <Route
            path="/customers"
            element={<Pages.Dummy setNav={setDashboardNav} />}
          />
          <Route
            path="/about"
            element={<Pages.Dummy setNav={setDashboardNav} />}
          />
          <Route
            path="/contact"
            element={<Pages.Dummy setNav={setDashboardNav} />}
          />
          <Route
            path="/terms"
            element={<Pages.Terms setNav={setDashboardNav} />}
          />
          <Route
            path="/dashboard/*"
            element={
              <Pages.DashboardLayout
                menuHide={menuHide}
                showMenu={showMenu}
                hideMenu={hideMenu}
                toggleMenu={toggleMenu}
                setNav={setDashboardNav}
              />
            }
          />
          <Route
            path="/dummy"
            element={<Pages.Dummy setNav={setDashboardNav} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
