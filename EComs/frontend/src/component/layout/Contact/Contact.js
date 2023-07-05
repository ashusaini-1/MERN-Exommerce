import React from "react";
import "./Contact.css";
import { Button } from "@chakra-ui/react";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:ashu@gmail.com">
        <Button>Contact: ashu@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
