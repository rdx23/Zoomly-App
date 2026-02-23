let IS_PROD = true;
const server = IS_PROD
  ? "https://zoomlybackendapp.onrender.com"
  : "http://localhost:5000";

export default server;
