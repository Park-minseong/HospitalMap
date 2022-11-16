import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../apiConfig";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [regUserId, setRegUserId] = useState("");
  const [regUserPw, setRegUserPw] = useState("");

  const onSubmitLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/user/login`, { userId: userId, userPw: userPw })
      .then((response) => {
        console.log(response.data);
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
      .post(`${API_URL}/user/join`, { userId: regUserId, userPw: regUserPw })
      .then((response) => {
        console.log(response.data);
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
        style={{ width: "450px", margin: "0 auto" }}
        onSubmit={onSubmitLogin}
      >
        <fieldset>
          <legend>로그인</legend>
          <input
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={userPw}
            onChange={(e) => {
              setUserPw(e.target.value);
            }}
          />
          <button type="submit">로그인</button>
        </fieldset>
      </form>

      <form
        className="regForm"
        style={{ width: "450px", margin: "0 auto" }}
        onSubmit={onSubmitReg}
      >
        <fieldset>
          <legend>회원가입</legend>
          <input
            type="text"
            placeholder="아이디"
            value={regUserId}
            onChange={(e) => {
              setRegUserId(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={regUserPw}
            onChange={(e) => {
              setRegUserPw(e.target.value);
            }}
          />
          <button type="submit">회원가입</button>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
