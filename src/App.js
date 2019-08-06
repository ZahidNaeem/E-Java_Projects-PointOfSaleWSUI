import React, { Component } from 'react';
// import { Route, Switch, Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Main from './components/main';
import Login from './components/login';
import Item from './components/item';
class App extends Component {

    render() {
        return (
            <Switch>
                <Route path="/index" component={Main} />
                <Route path="/item" component={Item} />
                <Route path="/" component={Login} />
            </Switch>
        )
    }
}

export default App;