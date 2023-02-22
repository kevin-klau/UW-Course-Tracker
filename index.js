import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Site from "./Site";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Site />
  </StrictMode>
);