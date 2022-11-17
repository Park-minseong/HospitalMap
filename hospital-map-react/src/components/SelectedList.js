import axios from "axios";
import React, { useEffect, useState } from "react";

const SelectedList = ({ selectedList, setSelectedList }) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    axios
      .get("/getSelectedList", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((response) => {
        if (response.data.result === "successed") {
          setSelectedList(response.data.selectedList);
        } else if (response.data.result === "userId is null") {
          setStatus("유저정보가 없습니다.");
        }
      });
  }, []);

  return (
    <div
      id="SelectedList"
      style={{
        minWidth: "400px",
        height: "100%",
        background: "gray",
      }}
    >
      {status === "유저정보가 없습니다." ? (
        <div>유저정보가 없습니다.</div>
      ) : selectedList.length > 0 ? (
        selectedList.map((data, index) => <div key={index}>{data.yadmNm}</div>)
      ) : (
        <div>저장된 병원이 없습니다.</div>
      )}
    </div>
  );
};

export default SelectedList;
