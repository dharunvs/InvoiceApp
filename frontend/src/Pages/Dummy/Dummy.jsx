import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Dummy.css";

function Dummy({ showMenu, setNav }) {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.toLowerCase().includes("/dashboard")) {
      setNav(true);
    } else {
      setNav(false);
    }
  }, [location.pathname]);

  const [currentLocation, setCurrentLocation] = useState(location.pathname);

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location.pathname]);

  const [device, setDevice] = useState("unknown");
  useEffect(() => {
    const updateDevice = () => {
      const windowWidth = document.documentElement.clientWidth;

      if (windowWidth <= 600) {
        setDevice("mobile");
      } else if (windowWidth <= 1366) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
        showMenu();
      }
    };

    updateDevice();
    window.addEventListener("resize", updateDevice);
    return () => {
      window.removeEventListener("resize", updateDevice);
    };
  }, [location.pathname]);
  useEffect(() => {
    const updateDevice = () => {
      const windowWidth = document.documentElement.clientWidth;

      if (windowWidth <= 600) {
        setDevice("mobile");
      } else if (windowWidth <= 1366) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
        showMenu();
      }
    };

    updateDevice();
    window.addEventListener("resize", updateDevice);
    return () => {
      window.removeEventListener("resize", updateDevice);
    };
  }, []);

  return (
    <div className="Dummy">
      <div className="content">
        <h2>Please visit</h2>
        <ul>
          <li>
            <Link to="/terms">Terms</Link>
          </li>
          <li>
            <Link to="/dashboard/price-list">Dashboard/Pricelist</Link>
          </li>
        </ul>
        <br />
        <p>
          The <span>{currentLocation}</span> page is not built.
        </p>
      </div>
    </div>
  );
}

export default Dummy;
