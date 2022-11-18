import axios from "axios";
import React from "react";

const Details = ({ detailsData, selectedList, setSelectedList }) => {
  const onClickSave = () => {
    axios
      .post(
        "/saveinfo",
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

  return (
    <div
      id="details"
      style={{
        width: "100%",
        height: "190px",
        marginTop: "10px",
        boxSizing: "border-box",
        border: "1px solid gray",
      }}
    >
      {Object.keys(detailsData).length !== 0 && (
        <div>
          {detailsData.yadmNm}

          <button type="button" onClick={onClickSave}>
            저장하기
          </button>

          <button type="button">삭제하기</button>
        </div>
      )}
    </div>
  );
};

export default Details;
