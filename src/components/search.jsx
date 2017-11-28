import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import '../assest/style/search.less'   // 搜索样式
import logo from '../assest/images/logo_b.png'
import axios from 'axios'
class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',                            // 搜索的关键词
            result: [],                                  // 搜索结果
            loading: false,                                // 是否显示动画
            oldkeywork: null
        }
        this.searchFun = this.searchFun.bind(this)
        this.keywordFun = this.keywordFun.bind(this)
    }
    searchFun() {
        this.setState({
            loading: true
        })
        axios.get(`/search?keywords=${this.state.keyword}`).then((data) => {
            if (data.data.code === 200) {
                this.setState({
                    result: data.data.result.songs
                })
            } else {
                this.setState({
                    result: null
                })
            }
            this.setState({
                loading: false
            })
        }).catch((err) => {
            this.setState({
                loading: false
            })
        })
    }
    keywordFun(event) {
        this.setState({
            keyword: event.target.value
        })
    }
    selectItems(index, val) {
        console.log('index', index, val)
    }
    componentWillMount() {
    }
    render() {
        return (
            <div className="search-bg">
                <div className="search">
                    <div className="logo"><img src={logo} alt="FIND MUSIC" /></div>
                    <div className='search-box'>
                        <input type="text" className="input" placeholder="输入你想听歌曲" maxLength="30" value={this.state.keyword} onChange={this.keywordFun} />
                        <button onClick={this.searchFun}>搜索</button>
                    </div>
                    {/* <div className="search-result">
                       {this.state.keyword}
                    </div> */}
                    <div className="search-result">
                        {this.state.loading ? <div className="loading"><p>搜索中....</p></div> : ''}
                        {!this.state.result ? <div className="empty"><p>没有你的要找的'{this.state.keyword}'歌曲....</p></div> :
                            this.state.result.length ? <div className="music-list">
                                <ul>
                                    {/* {this.state.result.map((val, index) => {
                                       return <Items key={index} val={val} />
                                    })} */}
                                    {this.state.result.map((val, index) => {
                                        return <li onClick={this.closeLoading.bind(this, index, val)} key={index}> <span>{val.artists[0].name}</span>-<span>{val.album.name}</span></li>
                                    })}
                                </ul></div> : ''
                        }
                    </div>
                </div>
            </div>
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

export default SearchPage;