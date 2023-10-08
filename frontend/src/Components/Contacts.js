import React from 'react'
import { FiMail, FiPhone } from 'react-icons/fi';
import { GrLocation } from 'react-icons/gr';
import { GrFacebook } from 'react-icons/gr';
import { RiInstagramFill } from 'react-icons/ri';
import"./Contacts.css";
import Mymap from './Mymap';
import Header from './Header';
import Footer from './Footer';

export default function Contacts() {
  return (
    <><Header/>
    <div className="contacts-wrapper">
      <div className="contact-section contact">
        <ul>
          <h3>CONTACTEZ-NOUS</h3>
          <li><FiMail /> info@example.com</li>
          <li><FiPhone /> 123-456-7890</li>
          <li><GrLocation /> 123 Main St, Anytown USA</li>
          <h3>SUIVEZ-NOUS</h3>
          <ul>
            <GrFacebook className="icon" /> 
            <RiInstagramFill className="iconig" />
          </ul>
        </ul>
      </div>
      <Mymap/>
    </div>
    <Footer/>
    </>
  )
}
