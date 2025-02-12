import { combineReducers, createStore } from "redux";
import productReducer from "./slices/productSlice";
import { cartReducer } from "./slices/cartSlice";
import { wishlistReducer } from "./slices/wishlistSlice";
// import { produce } from "immer";

const reducer = combineReducers({
  products: productReducer,
  cartItems: cartReducer,
  wishList: wishlistReducer,
});

export const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__?.()
);

// const users = [
//   {
//     name: "Suyog",
//     age: 22,
//   },
//   {
//     name: "Samyog",
//     age: 18,
//   },
// ];

// const newUser = users.map((user, i) => {
//   if (i === 1) {
//     return { ...user, age: 20 };
//   }
//   return user;
// });

// const newUser=  produce(users, (user)=>{
//   user[1].age = 20
// });

// console.log(newUser);
