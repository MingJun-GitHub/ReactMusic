import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '../assest/style/play.less'   // 搜索样式
import axios from 'axios'
import { Link } from 'react-router-dom'
class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // id: null,            //id
            details: null,
            songname: null,      // 名
            singer: null,        // 歌手
            lyric: null,         // 歌词
            photo: null,         // 封面
            comment: null,       // 封面
            recsong: null,       // 推荐歌曲
            recmv: null,         // 推荐MV
            recplaylist: null,   // 推荐歌单
            mp3url: null,        // 音乐播放链条
            isplay: false,       // 是否改变 
            curPlayTime: 0,      // 当前播放时间
            curLyricIndex: 0     // 播放到当前的时间点
        }
        this.getSongDetails = this.getSongDetails.bind(this)
        this.getSongLyric = this.getSongLyric.bind(this)
        this.getSongComment = this.getSongComment.bind(this)
        this.getSongSiMi = this.getSongSiMi.bind(this)
        this.getSongSheetSiMi = this.getSongSheetSiMi.bind(this)
        this.getMvSiMi = this.getMvSiMi.bind(this)
        this.getMp3URL = this.getMp3URL.bind(this)
        this.goMusicurl = this.goMusicurl.bind(this)
        this.playMusic = this.playMusic.bind(this)
        this.RollLyric = this.RollLyric.bind(this)
        this.StopRollLyric = this.StopRollLyric.bind(this)
        this.formatTime = this.formatTime.bind(this)
    }
    componentDidMount() {
        // console.log(this.props.match)
        // 这里写请求数据
        const id = this.props.match.params.id  // 获取请求id
        this.getSongDetails(id)
        // this.getSongLyric(id)
        this.getSongComment(id)
        this.getSongSiMi(id)
        this.getSongSheetSiMi(id)
    }
    // 获取歌曲详情
    getSongDetails(id) {
        axios.get(`/details?ids=${id}`).then(data => {
            if (data.data.code === 200) {
                // Object.assign()
                this.setState({
                    details: data.data,
                    songname: data.data.songs[0].name,
                    singer: data.data.songs[0].ar[0].name,
                    photo: data.data.songs[0].al.picUrl
                })
                this.getSongLyric(id)
                this.getMvSiMi(data.data.songs[0].mv)
                this.getMp3URL(id)    // 获取音乐url，用来播放
            } else {
                this.setState({
                    details: null
                })
            }
        }).catch(err => {
            this.setState({
                details: null
            })
        })
    }
    // 获取歌词
    getSongLyric(id) {
        axios.get(`/lyric?id=${id}`).then(data => {
            if (data.data.code === 200) {
                let lyricObj = data.data.lrc.lyric
                const lyricTime = lyricObj.match(/\[\d{2}:\d{2}\.\d{2}\]/ig).map((val) => {
                    // console.log(val.replace(/\[/ig, '').replace(/\]/ig, ''))
                    return val.replace(/\[/ig, '').replace(/\]/ig, '')
                })
                const lyricItem = lyricObj.replace(/\[\S*\]/ig, '').split('\n').filter((val) => {
                    return !(!val || val === '');
                })
                this.setState({
                    lyric: {
                        lyricTime: lyricTime,
                        lyricItem: lyricItem
                    }
                })
            }
        })
    }
    // 获取评论
    getSongComment(id) {
        axios.get(`/comment/?id=${id}&limit=10`).then(data => {
            if (data.data.code === 200) {
                // console.log('获取评论-----', data.data)
                this.setState({
                    comment: data.data
                })
            }
        }).catch(err => {
            console.log('error---', err)
            this.setState({
                comment: null
            })
        })
    }
    // 改变时间 
    chnageTime(time) {
        return new Date(time).toLocaleDateString().replace(/\//, '年').replace(/\//, '月')
        // return new Date(parseInt(time)).toLocaleString()
    }
    // 加载歌曲
    getSongSiMi(id) {
        axios.get(`/simi?id=${id}&limit=7`).then(data => {
            if (data.data.code === 200) {
                this.setState({
                    recsong: data.data
                })
            }
        })
    }
    getMvSiMi(id) {
        axios.get(`/simimv?mvid=${id}`).then(data => {
            if (data.data.code === 200) {
                this.setState({
                    recmv: data.data
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    getSongSheetSiMi(id) {
        axios.get(`/simisongsheet?id=${id}`).then(data => {
            if (data.data.code === 200) {
                this.setState({
                    recplaylist: data.data
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    getMp3URL(id) {
        axios.get(`/mp3url?id=${id}`).then(data => {
            if (data.data.code === 200) {
                this.setState({
                    mp3url: data.data.data
                })
            }
        }).catch(err => {
            console.log(err)
        })
    }
    goMusicurl(id) {
        window.location.reload()
    }
    playMusic() {
        const audios = ReactDOM.findDOMNode(this.refs.audio)
        const liheight = document.querySelectorAll('.lyric-list li')[0].offsetHeight
        console.log('liheight000', liheight)
        if (audios) {
            if (!audios.paused) {
                // false 就是播放中
                audios.pause()
                this.StopRollLyric()
            } else {
                audios.play()
                this.RollLyric(audios, liheight)
            }
            this.setState({
                isplay: !this.state.isplay
            })
        }
    }
    RollLyric(obj, height) {
        this.timer = setInterval(() => {
            var res = this.formatTime(obj.currentTime)
            // console.log('是不是存在中', )
            const _index = this.state.lyric.lyricTime.indexOf(res)
            if (_index!==-1){
               // 不为-1的话，就开始滚动
               document.querySelector('.lyric-list ul').style.webkitTransform="translate(0px,"+(-height*_index+height)+"px) scale(1)";
               this.setState({
                curLyricIndex: _index
               })
            }
            this.setState({
                curPlayTime: obj.currentTime
            })
        }, 0.1)
    }
    formatTime(t) {
        var m = '00'
        var s = '00.00'
        if (t > 60) {
            m = parseInt(t / 60, 10)
            s = t % 60
        } else {
            s = t
        }
        m = m < 10 ? `0${parseInt(t / 60, 10)}` : parseInt(t / 60, 10)
        s = s < 10 ? `0${String(s.toFixed(2))}` : String(s.toFixed(2))
        return `${m}:${s}`
    }
    StopRollLyric() {
        clearInterval(this.timer)
    }
    render() {
        const hasDetais = this.state.details
        const hasLyric = this.state.lyric
        const hasComment = this.state.comment
        const hasRecsong = this.state.recsong
        const hasRecMv = this.state.recmv
        const hasReplaylist = this.state.recplaylist
        const hasUrl = this.state.mp3url
        return (
            hasDetais ? <div className="playvideo">
                <div className="playbg" style={{ backgroundImage: `url(${this.state.photo})` }}></div>
                <div className="play">
                    <div className={`play-music-box ${this.state.isplay ? 'play-ani' : ''}`} onTouchStart={this.playMusic.bind(this)}>
                        <div className="play-music-photo">
                            <img src={this.state.photo} alt="封面" />
                        </div>
                        <div className="play-music-btn" style={{ display: this.state.isplay ? 'none' : 'block' }}></div>
                    </div>
                    <div className="song-lyric">
                        <h4> <span>{this.state.songname}</span><span>&nbsp;-&nbsp;</span><span>{this.state.singer}</span></h4>
                        <div className="lyric-list">
                            {hasLyric && hasLyric['lyricItem'].length ? <ul>
                                {
                                    this.state.lyric['lyricItem'].map((val, index) => {
                                        let hasOn = index === this.state.curLyricIndex ? 'on' : ''
                                        return <li className={hasOn} key={index}>{val}</li>
                                    })
                                }
                            </ul> : ''}
                        </div>
                    </div>
                    <div className="comment-list">
                        <h3>精彩评论</h3>
                        {hasComment ?
                            <ul>
                                {this.state.comment.hotComments.map((val, index) => {
                                    return <li key={index}>
                                        <div className="comment-header"><img src={val.user.avatarUrl} alt="头像" /></div>
                                        <div className="comment-main">
                                            <p>{val.user.nickname}</p>
                                            <p>{this.chnageTime.call(this, val.time)}</p>
                                            <div className="comment-main-info">{val.content}</div>
                                        </div>
                                    </li>
                                })}
                            </ul> : <div>没有信息</div>
                        }
                        <h4>查看全部评论&gt;</h4>
                    </div>
                    <div className="rec-playlist">
                        <h3>推荐歌单</h3>
                        {
                            hasReplaylist ? <ul>
                                {this.state.recplaylist.playlists.map((val, index) => {
                                    return <li key={index}>
                                        <Link to={`/playlist/${val.id}`}>
                                            <div className="pic"><img src={val.coverImgUrl} alt="封面" /></div>
                                            <div className="info">
                                                <p className="name">{val.name}</p>
                                                <p className="songs">{val.tags.join(',')}</p>
                                            </div>
                                        </Link>
                                    </li>
                                })}
                            </ul> : <div>没有信息</div>
                        }
                    </div>
                    <div className="rec-mv">
                        <h3>相似MV</h3>
                        {
                            hasRecMv ? <ul>
                                {
                                    this.state.recmv.mvs.map((val, index) => {
                                        return <li key={index}>
                                            <Link to={`/mv/${val.id}`}>
                                                <div className="pic"><img src={val.cover} alt="封面" /><i></i></div>
                                                <div className="info">
                                                    <p className="name">{val.name}</p>
                                                    <p className="songs">{val.artistName}</p>
                                                </div>
                                            </Link>
                                        </li>
                                    })}
                            </ul> : <div>没有信息</div>
                        }
                    </div>
                    <div className="rec-music">
                        <h3>喜欢的人喜欢听这几首歌</h3>
                        {
                            hasRecsong ? <ul>
                                {
                                    this.state.recsong.songs.map((val, index) => {
                                        return <li key={index}>
                                            <Link to={`/play/${val.id}`} onClick={this.goMusicurl.bind(this, val.id)}>
                                                <div className="pic"><img src={val.album.picUrl} alt="1" /></div>
                                                <div className="desc">
                                                    <p classNamen="name">{val.name}</p>
                                                    <p className="songs">{val.artists[0].name}-{val.album.name}</p>
                                                </div>
                                            </Link>
                                        </li>
                                    })
                                }
                            </ul> : <div>没有信息</div>
                        }
                    </div>
                    {
                        hasUrl ? <audio id="mpvideos" ref="audio" style={{ display: 'none' }} src={this.state.mp3url[0].url} preload="metadata" controls /> : <div>没有播放链接</div>
                    }
                </div>
            </div> : <div>没有详情</div>
        );
    }
}
export default Play;