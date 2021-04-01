import logo from "./logo.svg";
import "./normalize.css";
import "./App.css";
import React from "react";

class App extends React.Component {
  state = {
    isLoginWindowOpen: false,
    isSignUpWindowOpen: false,
  };

  render() {
    return (
      <div>
        <nav>
          <img className="wallLogo" src="./wallLogo.svg" />
          <div className="logoText">Wall App</div>
          <div
            className="navLoginBtn"
            onClick={() => {
              this.setState({ isLoginWindowOpen: true });
            }}
          >
            <i className="far fa-user navLoginIcon"></i>
            <div className="navLoginText">Sign In</div>
          </div>
        </nav>

        <div className="wallFeed">
          <div className="newPost">
            <textarea className="newPostInput"></textarea>
            <div className="newPostBtns">
              <button className="newPostBtn" id="addBtn">
                + Photo
              </button>
              <button className="newPostBtn" id="postBtn">
                Post
              </button>
            </div>
          </div>
          <div className="wallPost"></div>
          <div className="wallPost"></div>
        </div>

        <div
          className={
            "loginOverlay " +
            (this.state.isLoginWindowOpen == true ||
            this.state.isSignUpWindowOpen == true
              ? ""
              : "hideElement")
          }
        >
          <div
            className={
              "loginWindow " +
              (this.state.isLoginWindowOpen == true ? "" : "hideElement")
            }
          >
            <input className="loginInput" placeholder="Email"></input>
            <input className="loginInput" placeholder="Password"></input>
            <button className="loginWindowBtns" id="loginAccountBtn">
              Login
            </button>
            <button
              className="loginWindowBtns"
              id="createAccountBtn"
              onClick={() => {
                this.setState({
                  isSignUpWindowOpen: true,
                  isLoginWindowOpen: false,
                });
              }}
            >
              Create Account
            </button>
            <button
              className="closeLoginWindowBtn"
              onClick={() => {
                this.setState({ isLoginWindowOpen: false });
              }}
            >
              X
            </button>
          </div>

          <div
            className={
              "signUpWindow " +
              (this.state.isSignUpWindowOpen == true ? "" : "hideElement")
            }
          >
            <div className="nameInputField">
              <input
                className="signUpNameInput"
                placeholder="First Name"
              ></input>
              <input
                className="signUpNameInput"
                placeholder="Last Name"
              ></input>
            </div>

            <input placeholder="Email"></input>
            <input placeholder="Re-enter Email"></input>
            <input placeholder="Password"></input>
            <button>Sign Up</button>
            <button
              className="closeSignUpWindowBtn"
              onClick={() => {
                this.setState({ isSignUpWindowOpen: false });
              }}
            >
              X
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
