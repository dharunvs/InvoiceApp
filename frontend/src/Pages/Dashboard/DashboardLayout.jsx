import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Pages from "..";
import Components from "../../Components";
import "./DashboardLayout.css";

function DashboardLayout({ menuHide, showMenu, hideMenu, toggleMenu, setNav }) {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.toLowerCase().includes("/dashboard")) {
      setNav(true);
    } else {
      setNav(false);
    }
  }, [location.pathname]);

  return (
    <div className="DashboardLayout">
      <Components.Menu
        menuHide={menuHide}
        showMenu={showMenu}
        hideMenu={hideMenu}
        toggleMenu={toggleMenu}
      />
      <div className="menuFiller"></div>
      <div className={menuHide ? "dashboardPages" : "dashboardPages"}>
        <Routes>
          <Route
            path=""
            element={
              <Pages.Dashboard.PriceList
                menuHide={menuHide}
                hideMenu={hideMenu}
                toggleMenu={toggleMenu}
                showMenu={showMenu}
                setNav={setNav}
              />
            }
          />
          <Route
            path="invoices"
            element={<Pages.Dummy showMenu={showMenu} setNav={setNav} />}
          />
          <Route
            path="customers"
            element={<Pages.Dummy showMenu={showMenu} setNav={setNav} />}
          />
          <Route
            path="my-business"
            element={<Pages.Dummy showMenu={showMenu} setNav={setNav} />}
          />
          <Route
            path="invoice-journal"
            element={<Pages.Dummy showMenu={showMenu} setNav={setNav} />}
          />
          <Route
            path="price-list"
            element={
              <Pages.Dashboard.PriceList
                menuHide={menuHide}
                hideMenu={hideMenu}
                toggleMenu={toggleMenu}
                showMenu={showMenu}
                setNav={setNav}
              />
            }
          />
          <Route
            path="multiple-invoicing"
            element={<Pages.Dummy showMenu={showMenu} setNav={setNav} />}
          />
          <Route
            path="offer"
            element={<Pages.Dummy showMenu={showMenu} setNav={setNav} />}
          />
          <Route
            path="unpaid-invoices"
            element={<Pages.Dummy showMenu={showMenu} setNav={setNav} />}
          />
          <Route
            path="inventory-control"
            element={<Pages.Dummy showMenu={showMenu} setNav={setNav} />}
          />
          <Route
            path="member-invoicing"
            element={<Pages.Dummy showMenu={showMenu} setNav={setNav} />}
          />
          <Route
            path="import-export"
            element={<Pages.Dummy showMenu={showMenu} setNav={setNav} />}
          />
          <Route
            path="logout"
            element={<Pages.Dummy showMenu={showMenu} setNav={setNav} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default DashboardLayout;
