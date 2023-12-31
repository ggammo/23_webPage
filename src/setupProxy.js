const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
  app.use(
    createProxyMiddleware('/member/me', {
      //target: 'https://localhost:8080',
      target: 'http://taonas.iptime.org:8080',
      changeOrigin: true
    })
  )
  app.use(
    "ws",
    createProxyMiddleware({ target: "http://taonas.iptime.org:8080", ws: true })
   )
  /*app.use(
    createProxyMiddleware('/다른context', {
      target: 'https://다른호스트',
      pathRewrite: {
        '^/지우려는패스':''
      },
      changeOrigin: true
    })
  )*/
};