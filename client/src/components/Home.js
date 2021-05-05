import React, { useEffect, useState } from "react";
import homePic from "../images/home.svg";
const Home = () => {
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);
  const userHomePage = async () => {
    try {
      const res = await fetch("/contactData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userHomePage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="text-center">
      <img src={homePic} className="img-fluid" alt="Home page" />
      <div className="home-div">
        <p className="pt-5 homeP">WELCOME</p>
        <h1>{userName}</h1>
        <h2>{show ? "Happy, to see you back" : "We Are The Developer"}</h2>
      </div>
    </div>
  );
};

export default Home;
