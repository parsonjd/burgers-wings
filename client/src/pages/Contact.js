import React from "react";

function Contact() {
  return (
    <div className="row flex-row">
      <section>
        <div className="flex row brown-text">
          <h2 className="center-align">Burger & Wings Ville</h2>
          <p className="center-align address">
            1212 Best Burger Road
            <br />
            Wingville, FL 56789 <br />
            Phone Number: 222-489-WING
            <br />
            Email Address: bestburger@gmail.com
          </p>
          <p className="center-align address">
            Hours of Operation: <br />
            Monday-Friday 11:00 AM - 10:00 PM <br />
            Saturday-Sunday 11:00 AM - 12:00 AM
          </p>
        </div>
      </section>
    </div>
  );
}

export default Contact;
