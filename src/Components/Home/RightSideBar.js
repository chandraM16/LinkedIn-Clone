import React from "react";
import { newsObj } from "./rightNewsObj";

export const RightSideBar = () => {
  return (
    <>
      <h5 className="right_Cont_heading">
        LinkedIn News{" "}
        <span className="material-symbols-outlined" style={{ margin: "0 0.5rem" }}>
          newspaper
        </span>
      </h5>
      <ul className="news_list">
        {newsObj.map((news, i) => {
          return (
            <div className="news_item_box" key={i}>
              <li className="news_list_item">
                <p className="news_title">{news[0]}</p>
                <span>{news[1]}</span>
              </li>
            </div>
          );
        })}
      </ul>
    </>
  );
};
