import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../apiConfig";
import { useNavigate } from "react-router";
import kakaoLogin from "../images/kakao_login_small.png";
import { KAKAO_AUTH_URL } from "../libs/Oauth";

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [regUserId, setRegUserId] = useState("");
  const [regUserPw, setRegUserPw] = useState("");

  const onSubmitLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/login`, { userId: userId, userPw: userPw })
      .then((response) => {
        if (response.data.user !== null) {
          window.sessionStorage.setItem(
            "ACCESS_TOKEN",
            response.data.user.token
          );
          navigate("/");
        } else {
          alert("로그인정보를 확인해주세요");
        }
      });
  };
  const onSubmitReg = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/join`, { userId: regUserId, userPw: regUserPw })
      .then((response) => {
        if (response.data.result === "successed") {
          alert("회원가입 완료");
          setRegUserId("");
          setRegUserPw("");
        } else {
          alert("다시 시도해주세요");
        }
      });
  };

  return (
    <div id="login">
      <form
        className="loginForm"
        style={{ width: "550px", margin: "0 auto" }}
        onSubmit={onSubmitLogin}
      >
        <fieldset
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <legend>로그인</legend>
          <input
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
            style={{
              height: "30px",
              boxSizing: "border-box",
              marginRight: "5px",
            }}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={userPw}
            onChange={(e) => {
              setUserPw(e.target.value);
            }}
            style={{
              height: "30px",
              boxSizing: "border-box",
              marginRight: "5px",
            }}
          />
          <button type="submit" style={{ height: "30px", marginRight: "5px" }}>
            로그인
          </button>
          <a href={KAKAO_AUTH_URL} style={{ height: "30px" }}>
            <img src={kakaoLogin} alt="" />
          </a>
        </fieldset>
      </form>

      <form
        className="regForm"
        style={{ width: "550px", margin: "0 auto" }}
        onSubmit={onSubmitReg}
      >
        <fieldset
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <legend>회원가입</legend>
          <input
            type="text"
            placeholder="아이디"
            value={regUserId}
            onChange={(e) => {
              setRegUserId(e.target.value);
            }}
            style={{
              height: "30px",
              boxSizing: "border-box",
              marginRight: "5px",
            }}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={regUserPw}
            onChange={(e) => {
              setRegUserPw(e.target.value);
            }}
            style={{
              height: "30px",
              boxSizing: "border-box",
              marginRight: "5px",
            }}
          />
          <button
            type="submit"
            style={{
              height: "30px",
              boxSizing: "border-box",
            }}
          >
            회원가입
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
