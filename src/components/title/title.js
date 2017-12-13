import React, { Component} from 'react';
import './title.less'
class Title extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className="Title_h3">
               {this.props.name}
            </div>
        );
    }
}
export default Title;