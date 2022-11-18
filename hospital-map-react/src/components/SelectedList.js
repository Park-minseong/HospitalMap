import axios from "axios";
import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";

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
        marginLeft: "10px",
        minWidth: "400px",
        height: "100%",
        padding: "5px",
        boxSizing: "border-box",
        border: "1px solid gray",
        overflowY: "scroll",
      }}
    >
      {status === "유저정보가 없습니다." ? (
        <div>유저정보가 없습니다.</div>
      ) : selectedList.length > 0 ? (
        selectedList.map((data, index) => <ListItem key={index} data={data} />)
      ) : (
        <div>저장된 병원이 없습니다.</div>
      )}
    </div>
  );
};

export default SelectedList;
