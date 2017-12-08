import React, { Component } from 'react'
import '../assest/style/playlist.less'   // 搜索样式
import { Link } from 'react-router-dom'
import axios from 'axios'
class PlayList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            playlist: null
        }
        this.getPlayList = this.getPlayList.bind(this)
    }
    getPlayList(id) {
        // 获取
        axios.get(`/playlistdetails?id=${id}`).then(data => {
            if (data.data.code === 200) {
                this.setState({
                    data: data.data,
                    playlist: data.data.playlist
                })
                console.log('播放--', this.state.playlist)
            }
        }).catch(err => {
            console.log('err', err)
        })
    }
    componentDidMount() {
        const id = this.props.match.params.id  // 获取请求id
        console.log('id', id)
        this.getPlayList(id)
    }
    render() {
        return (
            this.state.playlist ?
                <div className="playlist">
                    <div className="playlist-header">
                        <div className="playlist-bg" style={{ backgroundImage: `url(${this.state.playlist.creator.backgroundUrl})` }}></div>
                        <div className="playlist-info">
                            <div className="pic">
                                <img src={this.state.playlist.coverImgUrl} alt="封面" />
                                <div className="paly-num">播放:{this.state.playlist.playCount/10000>0?parseInt(this.state.playlist.playCount/10000, 10)+'万':this.state.playlist.playCount+'次'}</div>
                            </div>
                            <div className="info">
                                <h3>{this.state.playlist.name}</h3>
                                <div className="small"><img src={this.state.playlist.creator.avatarUrl} alt="头像" /> <p>{this.state.playlist.creator.nickname}</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="pllylist-tag">
                        {
                            this.state.playlist.tags.length ? <p> <label>标签</label>&nbsp;:&nbsp; {this.state.playlist.tags.map((val, index) => {
                                return <span key={index}>{val}</span>
                            })}</p> : ''
                        }
                        <p> <label>简介</label>&nbsp;:&nbsp; {
                            this.state.playlist.description ? this.state.playlist.description : '暂无简介- -!'
                        }</p>
                    </div>
                    <div className="playlist-songs">
                        <div className="tit">歌曲列表</div>
                        {
                            this.state.playlist.tracks.length ? <ul> {this.state.playlist.tracks.map((val, index) => {
                                return <li key={index}>
                                    <Link to={`/play/${val.id}`}>
                                        <div className="num">{index+1}</div>
                                        <div className="info">
                                            <h4>{val.name}</h4>
                                            <p>{val.ar[0].name}-{val.al.name}</p>
                                        </div>
                                    </Link>
                                </li>
                            })}
                            </ul> : <div>暂无歌曲</div>
                        }

                    </div>
                    {/* <div className="comment-list">
                    <div className="tit">热门评论</div>
                    <ul>
                        <li>
                            <div className="comment-header"><img src="http://p1.music.126.net/n-aG6luLs0FKWYA2sLvg9A==/18878614648957033.webp?imageView&thumbnail=90x0&quality=75&tostatic=0&type=webp" alt="1" /></div>
                            <div className="comment-main">
                                <p>1111111</p>
                                <p>2018年12月1号</p>
                                <div className="comment-main-info">xxx</div>
                            </div>
                        </li>
                    </ul>
                </div> */}
                </div> : <div>加载中</div>
        );
    }
}

// {((result) => {
//     let views = [];
//     result.map((val, index) => {
//         let item = <li key={index}> <span>{val.artists[0].name}</span>-<span>{val.name}</span></li>
//         views.push(item)
//         return ''
//     })
//     return views
// })(this.state.result)
// }

// class Items extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {}
//     }
//     render() {
//         // console.log('this----',this.props.val)
//         return (
//             <li> <span>{this.props.val.artists[0].name}</span>-<span>{this.props.val.name}</span></li>
//         )
//     }
// }


// SearchPage.propTypes = {
// };

export default PlayList;