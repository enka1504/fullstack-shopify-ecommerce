import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Info = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 33333333;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 50%;
  position: absolute;
  z-index: -1;
  opacity: 0.7;
  top: calc(50% - 100px);
  left: calc(50% - 100px);
`;
const Container = styled.div`
  border-radius: 18px;
  background: #f3f0ea;
  padding: 16px;
  transition: 0.25s;
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
  &:hover ${Circle} {
    z-index: 7;
  }
  &:hover {
    transform: translateY(-3px);
  }
  @media (max-width: 768px) {
    width: 45%;
  }
  @media (max-width: 480px) {
    width: 100%;
  }
  @media (max-width: 320px) {
    width: 300px;
  }
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;
const Product = ({ item }) => {
  return (
    <Container key={item._id}>
      <Circle />
      <div className="tagRow">
        {item.tag ? (
          <div className="tag">
            <span className="tagDot"></span>
            {item.tag}
          </div>
        ) : (
          <div className="tagEmpty"></div>
        )}
      </div>

      {/* Image */}
      <div className="productImgBox">
        <img className="productImg" src={item.img} alt={item.title} />
      </div>

      {/* Info */}
      <div className="productInfo">
        <h3 className="productTitle">{item.title}</h3>
        <p className="productDesc">{item.desc}</p>

        <div className="priceRow">
          <div className="priceText">
            <span className="price">{item.price}</span>{" "}
            {item.color ? (
              <span className="per">
                / {item.color[0]}/ {item.size[0]}
              </span>
            ) : (
              <span>/ Shirt</span>
            )}
          </div>
          {/* 
          <Link to={`/product/${item._id}`}>
            <button className="viewBtn">View product</button>
          </Link> */}
        </div>
      </div>

      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
