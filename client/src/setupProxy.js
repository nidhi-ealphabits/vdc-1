const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/*",
    createProxyMiddleware({
      target: "http://localhost:8000",
      // target: "https://15.206.231.201/",
      changeOrigin: true,
    })
  );
};
