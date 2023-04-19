import React from "react";
import { FooterList } from "./FooterList";
import { footerData } from "./footerData";
import "../Footer/footer.css";
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container2">
        <div className="footer_logo_box">
          <img
            src="https://www.freepnglogos.com/uploads/linkedin-logo-transparent-png-25.png"
            alt=""
            className="footer_logo"
          />
        </div>
        {Object.keys(footerData).map((heading, i) => {
          return <FooterList heading={heading} key={i} />;
        })}
      </div>
    </footer>
  );
};
