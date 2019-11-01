import React, { Component } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { storeDataIntoLocalStorage, retrieveDataFromLocalStorage, removeDataFromLocalStorage } from './util/APIUtils';
import { USERNAME_OR_EMAIL, PASSWORD, REMEMBER_ME } from './constant'

class Login extends Component {
    constructor(props) {
        super(props);
        this.usernameOrEmailInput = React.createRef();
    }

    state = {
        loginRequest: {
            usernameOrEmail: '',
            password: ''
        },
        loginDisabled: true,
        rememberMe: false
    }

    componentDidMount() {
        console.log("Current Object", this.usernameOrEmailInput.current);

        this.focusUsernameOrEmailInput();
        const rememberMe = retrieveDataFromLocalStorage(REMEMBER_ME);
        console.log("Remember Me", rememberMe);
        if (rememberMe) {
            const usernameOrEmail = retrieveDataFromLocalStorage(USERNAME_OR_EMAIL);
            const password = retrieveDataFromLocalStorage(PASSWORD);

            const { loginRequest } = this.state;
            if (usernameOrEmail) {
                loginRequest[USERNAME_OR_EMAIL] = usernameOrEmail;
            }
            if (usernameOrEmail) {
                loginRequest[PASSWORD] = password;
            }
            console.log("Login request", loginRequest);

            this.setState({ loginRequest, rememberMe: true }, () => {
                this.loginButtonStatus();
            });
            console.log("State", this.state.loginRequest);
        } else {
            this.setState({ rememberMe: false });
        }
    }

    focusUsernameOrEmailInput = () => {
        this.usernameOrEmailInput.current.focus();
    }

    handleRememberMeChanges = (event) => {
        const rememberMe = event.target.checked;
        console.log("handleRememberMeChanges", rememberMe);
        this.setState({ rememberMe });
    }

    toggleRememberMe = () => {
        const { rememberMe } = this.state;
        if (rememberMe) {
            const { usernameOrEmail, password } = this.state.loginRequest;
            storeDataIntoLocalStorage(REMEMBER_ME, true);
            storeDataIntoLocalStorage(USERNAME_OR_EMAIL, usernameOrEmail);
            storeDataIntoLocalStorage(PASSWORD, password);
        } else {
            removeDataFromLocalStorage(USERNAME_OR_EMAIL);
            removeDataFromLocalStorage(PASSWORD);
            storeDataIntoLocalStorage(REMEMBER_ME, false);
        }
    }

    handleChanges = (event) => {
        const { name, value } = event.target;
        let { loginRequest } = this.state;
        loginRequest[name] = value;
        this.setState({ loginRequest }, () => {
            this.loginButtonStatus();
        });
    }


    handleLogin = async (e) => {
        e.preventDefault();
        await this.props.handleLogin(this.state.loginRequest);
        this.toggleRememberMe();
    }

    loginButtonStatus = () => {
        let { loginRequest, loginDisabled } = this.state;

        if (loginRequest.usernameOrEmail.length > 3 && loginRequest.password.length > 3) {
            loginDisabled = false;
        } else {
            loginDisabled = true;
        }
        this.setState({ loginDisabled });
    }

    render() {
        const windowsHeight = {
            height: window.innerHeight + "px"
        }
        return (<>
            <div className="bg-gradient-primary"
                style={windowsHeight}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-12 col-md-9">
                            <div className="card o-hidden border-0 shadow-lg my-5 col-md-6 offset-md-3">
                                <div className="card-body">
                                    {/* <!-- Nested Row within Card Body --> */}
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-4">Administration</h1>
                                                </div>
                                                <form className="user"
                                                    onSubmit={this.handleLogin}>
                                                    <div className="form-group">
                                                        <FormControl
                                                            type="text"
                                                            // type="email"
                                                            className="form-control form-control-user"
                                                            name="usernameOrEmail"
                                                            placeholder="Enter Username/Email..."
                                                            aria-label="Enter Username/Email..."
                                                            ref={this.usernameOrEmailInput}
                                                            value={this.state.loginRequest.usernameOrEmail || ''}
                                                            onChange={this.handleChanges}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <FormControl
                                                            type="password"
                                                            className="form-control form-control-user"
                                                            name="password"
                                                            placeholder="Password"
                                                            aria-label="Password"
                                                            value={this.state.loginRequest.password || ''}
                                                            onChange={this.handleChanges}
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="custom-control custom-checkbox small">
                                                            <input type="checkbox"
                                                                className="custom-control-input"
                                                                checked={this.state.rememberMe}
                                                                onChange={this.handleRememberMeChanges}
                                                                id="rememberMe"
                                                            />
                                                            <label className="custom-control-label"
                                                                htmlFor="rememberMe">Remember Me</label>
                                                        </div>
                                                    </div>
                                                    <Button className="btn btn-primary btn-user btn-block"
                                                        disabled={this.state.loginDisabled}
                                                        type="submit">Login
                                                    </Button>
                                                </form>
                                                <hr />
                                                <div className="text-center">
                                                    <a className="small"
                                                        href="forgot-password.html">Forgot Password?</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>);
    }
}

export default Login;