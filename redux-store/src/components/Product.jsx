import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import { addToWishlist } from "../store/slices/wishlistSlice";

const Product = ({ productId, title, rating, price, imageUrl }) => {
  const dispatch = useDispatch();
  return (
    <div className="product">
      <div className="product-image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="title-container">
        <h3>
          <a href="#">{title}</a>
        </h3>
      </div>
      <div className="price-rating-container">
        <p className="rating">{rating} ★ ★ ★ ★</p>
        <p className="price">Rs. {price}</p>
      </div>
      <div className="cta-container">
        <button
          onClick={() => {
            dispatch(addToCart({ productId, title, rating, price, imageUrl }));
          }}
        >
          Add to Cart
        </button>
        <button
          onClick={() => {
            dispatch(
              addToWishlist ({ productId, title, rating, price, imageUrl })
            );
          }}
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
};

Product.propTypes = {
  productId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default Product;
