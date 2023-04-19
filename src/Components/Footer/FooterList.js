import React from "react";
import { footerData } from "./footerData";
export const FooterList = ({ heading }) => {
  return (
    <div className="footer_list_cont">
      <h4 className="footer_list_heading">{heading}</h4>
      <ul className="footer-list">
        {footerData[heading].map((text, i) => {
          return <li key={i}>{text}</li>;
        })}
      </ul>
    </div>
  );
};
