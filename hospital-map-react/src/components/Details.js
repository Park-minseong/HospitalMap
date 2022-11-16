import React from "react";

const Details = ({ detailsData }) => {
  return (
    <div
      id="details"
      style={{
        width: "100%",
        height: "190px",
        marginTop: "10px",
      }}
    >
      {detailsData.yadmNm}
    </div>
  );
};

export default Details;
