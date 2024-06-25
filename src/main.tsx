import "./index.css";

import App from "./App";
import React from "react";
import {createRoot} from "react-dom/client";

const container = document.getElementById("root");
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    throw new Error("Could not find root element");
}
