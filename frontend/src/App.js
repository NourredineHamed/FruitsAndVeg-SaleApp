import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';

import { Route, BrowserRouter, Routes } from 'react-router-dom';


import Header from './Components/Header';
import Footer from './Components/Footer';
import OrderPage from './Components/OrderPage';
import About from './Components/About';
import Contacts from './Components/Contacts';
import Mymap from './Components/Mymap';
import SideNavBar from './Components/SideNavBar';
import Products from './Components/Products';
import ShoppingCart from './Components/ShoppingCart';
import Home from './Components/Home';
import Product from './Components/test';
import ProducerInterface from './Components/Dashbord/ProducerInterface';
import Signup from './Components/Signup';
import LogIn from './Components/LogIn'
import "./App.css";
function App() {
  return (
    <div className="App">

<BrowserRouter>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/sidenavbar" element={<SideNavBar/>}/>
          <Route path="/productinterface" element ={<ProducerInterface/>} />
          <Route path="/order" element ={<OrderPage/>}/>
          <Route path="/Signup" element={<Signup/>}/>
          <Route path="/login" element={<LogIn/>}/>
        </Routes>
       
      </BrowserRouter>


    </div>

  );
}

export default App;
