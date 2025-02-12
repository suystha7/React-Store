import { useSelector } from "react-redux";
import WishListItem from "../components/WishListItem";
import Shimmer from "../components/Shimmer";
import {
  getAllWishlist,
  getWishlistErrorState,
  getWishlistLoadingState,
} from "../store/slices/wishlistSlice";

export default function Wishlist() {
  const wishListItems = useSelector(getAllWishlist);
  const isLoading = useSelector(getWishlistLoadingState);
  const error = useSelector(getWishlistErrorState);

  return isLoading ? (
    <Shimmer />
  ) : error ? (
    <h2 style={{ textAlign: "center" }}>{error}</h2>
  ) : (
    <div className="cart-container">
      <h2>Items in Your Wishlist</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="item-price">Action</div>
        </div>
        {wishListItems.map(({ id, title, rating, price, image }) => (
          <WishListItem
            key={id}
            productId={id}
            title={title}
            price={price}
            imageUrl={image}
            rating={rating.rate}
          />
        ))}
      </div>
    </div>
  );
}
