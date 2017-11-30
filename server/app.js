const express = require('express');
const app = express();
const apicache = require('apicache');
// 设置服务端口
const port = process.env.PORT || 3030
// 设置一下缓存
var cache = apicache.middleware;
// 设置一下跨域
app.all('*', (req, res, next) => {
  if (req.path !== '/' && !req.path.includes('.')) {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', req.headers['origin'] || '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('Content-Type', 'application/json;charset=utf-8')
  }
  next()
});
// 缓存成功后缓存
const getSucApi = (req, res) => res.statusCode === 200;
app.use(cache('2 minutes', getSucApi));
// 加载路由
app.use('/search', require('./router/search'));    // 加载搜索
app.use('/details', require('./router/details'));  // 加载歌曲详情
app.use('/lyric', require('./router/lyric'));      // 加载歌词获取
app.listen(port, () => {
    console.log(`this music server running ${port}...`);
})
module.exports = app;