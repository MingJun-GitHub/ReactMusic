import React, { Component} from 'react';
import './loading.less';
import loadingimg from  '../../assest/images/loading_page.gif'
class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="Loading-Pape"></div>
        );
    }
}

export default Loading;