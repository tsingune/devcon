import React, { useEffect, useState } from "react";
const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const userContactPage = async () => {
    try {
      const res = await fetch("/contactData", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data);
      setUserData({
        ...userData,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
      });

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userContactPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //storing data
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  //send data to backend
  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;
    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });
    const data = await res.json();
    if (!data) {
      console.log("message not send");
    } else {
      window.alert("message sent");
      setUserData({ ...userData, message: "" });
    }
  };
  return (
    <>
      <div className="contact_info">
        <div className="container-fluid mt-3">
          <div className="row">
            <div className="col-lg-10 offset-lg-1 d-flex justify-content-between">
              {/* phone no */}
              <div className="contact_info_item shadow d-flex justify-content-start align-items-center">
                <img
                  src="https://img.icons8.com/office/40/000000/iphone.png"
                  alt="phone"
                />
                <div className="contact_info_content">
                  <div className="contact_info_title">Phone</div>
                  <div className="contact_info_text">{userData.phone}</div>
                </div>
              </div>
              {/* email */}
              <div className="contact_info_item shadow d-flex justify-content-start align-items-center">
                <img src="https://img.icons8.com/ultraviolet/40/000000/email-open--v2.png" />
                <div className="contact_info_content">
                  <div className="contact_info_title">Email</div>
                  <div className="contact_info_text">{userData.email}</div>
                </div>
              </div>
              {/* address */}
              <div className="contact_info_item shadow d-flex justify-content-start align-items-center">
                <img src="https://img.icons8.com/ultraviolet/40/000000/address.png" />
                <div className="contact_info_content">
                  <div className="contact_info_title">Address</div>
                  <div className="contact_info_text">Indore</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* contact us form */}

      <div className="contact_form">
        <div className="container shadow mt-5">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="contact_form_container py-5">
                <div className="contact_from_title">GET IN TOUCH</div>
                <form method="POST" id="contact_form">
                  <div className="contact_from_name d-flex justify-content-between align-items-between">
                    <input
                      type="text"
                      id="contact_from_name"
                      className="contact_form_name input_field"
                      name="name"
                      value={userData.name}
                      onChange={handleInputs}
                      placeholder="Your Name"
                      required="true"
                    />

                    <input
                      type="email"
                      id="contact_from_name"
                      className="contact_form_email input_field"
                      name="email"
                      value={userData.email}
                      onChange={handleInputs}
                      placeholder="Your Email"
                      required="true"
                    />

                    <input
                      type="number"
                      id="contact_from_phone"
                      className="contact_form_phone input_field"
                      name="phone"
                      value={userData.phone}
                      onChange={handleInputs}
                      placeholder="Your phone no"
                      required="true"
                    />
                  </div>

                  {/* message */}
                  <div className="contact_form_text mt-4">
                    <textarea
                      className="text_field contact_form_message"
                      name="message"
                      value={userData.message}
                      onChange={handleInputs}
                      placeholder="Message"
                      cols="30"
                      rows="10"
                    ></textarea>
                  </div>
                  {/* submit */}
                  <div className="contact_form_button">
                    <button
                      type="submit"
                      className="button contact_submit_button"
                      onClick={contactForm}
                    >
                      {" "}
                      Send message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
