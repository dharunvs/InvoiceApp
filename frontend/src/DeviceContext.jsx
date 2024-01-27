import { createContext, useContext, useState, useEffect } from "react";

const DeviceContext = createContext();

export const useDeviceContext = () => {
  return useContext(DeviceContext);
};

export const DeviceProvider = ({ children }) => {
  const [device, setDevice] = useState("unknown");

  useEffect(() => {
    const updateDevice = () => {
      const windowWidth = document.documentElement.clientWidth;

      if (windowWidth <= 600 + "px") {
        setDevice("mobile");
      } else if (windowWidth <= 1024 + "px") {
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

  return (
    <DeviceContext.Provider value={device}>{children}</DeviceContext.Provider>
  );
};
