import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Details from "../components/Details";
import Map from "../components/Map";
import SelectedList from "../components/SelectedList";
import { API_URL } from "../apiConfig";
import { useNavigate } from "react-router";

const Service = ({ user }) => {
  const [userId, setUserId] = useState();
  const [data, setData] = useState([]);
  const [radius, setRadius] = useState(0);
  const [centerXPos, setCenterXPos] = useState("");
  const [centerYPos, setCenterYPos] = useState("");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [detailsData, setDetailsData] = useState({});
  const [selectedList, setSelectedList] = useState([]);
  const navigate = useNavigate();

  // geolocation을 사용할 수 있으면 내 lat,long 내 현재 좌표로 변경
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    } else {
      setLat(33.450701);
      setLong(126.570667);
    }

    axios
      .get(API_URL + "/getUserInfo", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("ACCESS_TOKEN"),
        },
      })
      .then((response) => {
        console.log(response);
        if (response.data.user !== null) {
          setUserId(response.data.user);
        } else {
          sessionStorage.setItem("ACCESS_TOKEN", "");
          alert("다시 로그인해주세요");
          navigate("/login");
        }
      });
  }, [sessionStorage.getItem("ACCESS_TOKEN")]);

  const getDataApi = useCallback(() => {
    axios
      .get(
        `https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList?serviceKey=kS3LFJtXMu8jwui1luQ%2Fc5W2TWBrWX3BXa9jxOYO6s6bF3%2Bfp80rND5ux8MvizXc4BrqltuFIVM74BhzM%2FAMPQ%3D%3D&xPos=${centerXPos}&yPos=${centerYPos}&numOfRows=1000&radius=${radius}`
      )
      .then((response) => {
        console.log(response.data);
        setData([...response.data.response.body.items.item]);
      });
  }, [radius, centerXPos, centerYPos]);

  // 지도 배율,위치 변경 시 자동으로 getDataApi함수 호출
  useEffect(() => {
    if (lat !== 0 && long !== 0) getDataApi();
  }, [radius, centerXPos, centerYPos]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
        }}
      >
        {lat === 0 && long === 0 ? (
          <div>현재위치 검색 중...</div>
        ) : (
          <Map
            data={data}
            lat={lat}
            long={long}
            setRadius={setRadius}
            setCenterXPos={setCenterXPos}
            setCenterYPos={setCenterYPos}
            setDetailsData={setDetailsData}
          ></Map>
        )}

        <Details
          detailsData={detailsData}
          selectedList={selectedList}
          setSelectedList={setSelectedList}
        ></Details>
      </div>
      <div>
        <div
          style={{
            border: "1px solid gray",
            margin: "0 0 5px 10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "30px",
            boxSizing: "border-box",
            padding: "5px",
          }}
        >
          <p style={{ fontSize: "0.5em", margin: "0" }}>
            100m이하 축척에서만 마커 표시
          </p>
          <div>
            <span style={{ fontSize: "0.7em", margin: "0 5px 0 0" }}>
              {userId}
            </span>
            <button
              type="button"
              style={{ fontSize: "0.5em", height: "20px" }}
              onClick={() => {
                sessionStorage.setItem("ACCESS_TOKEN", "");
              }}
            >
              로그아웃
            </button>
          </div>
        </div>
        <SelectedList
          selectedList={selectedList}
          setSelectedList={setSelectedList}
          setDetailsData={setDetailsData}
        ></SelectedList>
      </div>
    </div>
  );
};

export default Service;
