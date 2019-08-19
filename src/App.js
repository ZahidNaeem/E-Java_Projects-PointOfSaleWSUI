import React, { Component } from 'react';
// import { Route, Switch, Redirect } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { toast } from 'react-toastify';
import Main from './components/main';
import Login from './components/login';
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
                <Route path="/item" component={Main} />
                <Route path="/party" component={Main} />
                <Route path="/dashboard" component={Main} />
                <Route path="/" component={Login} />
            </Switch>
        )
    }
}

export default App;