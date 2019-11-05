/* eslint-disable no-console */
import React, { Component } from 'react';
import { FormControl, Button } from 'react-bootstrap';
import { sendRecoveryEmail } from './util/APIUtils'

class ForgotPassword extends Component {
  state = {
    email: '',
    showError: false,
    messageFromServer: '',
    showNullError: false,
    showEmailNotFoundError: false,
    showOtherError: false
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    this.setState({
      [name]: value,
    });
  };

  sendEmail = async (e) => {
    e.preventDefault();
    const { email } = this.state;
    if (email === '') {
      this.setState({
        showError: false,
        messageFromServer: '',
        showNullError: true,
      });
    } else {
      try {
        const res = await sendRecoveryEmail(email);
        console.log(res.data);
        if (res.data === 'Recovery email sent') {
          this.setState({
            messageFromServer: 'Recovery email sent',
            showNullError: false,
            showEmailNotFoundError: false,
            showOtherError: false
          });
        }
        else if (res.data === 'Email not registered') {
          this.setState({
            messageFromServer: 'Email not registered',
            showNullError: false,
            showEmailNotFoundError: true,
            showOtherError: false
          });
          console.log("State", this.state);
        } else {
          this.setState({
            messageFromServer: res.data,
            showNullError: false,
            showEmailNotFoundError: false,
            showOtherError: true
          });
        }
      } catch (error) {
        console.error(error.response.data);
      }
    }
  };

  render() {
    console.log("Forgot Password");

    const windowsHeight = {
      height: window.innerHeight + "px"
    }

    const {
      email, messageFromServer, showNullError, showEmailNotFoundError, showOtherError
    } = this.state;

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
                          <h1 className="h4 text-gray-900 mb-4">Forgot Password</h1>
                        </div>
                        <form className="user"
                          onSubmit={this.sendEmail}>
                          <div className="form-group">
                            <FormControl
                              type="text"
                              // type="email"
                              className="form-control form-control-user"
                              name="email"
                              placeholder="Enter Registered Email..."
                              aria-label="Enter Registered Email..."
                              value={email}
                              onChange={this.handleChange}
                            />
                          </div>
                          <Button className="btn btn-primary btn-user btn-block"
                            type="submit">Reset Password
                                              </Button>
                        </form>
                        {showNullError && (
                          <div>
                            <p>Email address cannot be null.</p>
                          </div>
                        )}
                        {showEmailNotFoundError && (
                          <div>
                            <p>
                              That email address isn&apos;t recognized. Please try again or
                              register for a new account.
            </p>
                            <a
                              href="/register"
                            >Register</a>
                          </div>
                        )}
                        {showOtherError && (
                          <div>
                            <p>{messageFromServer}</p>
                          </div>
                        )}
                        {messageFromServer === 'recovery email sent' && (
                          <div>
                            <h3>Password Reset Email Successfully Sent!</h3>
                          </div>
                        )}
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

export default ForgotPassword;
