import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';


const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const [totalQuantity, setTotalQuantity] = useState(0);
  
  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + parseFloat(calculateTotalCost(item)), 0).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) onContinueShopping();
  };



  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
      }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = item.cost ? parseFloat(item.cost.replace('$', '').trim()) : 0;
  const quantity = Number(item.quantity); // Ensure quantity is a number
  return (cost * quantity).toFixed(2); // Multiply cost by quantity and format to 2 decimal places
};

const calculateItemSubtotal = (item) => {
    return (parseFloat(item.cost.replace('$', '').trim()) * item.quantity).toFixed(2);
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

// Update total quantity whenever the cart changes
    useEffect(() => {
    const newTotalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    setTotalQuantity(newTotalQuantity);
  }, [cart]);


  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateItemSubtotal(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Total Quantity */}
      <h3>Total Items in Cart: {totalQuantity}</h3>

      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


