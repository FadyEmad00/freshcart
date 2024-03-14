import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setTotalQuantity: (state, action) => {
      state.totalQuantity = action.payload;
    },
    addItem: (state, action) => {
      const newItem = action.payload;
      const exsitingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      console.log(exsitingItem);
      if (!exsitingItem) {
        state.totalQuantity++;
        state.cartItems.push(newItem);
      }
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { deleteItem, addItem, setCartItems, setTotalQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
