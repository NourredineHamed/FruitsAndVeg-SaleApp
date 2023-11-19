import React, { useState } from "react";
import "./SideNavBar.css";

const SideNavBar = ({ onCategoryClick }) => {
  const [isExpanded, setExpandState] = useState(false);

  const menuItems = [
 
    {
      text: "Products",
      icon: "/icons/product.svg",
      category: "products",
    },
    {
      text: "Categories",
      icon: "icons/category.svg",
      category: "categories",
    },
    {
      text: "Users",
      icon: "icons/user.svg",
      category: "user",
    },
    {
      text: "Orders",
      icon: "icons/shopping-cart.svg",
      category: "orders",
    },
	{
		text: "Logout",
		icon: "icons/Logout.svg",
		category: "logout",
	},

  ];

  const handleCategoryClick = (category) => {
    onCategoryClick(category);
  };

  return (
    <div
      className={
        isExpanded
          ? "side-nav-container"
          : "side-nav-container side-nav-container-NX"
      }
    >
      <div className="nav-upper">
        <div className="nav-heading">
          {isExpanded && (
            <div className="nav-brand">
              <img src="/images/logo.png" alt="" srcSet="" />
            </div>
          )}
          <button id="hamb"
            className={
              isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
            }
            onClick={() => setExpandState(!isExpanded)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className="nav-menu">
          {menuItems.map(({ text, icon, category }) => (
            <a
              key={category}
              className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
              href="#"
              onClick={() => handleCategoryClick(category)}
            >
              <img className="menu-item-icon" src={icon} alt="" srcSet="" />
              {isExpanded && <p>{text}</p>}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
