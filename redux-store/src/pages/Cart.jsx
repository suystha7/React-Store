import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";

export default function Cart() {
  const cartItems = useSelector((state) => state.cartItems);
  return (
    <div className="cart-container">
      <h2>Items in Your Cart</h2>
      {cartItems.length > 0 ? (
        <div className="cart-items-container">
          <div className="cart-header cart-item-container">
            <div className="cart-item">Item</div>
            <div className="item-price">Price</div>
            <div className="quantity">Quantity</div>
            <div className="">Action</div>
            <div className="total">Total</div>
          </div>
          {cartItems.map(
            ({ productId, title, rating, price, imageUrl, quantity }) => (
              <CartItem
                key={productId}
                productId={productId}
                title={title}
                price={price}
                quantity={quantity}
                imageUrl={imageUrl}
                rating={rating}
              />
            )
          )}
          <div className="cart-header cart-item-container">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div className="total">
              Rs.{" "}
              {cartItems.reduce(
                (acc, currentItem) =>
                  acc + currentItem.quantity * currentItem.price,
                0
              )}
            </div>
          </div>
        </div>
      ) : (
        <p className="empty-message">Your cart is empty!</p>
      )}
    </div>
  );
}
