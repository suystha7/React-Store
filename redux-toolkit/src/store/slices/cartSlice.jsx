import { createSelector, createSlice } from "@reduxjs/toolkit";

const findItemIndex = (state, action) => {
  return state.findIndex(
    (cartItem) => cartItem.productId === action.payload.productId
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loading: false,
    error: "",
    list: [],
  },
  reducers: {
    fetchCartItems(state) {
      state.loading = true;
    },
    fetchCartItemsError(state, action) {
      state.loading = false;
      state.error = action.payload || "Something went wrong!";
    },
    loadAllCartItems(state, action) {
      state.loading = false;
      state.list = action.payload.products;
    },
    addToCart(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      existingItemIndex !== -1
        ? (state.list[existingItemIndex].quantity += 1)
        : state.list.push({ ...action.payload, quantity: 1 });
    },
    removeFromCart(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      existingItemIndex !== -1 && state.list.splice(existingItemIndex, 1);
    },
    increaseCartItemQTY(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      existingItemIndex !== -1 && (state.list[existingItemIndex].quantity += 1);
    },
    decreaseCartItemQTY(state, action) {
      const existingItemIndex = findItemIndex(state.list, action);
      if (existingItemIndex !== -1) {
        state.list[existingItemIndex].quantity > 1
          ? (state.list[existingItemIndex].quantity -= 1)
          : state.list.splice(existingItemIndex, 1);
      }
    },
  },
});

const getCartItems = ({ products, cartItems }) => {
  return cartItems.list
    .map(({ productId, quantity }) => {
      const cartProduct = products.list.find(
        (product) => product.id === productId
      );
      return cartProduct ? { ...cartProduct, quantity } : null;
    })
    .filter(Boolean);
};

export const getAllCartItems = createSelector([getCartItems], (cartItems) => [
  ...cartItems,
]);

export const getCartLoadingState = (state) => state.cartItems.loading;
export const getCartErrorState = (state) => state.cartItems.error;

export const {
  addToCart,
  removeFromCart,
  decreaseCartItemQTY,
  increaseCartItemQTY,
  loadAllCartItems,
  fetchCartItems,
  fetchCartItemsError,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
