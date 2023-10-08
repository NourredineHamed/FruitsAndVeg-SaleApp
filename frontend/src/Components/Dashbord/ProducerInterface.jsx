import React, { useState } from 'react';
import ProductManagement from './product/ProductManagment';
import UserManagment from './user/UserManagment';
import StockManagement from './stock/StockManagement';
import OrderManagement from './order/OrderManagment';
import SideNavBar from '../SideNavBar';
import './ProducerInterface.css';
import CategoryManagement from "./category/CategoryManagement"
const ProducerInterface = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const renderComponent = () => {
    switch (selectedCategory) {
      case 'products':
        return <ProductManagement/>;

      case 'user':
        return <UserManagment />;
      case 'categories':
        return <CategoryManagement />;
      case 'stock':
        return <StockManagement />;
      case 'orders':
        return <OrderManagement />;
        case 'stock':
            return 
            <StockManagement/>;
      default:
        return null;
    }
  };

  return (
    <div className="producer-interface-container">
      <div className="sidebar">
        <SideNavBar onCategoryClick={handleCategoryClick} />
      </div>
      <div className="content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default ProducerInterface;
