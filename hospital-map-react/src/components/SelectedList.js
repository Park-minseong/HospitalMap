import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import ListItem from "./ListItem";
import LoadingImg from "../images/loading2.gif";
import { API_URL } from "../apiConfig";

const SelectedList = ({ selectedList, setSelectedList, setDetailsData }) => {
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const listBox = useRef();
  const bottom = useRef();

  useEffect(() => {
    listBox.current.onscroll = function (e) {
      if (
        listBox.current.offsetHeight + listBox.current.scrollTop >=
        listBox.current.scrollHeight
      ) {
        if (isEnd === false) {
          setIsLoading(true);
          getSelectedList();
          listBox.current.onscroll = () => {
            e.preventDefault();
            e.stopPropagation();
          };
        }
      }
    };
    if (
      isEnd === false &&
      listBox.current.offsetHeight >= listBox.current.scrollHeight
    )
      getSelectedList();
    console.log(selectedList);
  }, [selectedList]);

  const getSelectedList = () => {
    axios
      .get(API_URL + "/getSelectedList", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
        params: {
          page: page,
        },
      })
      .then((response) => {
        console.log("통신");
        if (response.data.result === "successed") {
          if (response.data.selectedList.length === 0) {
            setIsEnd(true);
          } else {
            setPage(page + 1);
            setSelectedList(selectedList.concat(response.data.selectedList));
            setIsEnd(false);
          }
        } else if (response.data.result === "userId is null") {
          setStatus("유저정보가 없습니다.");
        }
        setIsLoading(false);
      });
  };

  return (
    <div
      id="SelectedList"
      style={{
        marginLeft: "10px",
        width: "400px",
        minWidth: "400px",
        height: "100%",
        padding: "5px 1px 5px 5px",
        boxSizing: "border-box",
        border: "1px solid gray",
        overflowY: "scroll",
      }}
      ref={listBox}
    >
      {status === "유저정보가 없습니다." ? (
        <div>유저정보가 없습니다.</div>
      ) : (
        selectedList.length > 0 &&
        selectedList.map((data, index) => (
          <ListItem key={index} data={data} setDetailsData={setDetailsData} />
        ))
      )}
      <div style={{ textAlign: "center" }}>
        {isLoading ? (
          <img
            src={LoadingImg}
            alt="loading"
            style={{ width: "20px", height: "20px" }}
          />
        ) : (
          <div ref={bottom} style={{ height: "20px" }}>
            {isEnd ? "더 이상 저장된 병원이 없습니다." : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectedList;
