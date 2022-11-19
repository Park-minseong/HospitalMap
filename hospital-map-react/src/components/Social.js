import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../apiConfig";

const Social = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code !== null) {
      axios
        .get(API_URL + "/oauth2/kakao", { params: { code: code } })
        .then((response) => {
          console.log(response);
          if (response.data.user !== null) {
            window.sessionStorage.setItem(
              "ACCESS_TOKEN",
              response.data.user.token
            );
            navigate("/", { replace: true });
          }
        });
    }
  }, [code]);

  return <div></div>;
};

export default Social;
