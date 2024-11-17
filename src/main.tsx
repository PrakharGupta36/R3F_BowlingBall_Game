import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { isDesktop, isTablet } from "react-device-detect";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {isDesktop && window.innerWidth > 1200 && !isTablet ? (
      <App />
    ) : (
      <div className='mobile_only'>
        <div>
          <p> This website is desktop only, please view in desktop </p>
          
        </div>
      </div>
    )}
  </StrictMode>
);
