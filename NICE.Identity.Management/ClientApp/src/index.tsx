import React from "react";
import { createRoot } from "react-dom/client";

import "@nice-digital/design-system/scss/base.scss";

import "./styles.scss";

import { App } from "./components/App/App";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);
