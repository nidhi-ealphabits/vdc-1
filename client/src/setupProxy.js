const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/",
    createProxyMiddleware({
      target: "http://localhost:8000",
      // target: "http://15.206.231.201:8000",
      // target: "https://testwebapp.ealphabits.com:8000",
      changeOrigin: true,
    })
  );
  // app.use(
  //   "/emotions",
  //   createProxyMiddleware({
  //     target: "http://testwebapp.ealphabits.com:8000",
  //     changeOrigin: true,
  //   })
  // );

  // app.use(
  //   "/users",
  //   createProxyMiddleware({
  //     target: "http://testwebapp.ealphabits.com:8000",
  //     changeOrigin: true,
  //   })
  // );

  // app.use(
  //   "/",
  //   createProxyMiddleware({
  //     target: "http://testwebapp.ealphabits.com:8000",
  //     changeOrigin: true,
  //   })
  // );

};
