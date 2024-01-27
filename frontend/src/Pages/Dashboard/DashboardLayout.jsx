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
                setNav={setNav}
              />
            }
          />
          <Route path="invoices" element={<Pages.Dummy setNav={setNav} />} />
          <Route path="customers" element={<Pages.Dummy setNav={setNav} />} />
          <Route path="mybusiness" element={<Pages.Dummy setNav={setNav} />} />
          <Route
            path="invoicejournal"
            element={<Pages.Dummy setNav={setNav} />}
          />
          <Route
            path="pricelist"
            element={
              <Pages.Dashboard.PriceList
                menuHide={menuHide}
                hideMenu={hideMenu}
                toggleMenu={toggleMenu}
                setNav={setNav}
              />
            }
          />
          <Route
            path="multipleinvoicing"
            element={<Pages.Dummy setNav={setNav} />}
          />
          <Route path="offer" element={<Pages.Dummy setNav={setNav} />} />
          <Route
            path="unpaidinvoices"
            element={<Pages.Dummy setNav={setNav} />}
          />
          <Route
            path="inventorycontrol"
            element={<Pages.Dummy setNav={setNav} />}
          />
          <Route
            path="memberinvoicing"
            element={<Pages.Dummy setNav={setNav} />}
          />
          <Route
            path="importexport"
            element={<Pages.Dummy setNav={setNav} />}
          />
          <Route path="logout" element={<Pages.Dummy setNav={setNav} />} />
        </Routes>
      </div>
    </div>
  );
}

export default DashboardLayout;
