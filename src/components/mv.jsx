import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import '../assest/style/mv.less'   // 搜索样式
// import axios from 'axios'
// import { Link } from 'react-router-dom'
class MVpage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',                            // 搜索的关键词
            result: [],                                  // 搜索结果
            loading: false,                                // 是否显示动画
            oldkeywork: null
        }
    }
    render() {
        return (
            <div className="mv">
                <video className="mp4video" controls="controls" autoplay="autoplay">
                    <source src="movie.ogg" type="video/ogg" />
                    <source src="http://v4.music.126.net/20170422034915/c98eab2f5e2c85fc8de2ab3f0f8ed1c6/web/cloudmusic/MjQ3NDQ3MjUw/89a6a279dc2acfcd068b45ce72b1f560/533e4183a709699d566180ed0cd9abe9.mp4" type="video/mp4" />
                    Your browser does not support the video tag.</video>
            </div>
        );
    }
}


export default MVpage;