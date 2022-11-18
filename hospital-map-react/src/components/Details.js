import axios from "axios";
import React from "react";

const Details = ({ detailsData, selectedList, setSelectedList }) => {
  const onClickSave = () => {
    setSelectedList([{ ...detailsData, insDate: "" }].concat(selectedList));
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
          setSelectedList(response.data.selectedList);
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
          {selectedList.findIndex(
            (item) => item.ykiho === detailsData.ykiho
          ) === -1 ? (
            <button type="button" onClick={onClickSave}>
              저장하기
            </button>
          ) : (
            <button type="button">삭제하기</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Details;
