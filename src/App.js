import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import Main from './components/main';
import Login from './components/login';
class App extends Component {

    render() {
        return (
            <Switch>
                <Route path="/index" component={Main} />
                <Route path="/" component={Login} />
            </Switch>
        )
    }
}

export default App;