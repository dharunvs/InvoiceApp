import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../../data";
import Assets from "../../../Assets";
import Components from "../../../Components";
import "./PriceList.css";

function PriceList({ menuHide, showMenu, hideMenu, toggleMenu, setNav }) {
  const location = useLocation();
  const [pageContent, setPageContent] = useState({});
  const [device, setDevice] = useState("unknown");
  const [orientation, setOrientation] = useState(window.orientation);
  const [table, setTable] = useState({});
  const [skipRows, setSkipRows] = useState([]);

  const columnsPropertiesMap = [
    {
      name: "Article No.",
      icon: <Assets.Icons.DownArrow />,
      className: "ArticleNo",
    },
    {
      name: "Product/Service",
      icon: <Assets.Icons.DownArrow />,
      className: "ProductService",
      width: "25%",
    },
    { name: "Description", width: "25%" },
  ];

  useEffect(() => {
    axios
      .get(baseURL + "/webpagecontent/english")
      .then((res) => res["data"])
      .then((res) => {
        setPageContent(res.content["Dashboard/Pricelist"]);
        let columns = res.content["Dashboard/Pricelist"]["columns"];

        axios
          .get(baseURL + "/pricelist")
          .then((res) => res["data"])
          .then((res) => {
            let rows = res;

            columns = columns.map((column) => {
              const matchingColumnProperty = columnsPropertiesMap.find(
                (prop) => prop.name === column.name
              );
              return { ...column, ...matchingColumnProperty };
            });

            rows = rows.map((row) => convertKeys(row, columns));

            setTable({
              columns,
              rows,
            });
          });
      });
  }, []);

  const convertKeys = (row, columns) => {
    const convertedRow = {};

    for (const column of columns) {
      const key = column.name.toLowerCase().replace(/[\s\/.]/g, "");
      convertedRow[column.displayName] = row[key];
    }

    return convertedRow;
  };

  useEffect(() => {
    if (location.pathname.toLowerCase().includes("/dashboard")) {
      setNav(true);
    } else {
      setNav(false);
    }
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

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(window.orientation);
    };

    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    switch (device) {
      case "mobile":
        hideMenu();
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

    if (orientation == 90 || orientation == -90) {
      setSkipRows([
        "Article No.",
        "In Price",
        "Unit",
        "In Stock",
        "Description",
      ]);
    }
  }, [device, orientation]);

  return (
    <div className={menuHide ? "PriceList" : "PriceList"}>
      <div className="priceListController">
        <div className="left">
          <div className="input">
            <input
              type="text"
              placeholder={
                pageContent["input"] != undefined ? pageContent["input"][0] : ""
              }
            />
            <Assets.Icons.Search />
          </div>
          <div className="input">
            <input
              type="text"
              placeholder={
                pageContent["input"] != undefined ? pageContent["input"][1] : ""
              }
            />
            <Assets.Icons.Search />
          </div>
        </div>

        <div className="right">
          <button className="NewProduct">
            <p>
              {pageContent["button"] != undefined && pageContent["button"][0]}
            </p>
            <Assets.Icons.Plus />
          </button>
          <button className="PrintList">
            <p>
              {pageContent["button"] != undefined && pageContent["button"][1]}
            </p>
            <Assets.Icons.Print />
          </button>
          <button className="AdvancedMode">
            <p>
              {pageContent["button"] != undefined && pageContent["button"][2]}
            </p>
            <Assets.Icons.Toggle />
          </button>
        </div>
      </div>

      <div className="tableContainer">
        {table.columns != undefined && table.rows != undefined && (
          <Components.Table
            columns={table.columns}
            rows={table.rows}
            skipRows={skipRows}
          />
        )}
      </div>
    </div>
  );
}

export default PriceList;
