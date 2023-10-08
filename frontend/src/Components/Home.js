import React from "react";
import "./Home.css";
import Header from "./Header";
import Footer from "./Footer";
function HomePage() {
  return (
    <div>
      <Header />

      <div className="contentcontainer">
          <div className="contenthome">
                <div className="texthome">
                  <h3>Welcome to My Shop</h3>
                  <p>Discover the best products here!</p>
                  <button className="shop_now_btn">Shop Now</button>
                </div>

                <div className="image-container">
                  <img className="imgs" src="images/home.jpg" />
                </div>
          </div>
      </div>

                <center>
                  <h2> Pourquoi nous choisir ?</h2>{" "}
                </center>

      <Footer />
    </div>
  );
}

export default HomePage;
