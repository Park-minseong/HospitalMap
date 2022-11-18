import React from "react";

const ListItem = ({ data }) => {
  return (
    <div
      id="ListItem"
      style={{
        height: "80px",
        borderRadius: "5px",
        border: "1px solid gray",
        background: "rgb(250,250,250)",
        fontSize: "0.8em",
        marginBottom: "5px",
        cursor: "pointer",
        padding: "3px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div>병원명: {data.yadmNm}</div>
      <div>
        주소: {data.postNo}, {data.addr}
      </div>
      <div>등록일: {data.insDate.split("T", 1)}</div>
    </div>
  );
};

export default ListItem;
