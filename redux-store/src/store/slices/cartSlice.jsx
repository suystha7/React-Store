// action types
export const CART_ADD_ITEM = "cart/addItem";
export const CART_REMOVE_ITEM = "cart/removeItem";
export const CART_ITEM_INCREASE_QTY = "cart/increaseItemQTY";
export const CART_ITEM_DECREASE_QTY = "cart/decreaseItemQTY";
import { produce } from "immer";

// action creaters
const addToCart = (productData) => {
  return {
    type: CART_ADD_ITEM,
    payload: productData,
  };
};

const removeFromCart = (productId) => {
  return {
    type: CART_REMOVE_ITEM,
    payload: { productId },
  };
};

const decreaseCartItemQty = (productId) => {
  return {
    type: CART_ITEM_DECREASE_QTY,
    payload: { productId },
  };
};

const increaseCartItemQty = (productId) => {
  return {
    type: CART_ITEM_INCREASE_QTY,
    payload: { productId },
  };
};

// reducer
const cartReducer = (originalState = [], action) => {
  return produce(originalState, (state) => {
    const existingItemIndex = state.findIndex(
      (cartItem) => cartItem.productId === action.payload.productId
    );

    switch (action.type) {
      case CART_ADD_ITEM: {
        if (existingItemIndex === -1) {
          state.push({ ...action.payload, quantity: 1 }); 
        } else {
          state[existingItemIndex].quantity += 1; 
        }
        break;
      }

      case CART_REMOVE_ITEM:
        state.splice(existingItemIndex, 1);
        break;

      case CART_ITEM_INCREASE_QTY:
        state[existingItemIndex].quantity += 1;
        break;

      case CART_ITEM_DECREASE_QTY:
        state[existingItemIndex].quantity -= 1;
        if (state[existingItemIndex].quantity === 0) {
          state.splice(existingItemIndex, 1);
        }
    }
    return state;
  });
};

export {
  cartReducer,
  addToCart,
  removeFromCart,
  increaseCartItemQty,
  decreaseCartItemQty,
};
