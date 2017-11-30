import React, { Component } from 'react'
import '../assest/style/play.less'   // 搜索样式
import axios from 'axios'
class Play extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: null,
            songname: null,    // 名
            singer: null,       // 歌手
            lyric: null,        // 歌词
            photo: null         // 封面
        }
    }
    componentDidMount() {
        // console.log(this.props.match)
        // 这里写请求数据
        const id = this.props.match.params.id  // 获取请求id
        axios.get(`/details?ids=${id}`).then(data => {
            if (data.data.code === 200) {
                this.setState({
                    details: data.data,
                    songname: data.data.songs[0].name,
                    singer: data.data.songs[0].ar[0].name,
                    photo: data.data.songs[0].al.picUrl
                })
            } else {
                this.setState({
                    details: null
                })
            }
        }).catch(err => {
            // console.log('error----', err)
            this.setState({
                details: null
            })
        })
        axios.get(`/lyric?id=${id}`).then(data => {
            if (data.data.code === 200) {
                let lyricObj = data.data.lrc.lyric
                const lyricTime = lyricObj.replace(/\[\S*\]/ig, '')
                console.log('lsycr---', lyricTime)
                this.setState({
                    lyric: data.data.lrc.lyric
                })
            }
        })
    }
    render() {
        // var lysrcObj = this.getData()
        // console.log('s--', typeof lysrcObj, toString(lysrcObj))
        // let lysrcTime = lysrcObj.replace(/\[\s?\]/, '')
        // console.log('this.state.lyric', lysrcObj)
        return (
            <div className="play-bg" style={{ backgroundImage: `url(${this.state.photo})` }}>
                <div className="play">
                    <div className="play-music-box">
                      <div className="play-music-photo">
                         <img src={this.state.photo} alt="封面"/>
                      </div>
                      <div className="play-music-btn"></div>
                    </div>
                    <div className="song-lyric">
                       <h4> <span>{this.state.songname}</span><span>&nbsp;-&nbsp;</span><span>{this.state.singer}</span></h4>
                       <div className="lyric-list">
                           <ul>
                               <li>我们都不一样</li>
                               <li className="on">我们都不一样</li>
                               <li>我们都不一样</li>
                           </ul>
                       </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Play;