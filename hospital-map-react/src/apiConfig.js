const hostname = window && window.location && window.location.hostname;
let url;
if (hostname === "localhost") {
  url = `https://${hostname}:8070`;
} else {
  url = `https://${hostname}:8070`;
}

export const API_URL = url;
