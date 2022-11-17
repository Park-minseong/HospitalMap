import axios from "axios";
import React from "react";

const Details = ({ detailsData }) => {
  const onClickSave = () => {
    axios.post("/");
  };

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
      <button type="button" onClick={onClickSave}>
        저장하기
      </button>
    </div>
  );
};

export default Details;
