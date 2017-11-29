/*
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
*/
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Index from './components/search'
import './assest/style/common.less'
import { HashRouter as Router, Route } from 'react-router-dom'
// console.log('routeConfig----', routeConfig)
class App extends Component {
    render() {
        return (
            <div className="main">
                {this.props.children}
            </div>
        )
    }
}

const Inbox = ({ match }) => (
    <div>
        <h3>ID: {match.params.id}</h3>
    </div>
)
ReactDOM.render((
    <Router>
        <App>
            <Route exact path="/" component={Index} />
            <Route path="/inbox/:id" component={Inbox} />
            <Route path="/search" component={Index} />
        </App>
    </Router>
), document.getElementById('root'))
