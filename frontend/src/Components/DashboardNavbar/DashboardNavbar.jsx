import React, { useState, useEffect } from "react";
import Assets from "../../Assets";
import "./DashboardNavbar.css";

function DashboardNavbar({ menuHide, toggleMenu }) {
  const [device, setDevice] = useState("unknown");

  useEffect(() => {
    const updateDevice = () => {
      const windowWidth = document.documentElement.clientWidth;

      if (windowWidth <= 600) {
        setDevice("mobile");
      } else if (windowWidth <= 1366) {
        setDevice("tablet");
      } else if (windowWidth > 1366) {
        setDevice("desktop");
      }
    };

    updateDevice();
    window.addEventListener("resize", updateDevice);
    return () => {
      window.removeEventListener("resize", updateDevice);
    };
  }, []);

  return (
    <div className="DashboardNav">
      {device == "desktop" ? (
        <div className="profile">
          <div className="imgContainer">
            <img src={Assets.Images.profile} alt="profile" />
          </div>
          <div className="content">
            <p>Dharun Sivakumar</p>
            <p>Chennai</p>
          </div>
        </div>
      ) : (
        <div
          className="burger"
          onClick={() => {
            toggleMenu(); // Call the toggleMenu function passed from DashboardLayout
          }}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
      )}

      <div className="language">
        <p>English</p>
        <div className="imgContainer">
          <img src={Assets.Images.flag_uk} alt="flag_uk" />
        </div>
      </div>
    </div>
  );
}

export default DashboardNavbar;
