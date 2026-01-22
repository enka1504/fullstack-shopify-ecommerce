import { useEffect, useState } from "react";
import styled from "styled-components";
//import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";
import { API_URL } from "../Utils/Constants";
const Container = styled.div`
  display: flex;
  padding: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ category, filters, sort, products, state }) => {
  const [prdt, setPrdts] = useState([]);
  // const [filteredProducts, setFilteredProducts] = useState(products);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      console.log(state);
      try {
        const response = await axios.get(`${API_URL}/products`);
        setPrdts(response.data);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [state]);
  //  useEffect(() => {
  //   const getProducts = async () => {
  //     let searchUrl = category
  //       ? `${API_URL}/products?category=${category}`
  //       : `${API_URL}/products`;
  //     try {
  //       const response = await axios.get(searchUrl);
  //       setPrdts(response.data);
  //     } catch (error) {
  //       setError(error.message || "Something went wrong");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   getProducts();
  // }, [category]);

  // useEffect(() => {
  //   category &&
  //     setFilteredProducts(
  //       prdt.filter((item) =>
  //         Object.entries(filters).every(([key, value]) =>
  //           item[key].includes(value),
  //         ),
  //       ),
  //     );
  // }, [prdt, category, filters]);
  // useEffect(() => {
  //   if (sort === "newest") {
  //     setFilteredProducts((prev) =>
  //       [...prev].sort((a, b) => a.createdAt - b.createdAt),
  //     );
  //   } else if (sort === "asc") {
  //     setFilteredProducts((prev) => {
  //       return [...prev].sort((a, b) => a.price - b.price);
  //     });
  //   } else {
  //     setFilteredProducts((prev) => {
  //       return [...prev].sort((a, b) => b.price - a.price);
  //     });
  //   }
  // }, [sort]);
  return (
    // <Container>
    //   {loading && <p>Loading...</p>}
    //   {error && <p>{error}</p>}
    //   {state
    //     ? prdt.map((item) => <Product item={item} key={item._id} />)
    //     : products
    //         .slice(0, 8)
    //         .map((item) => <Product item={item} key={item._id} />)}
    // </Container>

    <div className="productSection">
      <div className="productGrid">
        {state
          ? prdt.map((item) => <Product item={item} key={item._id} />)
          : prdt
              .slice(0, 8)
              .map((item) => <Product item={item} key={item._id} />)}
      </div>
    </div>
  );
};

export default Products;
