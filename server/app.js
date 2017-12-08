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
app.use('/search', require('./router/search'));        // 加载搜索
app.use('/details', require('./router/details'));      // 加载歌曲详情
app.use('/lyric', require('./router/lyric'));          // 加载歌词获取
app.use('/comment', require('./router/comment'));      // 加载歌曲评论
app.use('/recommend', require('./router/recommend'));  // 加载推荐歌曲 登录后
app.use('/simi', require('./router/simi'));            // 找相似歌曲
app.use('/simimv', require('./router/simimv'));        // 找相似MV
app.use('/simisongsheet', require('./router/simisongsheet'));        // 找相似歌曲
app.use('/mp3url', require('./router/mp3url'));        // 获取mp3的url
app.use('/playlistdetails', require('./router/playlistdetails'))    // 歌单详情
app.listen(port, () => {
  console.log(`this music server running ${port}...`);
})
module.exports = app;