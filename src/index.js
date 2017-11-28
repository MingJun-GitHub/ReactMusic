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
import { HashRouter as Router, Route, Link} from 'react-router-dom'
class App extends Component {
    render() {
        return (
            <div>
                <h1>App</h1>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/inbox">Inbox</Link></li>
                    <li><Link to="/search">search</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

class Inbox extends Component {
    render() {
        return (
            <div>
                <h2>Inbox</h2>
            </div>
        )
    }
}
ReactDOM.render((
    <Router>
        <App>
            <Route exact path="/" component={Index} />
            <Route path="/inbox" component={Inbox} />
            <Route path="/search" component={Index} />
        </App>
    </Router>
), document.getElementById('root'))


// import React, { Component } from 'react'
// import {BrowserRouter as Router,Route, Link} from 'react-router-dom'
// import ReactDOM from 'react-dom'
// class App extends Component{
//   render() {
//     return (
//       <div>
//         <h1>App</h1>
//         <ul>
//             <Link to='about'>about</Link>
//         </ul>
//         {this.props.children}
//       </div>
//     )
//   }
// }
// class About extends Component{
//   render() {
//     return <h3>About</h3>
//   }
// }
// class Inbox extends Component{
//   render() {
//     return (
//       <div>
//         <h2>Inbox</h2>
//         {this.props.children || "Welcome to your Inbox"}
//       </div>
//     )
//   }
// }
// class Message extends Component{
//   render() {
//     return <h3>Message {this.props.params.id}</h3>
//   }
// }
// ReactDOM.render((
//   <Router>
//     <Route path="/" component={App}>
//       <Route path="about" component={About} />
//       <Route path="inbox" component={Inbox}>
//         <Route path="messages/:id" component={Message} />
//       </Route>
//     </Route>
//   </Router>
// ), document.getElementById('root'))

