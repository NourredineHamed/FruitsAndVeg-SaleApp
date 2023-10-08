import React, { useState } from "react";
import "./order.css"
import Header from "./Header";
import Footer from "./Footer";

function OrderPage() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    telephone: "",
    address: "",
    address2: "",
    region: "",
    city: "",
    postalCode: "",
  });

  const regions = ["Region 1", "Region 2", "Region 3"]; // Replace with your own regions
  const cities = {
    "Region 1": ["City 1", "City 2", "City 3"],
    "Region 2": ["City 4", "City 5", "City 6"],
    "Region 3": ["City 7", "City 8", "City 9"],
  }; // Replace with your own cities

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic to submit form data to a server
  };

  return (<>
  <><Header/>
    <form onSubmit={handleSubmit} className="FORM">
        <h1> Finalisez Votre Commande</h1>
      <fieldset className="Orderfieldset">
<h2>Où voulez-vous que votre commande soit envoyées?</h2>
        <label>
          
          <input placeholder="Nom et prénom"
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          <input placeholder="Email"
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          
          <input placeholder="Telephone"
            type="tel"
            name="telephone"
            value={formValues.telephone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          
          <input placeholder="Address"
            type="text"
            name="address"
            value={formValues.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          
          <input placeholder="Address 2 (facultatif)"
            type="text"
            name="address2"
            value={formValues.address2}
            onChange={handleChange}
          />
        </label>
        <label>
        
          <select name="region" value={formValues.region} onChange={handleChange}>
            <option value="">-- Select a region --</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </label>
        {formValues.region && (
  <div className="city-postalcode-container">
    <label>
     
      <select name="city" value={formValues.city} onChange={handleChange}>
        <option value="">-- Select a city --</option>
        {cities[formValues.region].map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </label>
    <label>
     
      <input
        type="text"
        name="postalCode"
        value={formValues.postalCode}
        onChange={handleChange}
        placeholder="Postal Code"
        required
      />
    </label>
  </div>
)}
        <div className="order-summary">
        <span className="amount"><b>TOTAL:</b> $50.00</span>
        <button type="submit" className="commander-button"><b>Commander →</b></button>
      </div>
      </fieldset>
      
    </form>
    
    </><Footer/></>
  );
};
export default OrderPage; 
