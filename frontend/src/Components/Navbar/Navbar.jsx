import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Assets from "../../Assets";
import "./Navbar.css";

function Navbar() {
  const [burgerMenuActive, setBurgerMenuActive] = useState(false);
  const [langMenuActive, setLangMenuActive] = useState(false);

  const navlinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Order",
      link: "/order",
    },
    {
      name: "Terms",
      link: "/terms",
    },
    {
      name: "Our Customers",
      link: "/customers",
    },
    {
      name: "About Us",
      link: "/about",
    },
    {
      name: "Contact Us",
      link: "/contact",
    },
  ];

  return (
    <div className="Nav">
      {/* <div className="logo">
        <div className="imgContainer">
          <img src={Assets.Images.logo} alt="logo" />
        </div>
      </div> */}
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
              >
                <Link to={item.link}>{item.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="right">
        <ul>
          {navlinks.map((item) => (
            <li key={item.name} className={item.name.replace(/[\s/]/g, "")}>
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ul>
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