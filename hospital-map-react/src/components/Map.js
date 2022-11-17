import React, { useEffect, useState } from "react";

const { kakao } = window;

const Map = ({
  data,
  setRadius,
  setCenterXPos,
  setCenterYPos,
  lat,
  long,
  getDataApi,
  setDetailsData,
}) => {
  const [map, setMap] = useState();
  const [markers, setMarkers] = useState([]);

  //두좌표간의 거리 계산
  const getDistanceKm = (lat1, lng1, lat2, lng2) => {
    const deg2rad = (deg) => {
      return deg * (Math.PI / 180);
    };

    const R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1); // deg2rad below
    let dLon = deg2rad(lng2 - lng1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c * 1000; // 거리 m 반환
    return d;
  };

  //카카오맵 렌더링
  useEffect(() => {
    const container = document.getElementById("Map");
    const options = {
      center: new kakao.maps.LatLng(lat, long),
      level: 4,
    };
    setMap(new kakao.maps.Map(container, options));
  }, []);

  //맵 로딩 시 최초 1회 실행
  useEffect(() => {
    if (map !== undefined) {
      //내위치 마커표시 시작
      let position = new kakao.maps.LatLng(lat, long);

      // 마커 위에 표시할 인포윈도우를 생성한다
      var myInfowindow = new kakao.maps.InfoWindow({
        content:
          '<div style="text-align:center; width:150px; padding:5px; font-size: 15px">현재 위치</div>', // 인포윈도우에 표시할 내용
      });

      //내위치 마커
      let myMarker = new kakao.maps.Marker({
        map: map,
        position: position,
        title: "내위치",
      });

      // 인포윈도우를 지도에 표시한다
      myInfowindow.open(map, myMarker);
      //내위치 마커표시 끝

      reloadData();
    }
  }, [map]);

  useEffect(() => {
    if (map !== undefined) {
      if (map.getLevel() <= 4) {
        const newMarkers = [];
        data.forEach((item) => {
          let position = new kakao.maps.LatLng(item.YPos, item.XPos);
          let marker = new kakao.maps.Marker({
            map: map,
            position: position,
            title: item.yadmNm,
          });

          var customOverlay = new kakao.maps.CustomOverlay({
            map: map,
            content: `<div style="border: 1px solid gray; border-radius: 5px; padding:0 5px;background:#fff;">${item.yadmNm}</div>`,
            position: position, // 커스텀 오버레이를 표시할 좌표
            xAnchor: 0.5, // 컨텐츠의 x 위치
            yAnchor: 3, // 컨텐츠의 y 위치
          });

          customOverlay.setVisible(false);

          // 클릭이벤트
          // 선택된 마커의 병원정보는 detailsData에 담는다
          kakao.maps.event.addListener(marker, "click", function () {
            setDetailsData(item);
          });

          // 마우스오버 이벤트
          kakao.maps.event.addListener(marker, "mouseover", function () {
            customOverlay.setVisible(true);
          });

          // 마우스아웃 이벤트
          kakao.maps.event.addListener(marker, "mouseout", function () {
            customOverlay.setVisible(false);
          });
          newMarkers.push(marker);
        });
        setMarkers([...newMarkers]);
      }
    }
  }, [map, data]);

  const reloadData = () => {
    if (map.getLevel() > 4) {
      setMarkers(
        markers.map((marker) => {
          marker.setMap(null);
          return marker;
        })
      );
    } else {
      let center = map.getCenter();
      setCenterXPos(center.getLng());
      setCenterYPos(center.getLat());

      // 지도의 현재 영역을 얻어옵니다
      let bounds = map.getBounds();

      // 영역의 남서쪽 좌표를 얻어옵니다
      let swLatLng = bounds.getSouthWest();

      //지도 중앙과 끝점의 거리(반경)
      setRadius(
        getDistanceKm(
          center.getLat(),
          center.getLng(),
          swLatLng.getLat(),
          swLatLng.getLng()
        )
      );
    }
  };

  if (map) {
    //지도 드래그 이벤트 발생 시
    kakao.maps.event.addListener(map, "dragend", reloadData);

    //지도 확대/축소 이벤트 발생 시
    kakao.maps.event.addListener(map, "zoom_changed", reloadData);
  }

  return (
    <div
      id="Map"
      style={{
        width: "100%",
        height: "calc(100% - 200px)",
      }}
    ></div>
  );
};

export default Map;
