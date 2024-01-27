import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Assets from "../../Assets";

import "./Menu.css";

function Menu({ menuHide, showMenu, hideMenu, toggleMenu }) {
  const location = useLocation();

  const menu = [
    {
      name: "Invoices",
      link: "/dashboard/invoices",
      icon: <Assets.Icons.Invoices />,
    },
    {
      name: "Customers",
      link: "/dashboard/customers",
      icon: <Assets.Icons.Customers />,
    },
    {
      name: "My Business",
      link: "/dashboard/mybusiness",
      icon: <Assets.Icons.MyBusiness />,
    },
    {
      name: "Invoice Journal",
      link: "/dashboard/invoicejournal",
      icon: <Assets.Icons.InvoiceJournal />,
    },
    {
      name: "Price List",
      link: "/dashboard/pricelist",
      icon: <Assets.Icons.PriceList />,
    },
    {
      name: "Multiple Invoicing",
      link: "/dashboard/multipleinvoicing",
      icon: <Assets.Icons.MultipleInvoicing />,
    },
    {
      name: "Unpaid Invoices",
      link: "/dashboard/unpaidinvoices",
      icon: <Assets.Icons.UnpaidInvoices />,
    },
    { name: "Offer", link: "/dashboard/offer", icon: <Assets.Icons.Offer /> },
    {
      name: "Inventory Control",
      link: "/dashboard/inventorycontrol",
      icon: <Assets.Icons.InventoryControl />,
    },
    {
      name: "Member Invoicing",
      link: "/dashboard/memberinvoicing",
      icon: <Assets.Icons.MemberInvoicing />,
    },
    {
      name: "Import/Export",
      link: "/dashboard/importexport",
      icon: <Assets.Icons.ImportExport />,
    },
    {
      name: "Logout",
      link: "/dashboard/logout",
      icon: <Assets.Icons.Logout />,
    },
  ];

  return (
    <div className={menuHide ? "MenuHide" : "Menu"}>
      <h2>Menu</h2>
      <div className="menuLine"></div>
      <ul>
        {menu.map((item) => {
          if (location.pathname == "/dashboard/memberinvoicing") {
            console.log(location.pathname, item.link);
          }
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
              <Link to={item.link}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Menu;
