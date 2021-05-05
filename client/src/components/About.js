import React, { useEffect, useState } from "react";
import profilePic from "../images/profile.jpg";
import { useHistory } from "react-router-dom";
import aboutPic from "../images/profile2.jpg";
const About = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="container shadow p-3 mb-5 bg-white rounded mt-5 emp-profile">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img
                  src={
                    userData.name === "tushar singune" ? profilePic : aboutPic
                  }
                  alt="tushar"
                  width="220"
                  height="180"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className="profile-rating mt-3 mb-5 ">
                  Ranking:<span>1/10</span>
                </p>

                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-items">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="True"
                    >
                      About
                    </a>
                  </li>
                  <li className="nav-items">
                    <a
                      className="nav-link "
                      id="profile-tab"
                      data-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Timeline
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-2">
              <input
                type="submit"
                className="profile-edit-btn"
                name="btnAddMore"
                value="Edit Profile"
              />
            </div>
          </div>
          <div className="row">
            {/*left side url*/}
            <div className="col-md-4">
              <div className="profile-work">
                <p>Work Link</p>
                <a href="https://github.com/tsingune" target="null">
                  Github
                </a>
                <br />
                <a
                  href="https://www.instagram.com/tushar_singune/"
                  target="null"
                >
                  Instagram
                </a>
                <br />
                <a href="https://twitter.com/tusharsingune" target="null">
                  Twitter
                </a>
                <br />
                <a
                  href="https://www.linkedin.com/in/tushar-singune-581b86134/"
                  target="null"
                >
                  Linkdin
                </a>
                <br />
              </div>
            </div>
            {/*right side data toggle*/}
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="nav-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>User id</label>
                    </div>
                    <div className="col-md-6">
                      <p>9793879879379</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.name}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.email}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.phone}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Profession</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData.work}</p>
                    </div>
                  </div>
                </div>

                <div
                  className="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Experience</label>
                    </div>
                    <div className="col-md-6">
                      <p>Moderate</p>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Rate</label>
                    </div>
                    <div className="col-md-6">
                      <p>5$/hr</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Total Projects</label>
                    </div>
                    <div className="col-md-6">
                      <p>20</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>English Level</label>
                    </div>
                    <div className="col-md-6">
                      <p>Good</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label>Availabiltity</label>
                    </div>
                    <div className="col-md-6">
                      <p>3 months</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
