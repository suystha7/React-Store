import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "products",
  initialState: {
    loading: false,
    error: "",
    list: [],
  },
  reducers: {
    fetchProducts(state) {
      state.loading = true;
    },
    fetchProductsError(state, action) {
      state.loading = false;
      state.error = action.payload || "Something went wrong!";
    },
    loadAllProducts(state, action) {
      state.loading = false;
      state.list = action.payload;
      state.error = "";
    },
  },
});

export const getAllProducts = (state) => state.products.list;
export const getProductLoadingState = (state) => state.products.loading;
export const getProductErrorState = (state) => state.products.error;

export const { loadAllProducts, fetchProducts, fetchProductsError } =
  productSlice.actions;

export const productReducer = productSlice.reducer;
