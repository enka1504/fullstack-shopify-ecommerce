import styled from "styled-components";

const Container = styled.div`
  height: 50px;
  background-color: black;
  width: 100%;
  color: white;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  animation: rightToLest 50s linear infinite;
  font-size: 18px;
  font-weight: 600;
  color: white;
  @keyframes rightToLest {
    0% {
      transform: translateX(100%);
    }
    100% {
      transform: translateX(-100%);
    }
  }
`;

const Annoucement = () => {
  return (
    <Container>
      <Title>Super Deal! Free Shipping on Orders Over $50</Title>
    </Container>
  );
};

export default Annoucement;
