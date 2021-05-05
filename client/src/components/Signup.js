import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import signupPic from "../images/signup.svg";
const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });
  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Invalid Registration");
      console.log("Invalid Registration");
    } else {
      window.alert("Registration successful");
      console.log("Registration successful");

      history.push("/login");
    }
  };

  return (
    <div className="container d-flex justify-content-center my-5">
      <div className="row shadow my-2 mx-2 main">
        {/*left-column*/}
        <div className="col-md-4 col-12 mycol">
          {/*image*/}{" "}
          <img src={signupPic} width="100%" height="100%" alt="signup" />
        </div>
        {/*right-column*/}
        <div className="col-md-8 col-12 xcol">
          <h2 className="title pt-5 pb-3">Sign up</h2>
          <form className="myform">
            <div className="row rone">
              <div className="form-group col-md-6 fone py-3">
                {" "}
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="off"
                  value={user.name}
                  onChange={handleInputs}
                  className="form-control"
                  placeholder="Your Name"
                />{" "}
              </div>
              <div className="form-group col-md-6 ftwo py-3">
                {" "}
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="off"
                  value={user.email}
                  onChange={handleInputs}
                  className="form-control"
                  placeholder="example@mail.com"
                />{" "}
              </div>
            </div>
            <div className="row rtwo">
              <div className="form-group col-md-6 fthree py-3">
                {" "}
                <input
                  type="text"
                  id="Phone"
                  name="phone"
                  autoComplete="off"
                  value={user.phone}
                  onChange={handleInputs}
                  className="form-control jk"
                  placeholder="Phone"
                />{" "}
              </div>
              <div className="form-group col-md-6 ffour py-3">
                {" "}
                <input
                  type="text"
                  id="work"
                  name="work"
                  autoComplete="off"
                  value={user.work}
                  onChange={handleInputs}
                  className="form-control lm"
                  placeholder="Profession"
                />{" "}
              </div>
            </div>
            <div className="row rthree">
              <div className="form-group col-md-6 ffive py-3">
                {" "}
                <input
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="off"
                  value={user.password}
                  onChange={handleInputs}
                  className="form-control"
                  placeholder="Password"
                />{" "}
              </div>
              <div className="form-group col-md-6 fsix py-3">
                {" "}
                <input
                  type="password"
                  id="cpassword"
                  name="cpassword"
                  autoComplete="off"
                  value={user.cpassword}
                  onChange={handleInputs}
                  className="form-control"
                  placeholder="Confirm Password"
                />{" "}
              </div>
            </div>
            <div className="row rfour">
              <div className="form-group col-md-6 fseven py-3">
                {" "}
                <button
                  type="submit"
                  className="btn btn-primary"
                  id="signup"
                  onClick={PostData}
                >
                  <span>Create account</span>
                </button>{" "}
              </div>
              <div className="form-group col-md-6 feight py-3">
                <p className="text-muted">
                  Already have an account?
                  <br />
                  <NavLink to="/login">Sign in</NavLink>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
