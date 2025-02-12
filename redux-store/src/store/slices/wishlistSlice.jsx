import { produce } from "immer";

// action types
export const WISHLIST_ADD_ITEM = "wishList/addItem";
export const WISHLIST_REMOVE_ITEM = "wishList/removeItem";

// action creater
const addToWishlist = (productData) => {
  return {
    type: WISHLIST_ADD_ITEM,
    payload: productData,
  };
};

const removeFromWishlist = (productId) => {
  return {
    type: WISHLIST_REMOVE_ITEM,
    payload: { productId },
  };
};

// reducer
const wishlistReducer = (originlState = [], action) => {
  return produce(originlState, (state) => {
    const existingItemIndex = state.findIndex(
      (wishlistItem) => wishlistItem.productId === action.payload.productId
    );

    switch (action.type) {
      case WISHLIST_ADD_ITEM: {
        if (existingItemIndex !== -1) {
          state.push(action.payload);
        }
        break;
      }

      case WISHLIST_REMOVE_ITEM:
        state.splice(existingItemIndex, 1);
        break;
    }
    return state;
  });
};

export { wishlistReducer, addToWishlist, removeFromWishlist };
