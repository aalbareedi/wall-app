import logo from "./logo.svg";
import "./normalize.css";
import "./App.css";
import React from "react";

class App extends React.Component {
  state = {
    isLoginWindowOpen: false,
    isSignUpWindowOpen: false,
    firstNameInput: "",
    lastNameInput: "",
    signUpEmailInput: "",
    signUpConfirmEmailInput: "",
    signUpPasswordInput: "",
    signUpErrors: [],
    signedInUser: null,
    loginEmailInput: "",
    loginPasswordInput: "",
    loginErrors: [],
    newPostMessage: "",
  };

  componentDidMount() {
    fetch("http://localhost:3000/api/login.php", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.user != null) {
          this.setState({ signedInUser: data.user });
        }
      });
  }

  dataToDivs(data) {
    let dataDivs = [];

    for (let i = 0; i < data.length; i++) {
      dataDivs.push(<div>{data[i]}</div>);
    }

    return dataDivs;
  }

  render() {
    return (
      <div>
        <nav>
          <img className="wallLogo" src="./wallLogo.svg" />
          <div className="logoText">Wall App</div>
          <div
            className={
              "navLoginBtn " +
              (this.state.signedInUser != null ? "hideElement" : "")
            }
            onClick={() => {
              this.setState({ isLoginWindowOpen: true });
            }}
          >
            <i className="far fa-user navLoginIcon"></i>
            <div className="navLoginText">Sign In</div>
          </div>
          <div
            className={
              "navLoginBtn " +
              (this.state.signedInUser != null ? "" : "hideElement")
            }
            onClick={() => {
              fetch("http://localhost:3000/api/login.php", {
                method: "DELETE",
                credentials: "include",
              }).then(() => {
                this.setState({ signedInUser: null });
              });
            }}
          >
            <i className="fas fa-user navLoginIcon"></i>
            <div className="navLoginText">Sign Out</div>
          </div>
        </nav>

        <div
          className={
            "currentUser " +
            (this.state.signedInUser != null ? "" : "hideElement")
          }
        >
          Signed in as
          <span className="currentUserName">
            {this.state.signedInUser != null
              ? " " +
                this.state.signedInUser.firstName +
                " " +
                this.state.signedInUser.lastName
              : ""}
          </span>
        </div>

        <div className="wallFeed">
          <div className="newPost">
            <textarea
              className="newPostInput"
              onInput={(event) => {
                this.setState({ newPostMessage: event.target.value });
              }}
            ></textarea>
            <button
              className="postBtn"
              onClick={() => {
                fetch("http://localhost:3000/api/posts.php", {
                  method: "POST",
                  credentials: "include",
                  body: JSON.stringify({ message: this.state.newPostMessage }),
                })
                  .then((response) => {
                    return response.json();
                  })
                  .then((data) => {
                    // data.errors: the errors from creating a post

                    if (data.errors.length == 0) {
                      fetch("http://localhost:3000/api/posts.php", {
                        method: "GET",
                        credentials: "include",
                      })
                        .then((response) => {
                          return response.json();
                        })
                        .then(() => {});
                    }
                  });
              }}
            >
              Post
            </button>
          </div>
          <div className="wallPost">
            <div className="wallPostUser">
              <span className="wallPostUserName">Amer Albareedi</span> wrote...
            </div>
            <div className="wallPostMessage">
              This is an example message that is being posted on my Wall App.
            </div>
          </div>
          <div className="wallPost">
            <div className="wallPostUser">
              <span className="wallPostUserName">Jon Doe</span> wrote...
            </div>
            <div className="wallPostMessage">
              This is an example message that is being posted on my Wall App.
            </div>
          </div>
          <div className="wallPost">
            <div className="wallPostUser">
              <span className="wallPostUserName">Jon Doe</span> wrote...
            </div>
            <div className="wallPostMessage">
              This is an example message that is being posted on my Wall App.
            </div>
          </div>
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
            <input
              className="loginInput"
              placeholder="Email"
              onInput={(event) => {
                this.setState({ loginEmailInput: event.target.value });
              }}
              value={this.state.loginEmailInput}
            />
            <input
              className="loginInput"
              placeholder="Password"
              onInput={(event) => {
                this.setState({ loginPasswordInput: event.target.value });
              }}
              value={this.state.loginPasswordInput}
            />
            <div className="inputErrors">
              {this.dataToDivs(this.state.loginErrors)}
            </div>
            <button
              className="loginWindowBtns"
              id="loginAccountBtn"
              onClick={() => {
                fetch("http://localhost:3000/api/login.php", {
                  method: "PUT",
                  credentials: "include",
                  body: JSON.stringify({
                    email: this.state.loginEmailInput,
                    password: this.state.loginPasswordInput,
                  }),
                })
                  .then((response) => {
                    return response.json();
                  })
                  .then((data) => {
                    if (data.errors.length == 0) {
                      this.setState({ loginErrors: [] });
                      this.setState({ signedInUser: data.user });
                      this.setState({
                        isLoginWindowOpen: false,
                        isSignUpWindowOpen: false,
                      });
                      this.setState({
                        loginEmailInput: "",
                        loginPasswordInput: "",
                      });
                    } else {
                      this.setState({ loginErrors: data.errors });
                    }
                  });
              }}
            >
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
              <i className="fas fa-times"></i>
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
                className="nameInput"
                placeholder="First Name"
                onInput={(event) => {
                  this.setState({ firstNameInput: event.target.value });
                }}
                value={this.state.firstNameInput}
              />
              <input
                className="nameInput"
                placeholder="Last Name"
                onInput={(event) => {
                  this.setState({ lastNameInput: event.target.value });
                }}
                value={this.state.lastNameInput}
              />
            </div>

            <input
              className="signUpInput"
              placeholder="Email"
              onInput={(event) => {
                this.setState({ signUpEmailInput: event.target.value });
              }}
              value={this.state.signUpEmailInput}
            />
            <input
              className="signUpInput"
              placeholder="Re-enter Email"
              onInput={(event) => {
                this.setState({ signUpConfirmEmailInput: event.target.value });
              }}
              value={this.state.signUpConfirmEmailInput}
            />
            <input
              className="signUpInput"
              placeholder="Password"
              onInput={(event) => {
                this.setState({ signUpPasswordInput: event.target.value });
              }}
              value={this.state.signUpPasswordInput}
            />

            <div className="inputErrors">
              {this.dataToDivs(this.state.signUpErrors)}
            </div>

            <button
              className="loginWindowBtns"
              id="signUpBtn"
              onClick={() => {
                console.log(this.state);

                if (
                  this.state.signUpEmailInput !=
                  this.state.signUpConfirmEmailInput
                ) {
                  this.setState({ signUpErrors: ["Emails do not match."] });
                } else {
                  fetch("http://localhost:3000/api/signup.php", {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({
                      firstName: this.state.firstNameInput,
                      lastName: this.state.lastNameInput,
                      email: this.state.signUpEmailInput,
                      password: this.state.signUpPasswordInput,
                    }),
                  })
                    .then((response) => {
                      return response.json();
                    })
                    .then((data) => {
                      if (data.errors.length != 0) {
                        this.setState({ signUpErrors: data.errors });
                      } else {
                        this.setState({ signedInUser: data.user });
                        this.setState({ signUpErrors: [] });
                        this.setState({
                          isLoginWindowOpen: false,
                          isSignUpWindowOpen: false,
                        });
                        this.setState({
                          firstNameInput: "",
                          lastNameInput: "",
                          signUpEmailInput: "",
                          signUpConfirmEmailInput: "",
                          signUpPasswordInput: "",
                        });
                        // console.log(data.user);
                      }
                    });
                }
              }}
            >
              Sign Up
            </button>
            <button
              className="closeSignUpWindowBtn"
              onClick={() => {
                this.setState({ isSignUpWindowOpen: false });
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
