import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ItemDetails() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from your API when the component mounts
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await axios.get('/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Car Inventory</h1>
      <div className="row">
        {items.map(item => (
          <div key={item.item_id} className="col">
            <div className="item">
              <h2>Item ID: {item.item_id}</h2>
              <p>Stock Count: {item.stock_count}</p>
              <p>Purchase Order IDs: {item.purchase_order_ids}</p>
              <p>Sales Order IDs: {item.sales_order_ids}</p>
              <p>Total Purchase Value: {item.total_purchase_value}</p>
              <p>Total Sales Value: {item.total_sales_value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemDetails;
