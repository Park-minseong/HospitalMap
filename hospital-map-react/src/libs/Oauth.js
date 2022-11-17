const REST_API_KEY = "c410f6367d298abcb2c4126b555146b0";
const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth2/kakao";
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
