import React, { Component } from 'react';
// import { Route, Switch, Redirect } from "react-router-dom";
import { AsyncStorage } from 'AsyncStorage';
import { Route, withRouter, Switch } from "react-router-dom";
import { toast } from 'react-toastify';
import Main from './components/main';
import Login from './components/login';
import { login, changePassword, getCurrentUser, isSuccessfullResponse, storeDataIntoAsyncStorage, removeDataFromAsyncStorage } from './components/util/APIUtils';
import { ACCESS_TOKEN } from './components/constant';
import { PrivateRoute } from './components/common/PrivateRoute';
import { async } from 'q';

class App extends Component {

    state = {
        currentUser: null,
        isAuthenticated: false,
        isLoading: false
    }

    loadCurrentUser = async () => {
        this.setState({
            isLoading: true
        });
        try {
            const res = await getCurrentUser();
            if (isSuccessfullResponse(res)) {
                this.setState({
                    currentUser: res.data,
                    isAuthenticated: true,
                    isLoading: false
                });
            }
        } catch (error) {
            this.setState({
                isLoading: false
            });
        }
    }

    handleLogin = async (loginRequest) => {
        const { usernameOrEmail, password } = loginRequest;
        if (usernameOrEmail.length > 0 && password.length > 0) {
            try {
                const res = await login(loginRequest);
                if (isSuccessfullResponse(res)) {
                    await storeDataIntoAsyncStorage(ACCESS_TOKEN, res.data.accessToken);
                    await this.loadCurrentUser();
                    this.props.history.push(this.props.location.pathname);
                    // this.context.router.push('/item');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    handleLogout = async (redirectTo = "/") => {
        await removeDataFromAsyncStorage(ACCESS_TOKEN);

        this.setState({
            currentUser: null,
            isAuthenticated: false
        });

        this.props.history.push(redirectTo);
    }

    handleChangePassword = async (changePasswordRequest) => {
        try {
            const res = await changePassword(changePasswordRequest);
            if (isSuccessfullResponse(res)) {
                if (res) {
                    toast.success("Password changed successfully.");
                }
            } else {
                console.log("Save item response code", res.status);
            }
        } catch (error) {
            console.log(error.response.data);
            toast.error(error.response.data.message);

        }
    }

    render() {
        toast.configure({
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });

        const privateRoute = () => {
            if (this.state.isAuthenticated) {
                return <Route exact path="(/|/item|/party|/po|/dashboard)"
                    render={(props) =>
                        <Main {...props}
                            handleLogout={this.handleLogout}
                            currentUser={this.state.currentUser}
                            handleChangePassword={this.handleChangePassword} />} />
            } else {
                return <Route path="/"
                    render={(props) =>
                        <Login {...props}
                            handleLogin={this.handleLogin} />} />
            }
        }

        return (
            <Switch>
                <privateRoute />
            </Switch>
        );


        // if (AsyncStorage.getItem(ACCESS_TOKEN)) {
        if (this.state.isAuthenticated) {
            return (
                <Switch>
                    {/* <Route exact path="/" render={(props) => <Main {...props} handleLogout={this.handleLogout} />} /> */}
                    <Route exact path="(/|/item|/party|/po|/dashboard)"
                        render={(props) =>
                            <Main {...props}
                                handleLogout={this.handleLogout}
                                currentUser={this.state.currentUser}
                                handleChangePassword={this.handleChangePassword} />} />
                    {/* <Route path="/party" render={(props) => <Main {...props} handleLogout={this.handleLogout} />} />
                    <Route path="/po" render={(props) => <Main {...props} handleLogout={this.handleLogout} />} />
                    <Route path="/dashboard" render={(props) => <Main {...props} handleLogout={this.handleLogout} />} /> */}
                </Switch>
            )
        } else {
            return (<Login handleLogin={this.handleLogin} />);
        }
        {/* <Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />}></Route>
        <PrivateRoute authenticated={this.state.isAuthenticated} path="(/|/item|/party|/po|/dashboard)" component={Main}
            {...props}
            handleLogout={this.handleLogout}
            currentUser={this.state.currentUser}
            handleChangePassword={this.handleChangePassword}></PrivateRoute> */}
    }
}

export default withRouter(App);