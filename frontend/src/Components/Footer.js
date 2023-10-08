import React from 'react';
import { FiMail, FiPhone } from 'react-icons/fi';
import { GrLocation } from 'react-icons/gr';
import { GrFacebook } from 'react-icons/gr';
import { RiInstagramFill } from 'react-icons/ri';
import "./footer.css"
function Footer() {
  return (
    <footer>
      <div className='footerr'>
      <div className="logo-footer">
        <img src="/images/logo.png" alt="" />
      </div>
      <div className="footer-section contact">
        <h3 >Contact</h3>
        <ul>
          <li><FiMail /> info@example.com</li>
          <li><FiPhone /> 123-456-7890</li>
          <li><GrLocation /> 123 Main St, Anytown USA</li>
        </ul>
      </div>
      <div className="footer-section navigate">
        <h3>Navigate</h3>
        <ul>
          <li><a href="#">Acceuil</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact </a></li>
          <li><a href="#">Termes </a></li>

        </ul>
      </div>
      <div className="footer-section products">
        <h3>Produits</h3>
        <ul>
          <li><a href="#">Fruits</a></li>
          <li><a href="#">Légumes </a></li>
         
        </ul>
      </div>
      <div className="footer-section follow-us">
        <h3>Follow Us</h3>
        <ul>
          <GrFacebook className="icon" /> 
          <RiInstagramFill className="iconig" />
        </ul>
      </div>
      </div>
      <nav className='footer-nav'>
        <p> Copyright © <b> Bio 4 Seasons</b> 2023, All rights reserved</p>
      </nav>
    </footer>
    
  );
}

export default Footer;