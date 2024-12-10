import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
  };

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        
        const newItem = action.payload;
      const existingItem = state.items.find((item) => item.name === newItem.name);

      if (existingItem) {
        // If the plant already exists in the cart, increase its quantity
        existingItem.quantity += 1;
      } else {
        // Otherwise, add the plant to the cart with quantity 1
        state.items.push({ ...newItem, quantity: 1 });
      }

    },
    removeItem: (state, action) => {
        const itemName = action.payload;
      state.items = state.items.filter((item) => item.name !== itemName);
    },


    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
      const item = state.items.find((item) => item.name === name);

      if (item) {
        item.quantity = quantity;
      }
    
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
