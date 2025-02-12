import { Link } from "react-router-dom";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchProductsData } from "../store/slices/productSlice";
import {
  fetchCartItemsData,
} from "../store/slices/cartSlice";
import { fetchWishlistData } from "../store/slices/wishlistSlice";

const Header = () => {
  const cartItems = useSelector((state) => state.cartItems.list);
  const wishListItems = useSelector((state) => state.wishList.list);
  const [isExpanded, setIsExpanded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsData());
    dispatch(fetchCartItemsData());
    dispatch(fetchWishlistData());
  }, [dispatch]);

  return (
    <header>
      <div className="header-contents">
        <h1>
          <Link to="/">Redux Store</Link>
        </h1>
        <div className="header-right">
          <div className={`search-container ${isExpanded ? "expanded" : ""}`}>
            <input
              type="text"
              id="searchInput"
              className={isExpanded ? "show" : ""}
              placeholder="Search..."
            />
            <button id="searchIcon" onClick={() => setIsExpanded(!isExpanded)}>
              <Search />
            </button>
          </div>
          <Link className="cart-icon" to="/wishlist">
            <Heart />
            <div className="cart-items-count">{wishListItems.length}</div>
          </Link>
          <Link className="cart-icon" to="/cart">
            <ShoppingCart />
            <div className="cart-items-count">{cartItems.length}</div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
