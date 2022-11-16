import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Details from "../components/Details";
import Map from "../components/Map";
import SelectedList from "../components/SelectedList";

const Service = () => {
  const [data, setData] = useState([]);
  const [radius, setRadius] = useState(0);
  const [centerXPos, setCenterXPos] = useState("");
  const [centerYPos, setCenterYPos] = useState("");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  //geolocation을 사용할 수 있으면 내 lat,long 내 현재 좌표로 변경
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
  }, []);

  const getDataApi = useCallback(() => {
    axios
      .get(
        `https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList?serviceKey=kS3LFJtXMu8jwui1luQ%2Fc5W2TWBrWX3BXa9jxOYO6s6bF3%2Bfp80rND5ux8MvizXc4BrqltuFIVM74BhzM%2FAMPQ%3D%3D&xPos=${centerXPos}&yPos=${centerYPos}&numOfRows=1000&radius=${radius}`
      )
      .then((response) => {
        console.log(response.data.response.body.totalCount);
        setData([...response.data.response.body.items.item]);
      });
  }, [radius, centerXPos, centerYPos]);

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
            getDataApi={getDataApi}
          ></Map>
        )}

        <Details></Details>
      </div>
      <SelectedList></SelectedList>
    </div>
  );
};

export default Service;
