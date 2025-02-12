import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

export const fetchWishlistData = createAsyncThunk(
  "wishList/fetchWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://fakestoreapi.com/carts/4");

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlistData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlistData.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.products;
        state.error = "";
      })
      .addCase(fetchWishlistData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong!";
      });
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

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export const wishlistReducer = wishlistSlice.reducer;
