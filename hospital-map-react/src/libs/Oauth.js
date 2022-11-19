const hostname = window && window.location && window.location.hostname;
let KAKAO_REDIRECT_URI;
if (hostname === "localhost") {
  KAKAO_REDIRECT_URI = `http://${hostname}:3000/oauth2/kakao`;
} else {
  KAKAO_REDIRECT_URI = `https://${hostname}/oauth2/kakao`;
}
const REST_API_KEY = "c410f6367d298abcb2c4126b555146b0";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
