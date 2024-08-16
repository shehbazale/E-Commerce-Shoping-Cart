import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, data) => {
      // state.cart.push(data.payload);
      const items = state.cart.find((item) => item.id === data.payload.id);
      if (items) {
        items.quantity++;
      } else {
        state.cart.push({ ...data.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, data) => {
      // state.cart.splice(data.payload, 1);
      const removeItem = state.cart.filter((item) => item.id !== data.payload);
      console.log("Item remove ho gia", removeItem);
      state.cart = removeItem;
    },
    incrementQuantity: (state, data) => {
      const item = state.cart.find((item) => item.id === data.payload);
      item.quantity++;
    },
    decrementQuantity: (state, data) => {
      const item = state.cart.find((item) => item.id === data.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
  },
});

export const {
  removeFromCart,
  addToCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;
// export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
