import { Trash } from "lucide-react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeFromWishlist } from "../store/slices/wishlistSlice";

const WishListItem = ({ productId, title, rating, price, imageUrl }) => {
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
      <div className="item-price">Rs. {price}</div>
      <div>
        <Trash onClick={() => dispatch(removeFromWishlist(productId))} />
      </div>
    </div>
  );
};

WishListItem.propTypes = {
  productId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default WishListItem;
