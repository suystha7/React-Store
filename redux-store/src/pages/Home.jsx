import { useSelector } from "react-redux";
import Product from "../components/Product";

const Home = () => {
  const productList = useSelector((state) => state.products);
  return (
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
