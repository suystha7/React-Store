import { useSelector } from "react-redux";
import WishListItem from "../components/WishListItem";

export default function Wishlist() {
  const wishListItems = useSelector((state) => state.wishList);

  return (
    <div className="cart-container">
      <h2>Items in Your Wishlist</h2>
      {wishListItems.length > 0 ? (
        <div className="cart-items-container">
          <div className="cart-header cart-item-container">
            <div className="cart-item">Item</div>
            <div className="item-price">Price</div>
            <div className="item-price">Action</div>
          </div>
          {wishListItems.map(({ productId, title, rating, price, imageUrl }) => (
            <WishListItem
              key={productId}
              productId={productId}
              title={title}
              price={price}
              imageUrl={imageUrl}
              rating={rating}
            />
          ))}
        </div>
      ) : (
        <p className="empty-message">Your wishlist is empty!</p>
      )}
    </div>
  );
}
