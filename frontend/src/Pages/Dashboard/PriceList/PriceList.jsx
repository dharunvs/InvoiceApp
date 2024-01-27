import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Assets from "../../../Assets";
import Components from "../../../Components";
import "./PriceList.css";
import { useDeviceContext } from "../../../DeviceContext";

function PriceList({ menuHide, toggleMenu, setNav }) {
  // const device = useDeviceContext();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.toLowerCase().includes("/dashboard")) {
      setNav(true);
    } else {
      setNav(false);
    }
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
      }
    };

    updateDevice();
    window.addEventListener("resize", updateDevice);
    return () => {
      window.removeEventListener("resize", updateDevice);
    };
  }, []);

  useEffect(() => {
    switch (device) {
      case "mobile":
        toggleMenu(true);
        setSkipRows([
          "Article No.",
          "In Price",
          "Unit",
          "In Stock",
          "Description",
        ]);
        break;
      case "tablet":
        setSkipRows(["In Stock", "Description"]);
        break;
      case "desktop":
        setSkipRows([]);
        break;
      default:
        setSkipRows([]);
    }
  }, [device]);

  const [skipRows, setSkipRows] = useState([]);
  const table = {
    columns: [
      {
        name: "Article No.",
        icon: <Assets.Icons.DownArrow />,
        className: "ArticleNo",
      },
      {
        name: "Product/Service",
        icon: <Assets.Icons.DownArrow />,
        className: "ProductService",
        width: "30%",
      },
      { name: "In Price" },
      { name: "Price" },
      { name: "Unit" },
      { name: "In Stock" },
      { name: "Description", width: "30%" },
    ],
    rows: [
      {
        "Article No.": "1234567890",
        "Product/Service": "This is a test product",
        "In Price": "900900",
        Price: "9900900",
        Unit: "kilometers/hour",
        "In Stock": "9900900",
        Description: "This is a big desctiption",
      },
      {
        "Article No.": "1234567890",
        "Product/Service": "This is a test product",
        "In Price": "900900",
        Price: "9900900",
        Unit: "kilometers/hour",
        "In Stock": "9900900",
        Description: "This is a big desctiption",
      },
      {
        "Article No.": "1234567890",
        "Product/Service": "This is a test product",
        "In Price": "900900",
        Price: "9900900",
        Unit: "kilometers/hour",
        "In Stock": "9900900",
        Description: "This is a big desctiption",
      },
      {
        "Article No.": "1234567890",
        "Product/Service": "This is a test product",
        "In Price": "900900",
        Price: "9900900",
        Unit: "kilometers/hour",
        "In Stock": "9900900",
        Description: "This is a big desctiption",
      },
      {
        "Article No.": "1234567890",
        "Product/Service": "This is a test product",
        "In Price": "900900",
        Price: "9900900",
        Unit: "kilometers/hour",
        "In Stock": "9900900",
        Description: "This is a big desctiption",
      },
      {
        "Article No.": "1234567890",
        "Product/Service": "This is a test product",
        "In Price": "900900",
        Price: "9900900",
        Unit: "kilometers/hour",
        "In Stock": "9900900",
        Description: "This is a big desctiption",
      },
      {
        "Article No.": "1234567890",
        "Product/Service": "This is a test product",
        "In Price": "900900",
        Price: "9900900",
        Unit: "kilometers/hour",
        "In Stock": "9900900",
        Description: "This is a big desctiption",
      },
      {
        "Article No.": "1234567890",
        "Product/Service": "This is a test product",
        "In Price": "900900",
        Price: "9900900",
        Unit: "kilometers/hour",
        "In Stock": "9900900",
        Description: "This is a big desctiption",
      },
      {
        "Article No.": "1234567890",
        "Product/Service": "This is a test product",
        "In Price": "900900",
        Price: "9900900",
        Unit: "kilometers/hour",
        "In Stock": "9900900",
        Description: "This is a big desctiption",
      },
      {
        "Article No.": "1234567890",
        "Product/Service": "This is a test product",
        "In Price": "900900",
        Price: "9900900",
        Unit: "kilometers/hour",
        "In Stock": "9900900",
        Description: "This is a big desctiption",
      },
      {
        "Article No.": "1234567890",
        "Product/Service": "This is a test product",
        "In Price": "900900",
        Price: "9900900",
        Unit: "kilometers/hour",
        "In Stock": "9900900",
        Description: "This is a big desctiption",
      },
      {
        "Article No.": "1234567890",
        "Product/Service": "This is a test product",
        "In Price": "900900",
        Price: "9900900",
        Unit: "kilometers/hour",
        "In Stock": "9900900",
        Description: "This is a big desctiption",
      },
      {
        "Article No.": "1234567890",
        "Product/Service": "This is a test product",
        "In Price": "900900",
        Price: "9900900",
        Unit: "kilometers/hour",
        "In Stock": "9900900",
        Description: "This is a big desctiption",
      },
      {
        "Article No.": "1234567890",
        "Product/Service": "This is a test product",
        "In Price": "900900",
        Price: "9900900",
        Unit: "kilometers/hour",
        "In Stock": "9900900",
        Description: "This is a big desctiption",
      },
    ],
  };

  return (
    <div className={menuHide ? "PriceList" : "PriceList"}>
      <div className="priceListController">
        <div className="left">
          <div className="input">
            <input type="text" placeholder="Search Article No" />
            <Assets.Icons.Search />
          </div>
          <div className="input">
            <input type="text" placeholder="Search Product" />
            <Assets.Icons.Search />
          </div>
        </div>

        <div className="right">
          <button className="NewProduct">
            <p>New Product</p>
            <Assets.Icons.Plus />
          </button>
          <button className="PrintList">
            <p>Print List</p>
            <Assets.Icons.Print />
          </button>
          <button className="AdvancedMode">
            <p>Advanced Mode</p>
            <Assets.Icons.Toggle />
          </button>
        </div>
      </div>

      <div className="tableContainer">
        <Components.Table
          columns={table.columns}
          rows={table.rows}
          skipRows={skipRows}
        />
      </div>
    </div>
  );
}

export default PriceList;
