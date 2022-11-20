import axios from "axios";
import React from "react";
import { API_URL } from "../apiConfig";

const Details = ({ detailsData, selectedList, setSelectedList }) => {
  const onClickSave = () => {
    axios
      .post(
        API_URL + "/selected",
        { ...detailsData, xpos: detailsData.XPos, ypos: detailsData.YPos },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
          },
        }
      )
      .then((response) => {
        if (response.data.result === "successed") {
          alert("저장했습니다.");
          setSelectedList([...selectedList, response.data.savedSelected]);
        } else if (response.data.result === "already") {
          alert("이미 저장되어 있습니다.");
        }
      });
  };

  const onClickDelete = () => {
    axios
      .delete(API_URL + "/selected", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
        params: {
          ykiho: detailsData.ykiho,
        },
      })
      .then((response) => {
        if (response.data.result === "successed") {
          alert("삭제했습니다.");
          setSelectedList(
            selectedList.filter((item) => item.ykiho !== detailsData.ykiho)
          );
        } else if (response.data.result === "no data") {
          alert("저장중인 병원이 아닙니다.");
        }
      });
  };

  return (
    <div
      id="details"
      style={{
        width: "100%",
        height: "140px",
        marginTop: "10px",
        boxSizing: "border-box",
        border: "1px solid gray",
      }}
    >
      {Object.keys(detailsData).length !== 0 ? (
        <div style={{ textAlign: "center" }}>
          <button type="button" onClick={onClickSave}>
            저장하기
          </button>
          <button type="button" onClick={onClickDelete}>
            삭제하기
          </button>
          <div style={{ marginTop: "5px" }}>병원명: {detailsData.yadmNm}</div>
          <div style={{ marginTop: "5px" }}>전화번호: {detailsData.telno}</div>
          <div style={{ marginTop: "5px" }}>
            주소: {detailsData.postNo}, {detailsData.addr}
          </div>
          {detailsData.hospUrl ? (
            <div style={{ marginTop: "5px" }}>
              홈페이지: <a href={detailsData.hospUrl}>{detailsData.hospUrl}</a>
            </div>
          ) : null}
        </div>
      ) : (
        "마커를 클릭하여 상제정보 표시"
      )}
    </div>
  );
};

export default Details;
