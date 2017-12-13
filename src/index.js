/*
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
*/
import React, { Component } from 'react'
import './assest/style/common.less'
import ReactDOM from 'react-dom'
// const asyncCom = () => import('../components/async.vue')
import Index from './components/search'
import Play from './components/play'
import Playlist from './components/playlist'
import MV from './components/mv'
import Loading from './components/loading/loading'
import { HashRouter as Router, Route } from 'react-router-dom'
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

// 包装/合成
const FadingRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        <div>
            <Component {...props} />
        </div>
    )} />
)
ReactDOM.render((
    <Router>
        <App>
            <Route exact path="/" component={Index} />
            <Route path="/inbox/:id" component={Inbox} />
            <Route path="/play/:id" component={Play} />
            <Route path="/search" component={Index} />
            <Route path="/playlist/:id" component={Playlist} />
            <Route path="/mv/:id" component={MV} />
            <Route path='/loading' component={Loading}/>
            <FadingRoute path="/cool/:id" component={Play} />
        </App>
    </Router>
), document.getElementById('root'))
