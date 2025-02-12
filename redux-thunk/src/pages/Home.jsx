import { useSelector } from "react-redux";
import Product from "../components/Product";
import Shimmer from "../components/Shimmer";
import {
  getAllProducts,
  getProductErrorState,
  getProductLoadingState,
} from "../store/slices/productSlice";

const Home = () => {
  const productList = useSelector(getAllProducts);
  const isLoading = useSelector(getProductLoadingState);
  const error = useSelector(getProductErrorState);

  return isLoading ? (
    <Shimmer count={productList.length} />
  ) : error ? (
    <h2 style={{ textAlign: "center" }}>{error}</h2>
  ) : (
    <div className="products-container">
      {productList.map(({ id, title, rating, price, image }) => (
        <Product
          key={id}
          productId={id}
          title={title}
          rating={rating.rate}
          price={price}
          imageUrl={image}
        />
      ))}
    </div>
  );
};

export default Home;
