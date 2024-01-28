import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../../data";
import "./Terms.css";

function Terms({ setNav }) {
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

  const [pageContent, setPageContent] = useState({});

  useEffect(() => {
    axios
      .get(baseURL + "/webpagecontent/english")
      .then((res) => res["data"])
      .then((res) => {
        setPageContent(res.content["Terms"]);
      });
  }, []);

  return (
    <div className="Terms">
      <h1>{pageContent["heading"]}</h1>
      {pageContent["button"] != undefined && (
        <button>{pageContent["button"]}</button>
      )}
      {pageContent["content"] != undefined && (
        <div className="content">
          {pageContent["content"].map((p, key) => (
            <p key={key}>{p}</p>
          ))}
        </div>
      )}
      {pageContent["button"] != undefined && (
        <button>{pageContent["button"]}</button>
      )}
    </div>
  );
}

export default Terms;
