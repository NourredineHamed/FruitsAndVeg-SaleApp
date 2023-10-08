

import React from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import './Header.css';
import {Link} from 'react-router-dom';
function Header() {
    return (
      <nav className="navbar">
        <div className="navbar__logo">
        <img src="/images/logo.png" alt="" />   
        </div>
        <div className="navbar__links">
          <Link to ="/">Acceuil</Link>
          <Link to="/products">Produits</Link> 
          <Link to="/about">A propos</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="navbar__icons">
          <FaSearch />
          <FaShoppingCart />
        </div>
      </nav>
    );
  }
  export default Header;