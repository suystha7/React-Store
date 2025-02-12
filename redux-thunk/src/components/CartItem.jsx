import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Trash } from "lucide-react";
import {
  decreaseCartItemQTY,
  increaseCartItemQTY,
  removeFromCart,
} from "../store/slices/cartSlice";

const CartItem = ({ productId, title, rating, price, imageUrl, quantity }) => {
  const dispatch = useDispatch();
  return (
    <div className="cart-item-container">
      <div className="cart-item">
        <img src={imageUrl} alt={title} />
        <div>
          <h3>{title}</h3>
          <p>{rating} ★ ★ ★ ★</p>
        </div>
      </div>
      <div className="item-price">Rs. {Math.ceil(price)}</div>
      <div className="item-quantity">
        <button onClick={() => dispatch(decreaseCartItemQTY({ productId }))}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => dispatch(increaseCartItemQTY({ productId }))}>
          +
        </button>
      </div>
      <div>
        <Trash onClick={() => dispatch(removeFromCart({ productId }))} />
      </div>
      <div className="item-total">Rs. {Math.ceil(quantity * price)}</div>
    </div>
  );
};

CartItem.propTypes = {
  productId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  imageUrl: PropTypes.string.isRequired,
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default CartItem;
