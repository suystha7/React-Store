import { createStore } from "redux";
import { myCreateStore } from "./my-redux";
const postCountElement = document.querySelector(".post-count");

const initialState = {
  post: 0,
  name: "Suyog",
  age: 22,
};

const INCREMENT = "post/increment";
const DECREMENT = "post/decrement";
const INCREASE_BY = "post/incrementBy";
const DECREASE_BY = "post/decrementBy";

function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, post: state.post + 1 };
    case DECREMENT:
      return { ...state, post: state.post - 1 };
    case INCREASE_BY:
      return { ...state, post: state.post + action.payload };
    case DECREASE_BY:
      return { ...state, post: state.post - action.payload };
    default:
      return state;
  }
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__?.());
const myStore = myCreateStore(reducer);

myStore.subscribe(() => {
  console.log(myStore.getState());
  postCountElement.innerText = myStore.getState().post;
});

const unsubscribe = myStore.subscribe(() => {
  console.log("hi");
});

const unsubscribe2 = myStore.subscribe(() => {
  console.log("hlo");
});


postCountElement.innerText = myStore.getState().post;

myStore.dispatch({ type: INCREMENT });
unsubscribe();
unsubscribe2();
myStore.dispatch({ type: DECREMENT });
myStore.dispatch({ type: INCREASE_BY, payload: 10 });
myStore.dispatch({ type: DECREASE_BY, payload: 5 });

postCountElement.addEventListener("click", () => {
  myStore.dispatch({ type: INCREMENT });
});

// const cartReducer = (state = [], action) => {
//   switch (action.type) {
//     case CART_ADD_ITEM: {
//       const existingItem = state.find(
//         (cartItem) => cartItem.productId === action.payload.productId
//       );

//       if (existingItem) {
//         return state.map((cartItem) =>
//           cartItem.productId === existingItem.productId
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//       }

//       return [...state, { ...action.payload, quantity: 1 }];
//     }

//     case CART_REMOVE_ITEM:
//       return state.filter(
//         (cartItem) => cartItem.productId !== action.payload.productId
//       );

//     case CART_ITEM_INCREASE_QTY:
//       return state.map((cartItem) => {
//         if (cartItem.productId === action.payload.productId) {
//           return { ...cartItem, quantity: cartItem.quantity + 1 };
//         }
//         return cartItem;
//       });

//       case CART_ITEM_DECREASE_QTY:
//         return state.map((cartItem) => {
//           if (cartItem.productId === action.payload.productId) {
//             return cartItem.quantity > 1
//               ? { ...cartItem, quantity: cartItem.quantity - 1 }
//               : cartItem; 
//           }
//           return cartItem;
//         });
      

//     default:
//       return state;
//   }
// };