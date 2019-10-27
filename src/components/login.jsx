import React, { Component } from 'react';
import { FormControl, Button } from 'react-bootstrap';

class Login extends Component {
    state = {
        loginRequest: {
            usernameOrEmail: '',
            password: ''
        },
        loginDisabled: true
    }

    handleChanges = (event) => {
        const { name, value } = event.target;
        let { loginRequest, loginDisabled } = this.state;
        loginRequest[name] = value;

        if (loginRequest.usernameOrEmail.length > 3 && loginRequest.password.length > 3) {
            loginDisabled = false;
        } else {
            loginDisabled = true;
        }
        this.setState({ loginRequest, loginDisabled });
    }

    handleLogin = (e) => {
        e.preventDefault();
        this.props.handleLogin(this.state.loginRequest);
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
                                                            // type="email"
                                                            className="form-control form-control-user"
                                                            name="usernameOrEmail"
                                                            placeholder="Enter Username/Email..."
                                                            aria-label="Enter Username/Email..."
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
                                                                id="customCheck"
                                                            />
                                                            <label className="custom-control-label"
                                                                htmlFor="customCheck">Remember Me</label>
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