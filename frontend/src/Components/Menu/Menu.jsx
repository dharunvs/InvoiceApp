import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../data";
import Assets from "../../Assets";

import "./Menu.css";

function Menu({ menuHide, showMenu, hideMenu, toggleMenu }) {
  const location = useLocation();
  const [pageContent, setPageContent] = useState({});
  const [menu, setMenu] = useState([]);
  const [device, setDevice] = useState("unknown");
  const menuIconMap = [
    {
      name: "Invoices",
      icon: <Assets.Icons.Invoices />,
    },
    {
      name: "Customers",
      icon: <Assets.Icons.Customers />,
    },
    {
      name: "My Business",
      icon: <Assets.Icons.MyBusiness />,
    },
    {
      name: "Invoice Journal",
      icon: <Assets.Icons.InvoiceJournal />,
    },
    {
      name: "Price List",
      icon: <Assets.Icons.PriceList />,
    },
    {
      name: "Multiple Invoicing",
      icon: <Assets.Icons.MultipleInvoicing />,
    },
    {
      name: "Unpaid Invoices",
      icon: <Assets.Icons.UnpaidInvoices />,
    },
    { name: "Offer", icon: <Assets.Icons.Offer /> },
    {
      name: "Inventory Control",
      icon: <Assets.Icons.InventoryControl />,
    },
    {
      name: "Member Invoicing",
      icon: <Assets.Icons.MemberInvoicing />,
    },
    {
      name: "Import/Export",
      icon: <Assets.Icons.ImportExport />,
    },
    {
      name: "Logout",
      icon: <Assets.Icons.Logout />,
    },
  ];

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

  useEffect(() => {
    axios
      .get(baseURL + "/webpagecontent/english")
      .then((res) => res["data"])
      .then((res) => {
        setPageContent(res.content["DashboardMenu"]);
        setMenu(
          menuIconMap.map((menuItem) => {
            const linkItem = res.content["DashboardMenu"]["links"].find(
              (link) => link.name === menuItem.name
            );
            return {
              name: menuItem.name,
              displayName: linkItem.displayName,
              link: linkItem.link,
              icon: menuItem.icon,
            };
          })
        );
      });
  }, []);

  useEffect(() => {
    if (device == "unknown" || device == "desktop") {
      showMenu();
    }
  });

  const preventLink = (event) => {
    event.preventDefault();

    console.log("Link clicked, but navigation prevented.");
  };

  return (
    <div className={menuHide ? "MenuHide" : "Menu"}>
      <h2>Menu</h2>
      <div className="menuLine"></div>
      <ul>
        {menu.map((item) => {
          return (
            <li
              key={item.name}
              className={item.name.replace(/[\s/]/g, "") + "MenuLink"}
              onClick={hideMenu}
            >
              <div
                className={
                  location.pathname == item.link ? "active" : "inactive"
                }
              ></div>
              {item.icon}
              <Link
                to={item.link}
                onClick={(e) => {
                  if (location.pathname == item.link) {
                    e.preventDefault();
                    console.log("Link clicked, but navigation prevented.");
                  }
                }}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Menu;
