import React, { Component } from 'react';
// import { Route, Switch, Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import Main from './components/main';
import Login from './components/login';
import Item from './components/item';
import { toast } from 'react-toastify';
class App extends Component {

    render() {
        toast.configure({
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
            });
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