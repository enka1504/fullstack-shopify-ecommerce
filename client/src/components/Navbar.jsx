import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useState, React, useRef } from "react";
import axios from "axios";
import { API_URL } from "../Utils/Constants";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  ${mobile({ marginLeft: "5px" })}
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "40px" })}
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "20px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${mobile({ flex: 3, justifyContent: "center" })}
`;

const MenuItems = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;
const Navbar = ({ key, setProducts, setKeywords }) => {
  const quantity = useSelector((state) => state.cart.quantity);

  const setKeyword = (value) => {
    axios
      .get(`${API_URL}/products?search=${value}`)
      .then((response) => {
        setProducts(response.data);
        setKeywords(value);
      })
      .catch((error) => {
        console.error("There was an error searching for products!", error);
      });
  };
  // console.log(cart);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input
              placeholder="Search"
              onKeyUp={(e) => setKeyword(e.target.value)}
            />
            <Search />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>Tony Billing</Logo>
        </Center>
        <Right>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <MenuItems>REGISTER</MenuItems>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <MenuItems>SIGN IN</MenuItems>
          </Link>
          <Link to="/cart">
            <MenuItems>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItems>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
