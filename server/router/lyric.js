const router = require('express')();
const request = require('request');
const { createWebAPIRequest } = require('../utils/req');

router.get('/', (req, res) => {
  const cookie = req.get('Cookie') ? req.get('Cookie') : ''
  const data = {}
  const id = req.query.id
  createWebAPIRequest(
    'music.163.com',
    '/weapi/song/lyric?os=osx&id=' + id + '&lv=-1&kv=-1&tv=-1',
    'POST',
    data,
    cookie,
    music_req => {
      res.send(music_req)
    },
    err => res.status(502).send('fetch error')
  )
})

module.exports = router