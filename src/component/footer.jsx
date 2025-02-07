import { height, width } from "@fortawesome/free-solid-svg-icons/fa0";
import React from "react";
import { FaFacebook, FaTwitter, FaGoogle } from "react-icons/fa";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const currentDate = new Date().toLocaleDateString();
  return (
    
    <div class="card-footer text-body-secondary">
    2 days ago
  </div>
    
  );
};

export default Footer;
