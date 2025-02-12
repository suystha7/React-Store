import { createSelector, createSlice } from "@reduxjs/toolkit";

const findItemIndex = (state, action) =>
  state.findIndex(
    (wishlistItem) => wishlistItem.productId === action.payload.productId
  );

const wishlistSlice = createSlice({
  name: "wishList",
  initialState: {
    loading: false,
    error: "",
    list: [],
  },
  reducers: {
    fetchWishlist(state) {
      state.loading = true;
    },
    fetchWishlistError(state, action) {
      state.loading = false;
      state.error = action.payload || "Something went wrong!";
    },
    loadAllWishlist(state, action) {
      state.loading = false;
      state.list = action.payload.products;
    },
    addToWishlist: (state, action) => {
      findItemIndex(state.list, action) === -1 &&
        state.list.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      const existingItemIndex = findItemIndex(state.list, action);
      existingItemIndex !== -1 && state.list.splice(existingItemIndex, 1);
    },
  },
});

const getWishlist = ({ products, wishList }) => {
  return wishList.list
    .map(({ productId }) => {
      const wishlistProduct = products.list.find(
        (product) => product.id === productId
      );
      return wishlistProduct ? { ...wishlistProduct } : null;
    })
    .filter(Boolean);
};

export const getAllWishlist = createSelector([getWishlist], (wishList) => [
  ...wishList,
]);

export const getWishlistLoadingState = (state) => state.wishList.loading;
export const getWishlistErrorState = (state) => state.wishList.error;

export const {
  addToWishlist,
  removeFromWishlist,
  loadAllWishlist,
  fetchWishlist,
  fetchWishlistError,
} = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;
