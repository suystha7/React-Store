import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

export const fetchCartItemsData = createAsyncThunk(
  "cart/fetchCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/carts/5");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItemsData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCartItemsData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.products;
        state.error = "";
      })
      .addCase(fetchCartItemsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong!";
      });
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
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
