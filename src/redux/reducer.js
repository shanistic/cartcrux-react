import { createReducer } from "@reduxjs/toolkit";

const addToCart = "addToCart";
const decrement = "decrement";
const deleteFromCart = "deleteFromCart";
const calculatedPrice = "calculatedPrice";

export const cartReducer = createReducer(
  {
    cartItems: [],
    subTotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
  },
  (builder) => {
    builder.addCase(addToCart, (state, action) => {
      const item = action.payload;
      const itemExists = state.cartItems.find((i) => i.id === item.id);

      if (itemExists) {
        state.cartItems.forEach((i) => {
          if (i.id === item.id) i.quantity += 1;
        });
      } else {
        state.cartItems.push(item);
      }
    });

    builder.addCase(decrement, (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item.quantity > 1) {
        state.cartItems.forEach((i) => {
          if (i.id === item.id) i.quantity -= 1;
        });
      }
    });

    builder.addCase(deleteFromCart, (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    });
    builder.addCase(calculatedPrice, (state) => {
      let sum = 0;
      state.cartItems.forEach((item) => {
        sum += item.price * item.quantity;
      });

      state.subTotal = sum.toFixed(2);

      state.shipping = state.subTotal > 1000 ? 0 : 200;

      state.tax = (state.subTotal * 0.18).toFixed(2);
      state.total = (
        parseFloat(state.subTotal) +
        state.shipping +
        parseFloat(state.tax)
      ).toFixed(2);
    });
  }
);
