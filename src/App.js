import logo from "./logo.svg";
import "./normalize.css";
import "./App.css";
import "./mobile.css";
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
    wallPosts: [],
    isLoginPasswordVisible: false,
    isSignupPasswordVisible: false,
    backEndUrl: "http://localhost:3000",
  };

  componentDidMount() {
    fetch(this.state.backEndUrl + "/api/login.php", {
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

    this.readPosts();
  }

  dataToDivs(data) {
    let dataDivs = [];

    for (let i = 0; i < data.length; i++) {
      dataDivs.push(<div>{data[i]}</div>);
    }

    return dataDivs;
  }

  postsToDivs(data) {
    let postsDivs = [];

    for (let i = 0; i < data.length; i++) {
      postsDivs.unshift(
        <div className="wallPost">
          <div className="wallPostUser">
            <span className="wallPostUserName">
              {data[i].user.firstName + " " + data[i].user.lastName + " "}
            </span>
            wrote...
          </div>
          <div className="wallPostMessage">{data[i].message}</div>
          <button
            className={
              "deletePostBtn " +
              (this.state.signedInUser != null &&
              data[i].user.id == this.state.signedInUser.id
                ? ""
                : "hideElement")
            }
            onClick={() => {
              fetch(this.state.backEndUrl + "/api/posts.php", {
                method: "DELETE",
                credentials: "include",
                body: JSON.stringify({
                  id: data[i].id,
                }),
              }).then(() => {
                this.readPosts();
              });
            }}
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </div>
      );
    }

    return postsDivs;
  }

  readPosts() {
    fetch(this.state.backEndUrl + "/api/posts.php", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({ wallPosts: data.posts });
      });
  }

  resetForms() {
    this.setState({
      signUpErrors: [],
      firstNameInput: "",
      lastNameInput: "",
      signUpEmailInput: "",
      signUpConfirmEmailInput: "",
      signUpPasswordInput: "",
      loginErrors: [],
      loginEmailInput: "",
      loginPasswordInput: "",
      isLoginPasswordVisible: false,
      isSignupPasswordVisible: false,
    });
  }

  render() {
    return (
      <div>
        <nav>
          <img className="wallLogo" src="./wallLogo.svg" />
          <div className="logoText">Wall App</div>
          <button
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
          </button>
          <button
            className={
              "navLoginBtn " +
              (this.state.signedInUser != null ? "" : "hideElement")
            }
            onClick={() => {
              fetch(this.state.backEndUrl + "/api/login.php", {
                method: "DELETE",
                credentials: "include",
              }).then(() => {
                this.setState({ signedInUser: null });
              });
            }}
          >
            <i className="fas fa-user navLoginIcon"></i>
            <div className="navLoginText">Sign Out</div>
          </button>
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
              placeholder="What's on your mind?"
              onInput={(event) => {
                this.setState({ newPostMessage: event.target.value });
              }}
              value={this.state.newPostMessage}
            ></textarea>
            <button
              className="postBtn"
              onClick={() => {
                if (this.state.signedInUser != null) {
                  fetch(this.state.backEndUrl + "/api/posts.php", {
                    method: "POST",
                    credentials: "include",
                    body: JSON.stringify({
                      message: this.state.newPostMessage,
                    }),
                  })
                    .then((response) => {
                      return response.json();
                    })
                    .then((data) => {
                      this.readPosts();
                      this.setState({ newPostMessage: "" });
                    });
                } else {
                  this.setState({ isLoginWindowOpen: true });
                }
              }}
            >
              Post
            </button>
          </div>
          {this.postsToDivs(this.state.wallPosts)}
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
          <form
            className={
              "loginWindow " +
              (this.state.isLoginWindowOpen == true ? "" : "hideElement")
            }
            onSubmit={(event) => {
              event.preventDefault();

              fetch(this.state.backEndUrl + "/api/login.php", {
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
                    this.setState({
                      signedInUser: data.user,
                      isLoginWindowOpen: false,
                      isSignUpWindowOpen: false,
                    });
                    this.resetForms();
                  } else {
                    this.setState({ loginErrors: data.errors });
                  }
                });
            }}
          >
            <input
              className="loginInput"
              placeholder="Email"
              onInput={(event) => {
                this.setState({ loginEmailInput: event.target.value });
              }}
              value={this.state.loginEmailInput}
            />
            <div className="passwordIconField">
              <input
                className="loginInput"
                placeholder="Password"
                type={
                  this.state.isLoginPasswordVisible == true ? "" : "password"
                }
                onInput={(event) => {
                  this.setState({ loginPasswordInput: event.target.value });
                }}
                value={this.state.loginPasswordInput}
              />
              <i
                className={
                  "fas passwordIcon " +
                  (this.state.isLoginPasswordVisible == true
                    ? "fa-eye"
                    : "fa-eye-slash")
                }
                onClick={() => {
                  this.setState({
                    isLoginPasswordVisible: !this.state.isLoginPasswordVisible,
                  });
                }}
              ></i>
            </div>
            <div className="inputErrors">
              {this.dataToDivs(this.state.loginErrors)}
            </div>
            <button className="loginWindowBtns" id="loginAccountBtn">
              Login
            </button>
            <button
              className="loginWindowBtns"
              id="createAccountBtn"
              type="button"
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
              className="closeWindowBtn"
              type="button"
              onClick={() => {
                this.setState({ isLoginWindowOpen: false });
                this.resetForms();
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          </form>

          <form
            className={
              "signUpWindow " +
              (this.state.isSignUpWindowOpen == true ? "" : "hideElement")
            }
            onSubmit={(event) => {
              event.preventDefault();
              if (
                this.state.signUpEmailInput !=
                this.state.signUpConfirmEmailInput
              ) {
                this.setState({ signUpErrors: ["Emails do not match."] });
              } else {
                fetch(this.state.backEndUrl + "/api/signup.php", {
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
                      this.setState({
                        signedInUser: data.user,
                        isLoginWindowOpen: false,
                        isSignUpWindowOpen: false,
                      });
                      this.resetForms();
                    }
                  });
              }
            }}
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
            <div className="passwordIconField">
              <input
                className="signUpInput"
                placeholder="Password"
                type={
                  this.state.isSignupPasswordVisible == true ? "" : "password"
                }
                onInput={(event) => {
                  this.setState({ signUpPasswordInput: event.target.value });
                }}
                value={this.state.signUpPasswordInput}
              />
              <i
                className={
                  "fas passwordIcon " +
                  (this.state.isSignupPasswordVisible == true
                    ? "fa-eye"
                    : "fa-eye-slash")
                }
                onClick={() => {
                  this.setState({
                    isSignupPasswordVisible: !this.state
                      .isSignupPasswordVisible,
                  });
                }}
              ></i>
            </div>

            <div className="inputErrors">
              {this.dataToDivs(this.state.signUpErrors)}
            </div>

            <button className="loginWindowBtns" id="signUpBtn">
              Sign Up
            </button>
            <button
              className="closeWindowBtn"
              type="button"
              onClick={() => {
                this.setState({ isSignUpWindowOpen: false });
                this.resetForms();
              }}
            >
              <i className="fas fa-times"></i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
