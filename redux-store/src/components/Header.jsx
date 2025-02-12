import { Link } from "react-router-dom";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";

const Header = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const wishListItems = useSelector((state) => state.wishList);
  const [isExpanded, setIsExpanded] = useState(false);

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
            <div className="cart-items-count">
              {wishListItems.length}
              {/* {cartItems.reduce((acc, current) => {
              return acc + current.quantity;
            }, 0)} */}
            </div>
          </Link>
          <Link className="cart-icon" to="/cart">
            <ShoppingCart />
            <div className="cart-items-count">
              {cartItems.length}
              {/* {cartItems.reduce((acc, current) => {
              return acc + current.quantity;
            }, 0)} */}
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
