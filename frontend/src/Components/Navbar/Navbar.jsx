import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../data";
import Assets from "../../Assets";
import "./Navbar.css";

function Navbar() {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);
  const [langMenuActive, setLangMenuActive] = useState(false);

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
      }
    };

    updateDevice();
    window.addEventListener("resize", updateDevice);
    return () => {
      window.removeEventListener("resize", updateDevice);
    };
  }, []);

  const [navlinks, setNavLinks] = useState([]);

  const [pageContent, setPageContent] = useState({});

  useEffect(() => {
    axios
      .get(baseURL + "/webpagecontent/english")
      .then((res) => res["data"])
      .then((res) => {
        setPageContent(res.content["DashboardNav"]);
        setNavLinks(res.content["DashboardNav"]["links"]);
      });
  }, []);

  const preventLink = (event) => {
    event.preventDefault();

    console.log("Link clicked, but navigation prevented.");
  };

  return (
    <div className="Nav">
      {device == "desktop" ? (
        <div className="logo">
          <div className="imgContainer">
            <img src={Assets.Images.logo} alt="logo" />
          </div>
        </div>
      ) : (
        <div
          className="burger"
          onClick={() => {
            setBurgerMenuActive(!burgerMenuActive);
            setLangMenuActive(false);
          }}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
          {burgerMenuActive && (
            <ul className="burgerMenu">
              {navlinks.map((item) => (
                <li
                  key={item.name}
                  className={item.name.replace(/[\s/]/g, "") + "NavLink"}
                  style={{ userSelect: "none" }}
                >
                  <Link
                    // onClick={preventLink}
                    to={item.link}
                    style={{ pointerEvents: "auto" }}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="right">
        {device == "desktop" && (
          <ul>
            {navlinks.map((item) => (
              <li key={item.name} className={item.name.replace(/[\s/]/g, "")}>
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        )}

        <div
          className="language"
          onClick={() => {
            setLangMenuActive(!langMenuActive);
            setBurgerMenuActive(false);
          }}
        >
          <p>English</p>
          <div className="imgContainer">
            <img src={Assets.Images.flag_uk} alt="" />
          </div>
          {langMenuActive && (
            <div className="changeLanguage">
              <div className="lang">
                <p>Bokmål</p>
                <div className="imgContainer">
                  <img src={Assets.Images.flag_nw} alt="" />
                </div>
              </div>
              <div className="lang">
                <p>Nynorsk</p>
                <div className="imgContainer">
                  <img src={Assets.Images.flag_nw} alt="" />
                </div>
              </div>
              <div className="lang">
                <p>English</p>
                <div className="imgContainer">
                  <img src={Assets.Images.flag_uk} alt="" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
