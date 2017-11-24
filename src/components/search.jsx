import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import '../assest/style/search.less';   // 搜索样式
class SearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className='search'>
                <div className='logo'>Find Music</div> 
                <div className='search-box'>
                  <input type="text" placeholder="请输入您要搜索的歌曲"/>
                  <button>搜索</button>
                </div>
            </div>
        );
    }
}

// SearchPage.propTypes = {
// };

export default SearchPage;