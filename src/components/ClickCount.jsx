import React, { Component } from 'react';

class ClickCount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            index: 0
        }
        this.onClickButton = this.onClickButton.bind(this)
    }
    onClickButton() {
        const i = 10
        this.setState({
            count: this.state.count+i
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.onClickButton}>增加</button>
                <p>{this.state.count}</p>
                <p>{this.state.index}</p>
            </div>
        );
    }
}

export default ClickCount;