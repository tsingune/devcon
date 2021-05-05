import React, { useState, useContext } from "react";
import loginPic from "../images/login.svg";
import { NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";
const Login = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch("/signIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = res.json();
    if (res.status === 400 || !data) {
      window.alert("Invalid Credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Login Successful");
      history.push("/");
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center my-5">
        <div className="row shadow my-2 mx-2 main">
          {/*left-column*/}
          <div className="col-md-4 col-12 mycol">
            {/*image*/}{" "}
            <img src={loginPic} width="100%" height="100%" alt="loginImg" />{" "}
          </div>
          {/*right-column*/}
          <div className="col-md-8 col-12 xcol">
            <h2 className="title pt-5 pb-3">Log In</h2>
            <form className="myform">
              <div className="row rtwo">
                <div className="form-group col-md-6 ffour py-3">
                  {" "}
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control lm"
                    placeholder="knwst@gmail.com"
                  />{" "}
                </div>
              </div>
              <div className="row rthree">
                <div className="form-group col-md-6 ffive py-3">
                  {" "}
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Password"
                  />{" "}
                </div>
              </div>

              <div className="row rfour">
                <div className="form-group col-md-6 fseven py-3">
                  {" "}
                  <button
                    type="submit"
                    className="btn btn-primary"
                    id="login"
                    onClick={loginUser}
                  >
                    <span>Log In</span>
                  </button>{" "}
                </div>
                <div className="form-group col-md-6 feight py-3">
                  <p className="text-muted">
                    Create An Account?
                    <br />
                    <NavLink to="/signup">Sign up</NavLink>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
