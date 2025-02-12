import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import Shimmer from "../components/Shimmer";
import {
  getAllCartItems,
  getCartErrorState,
  getCartLoadingState,
} from "../store/slices/cartSlice";

export default function Cart() {
  const cartItems = useSelector(getAllCartItems);
  const isLoading = useSelector(getCartLoadingState);
  const error = useSelector(getCartErrorState);

  return isLoading ? (
    <Shimmer />
  ) : error ? (
    <h2 style={{ textAlign: "center" }}>{error}</h2>
  ) : (
    <div className="cart-container">
      <h2>Items in Your Cart</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="">Action</div>
          <div className="total">Total</div>
        </div>

        {cartItems.map(({ id, title, rating, price, image, quantity }) => (
          <CartItem
            key={id}
            productId={id}
            title={title}
            price={price}
            quantity={quantity}
            imageUrl={image}
            rating={rating.rate}
          />
        ))}

        <div className="cart-header cart-item-container">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          {!isLoading ||
            (error && (
              <div className="total">
                Rs.{" "}
                {Math.ceil(
                  cartItems.reduce(
                    (acc, currentItem) =>
                      acc + currentItem.quantity * currentItem.price,
                    0
                  )
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
