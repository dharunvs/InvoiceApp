import "core-js/stable";
import "regenerator-runtime/runtime";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

ReactDOM.render(<App />, document.getElementById("root"));
