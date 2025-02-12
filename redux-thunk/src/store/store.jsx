import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slices/productSlice";
import { wishlistReducer } from "./slices/wishlistSlice";
import { cartReducer } from "./slices/cartSlice";
// import { apiMiddleware } from "./middleware/api";
import { func } from "./middleware/func";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cartItems: cartReducer,
    wishList: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), func],
});
