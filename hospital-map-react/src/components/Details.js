import axios from "axios";
import React from "react";

const Details = ({ detailsData }) => {
  const onClickSave = () => {
    axios
      .post("/saveinfo", detailsData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((response) => console.log(response.data));
  };

  console.log(detailsData);

  return (
    <div
      id="details"
      style={{
        width: "100%",
        height: "190px",
        marginTop: "10px",
      }}
    >
      {Object.keys(detailsData).length !== 0 && (
        <button type="button" onClick={onClickSave}>
          저장하기
        </button>
      )}
    </div>
  );
};

export default Details;
