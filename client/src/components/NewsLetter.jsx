import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
    height : 60vh;
    display : flex;
    align-items : center;
    justify-content : center;
    background-color : #fcf5f5;
     flex-direction : column;
`;
const Title = styled.h1`
   font-size : 30px;
  margin-bottom: 20px;
`;
const Description = styled.div`
   font-size : 24px;
   font-weight : 300;
   margin-bottom : 20px;
   ${mobile({ textAlign: "center", alignItems: "center",fontSize : "10px"})}
`;
const InputContainer = styled.div`
   width : 50%;
   height : 40px;
   background-color : white;
   display : flex;
   justify-content : space-between;
   border : 1px solid lightgray;
   ${mobile({ width: "60%"})}
`;
const Input = styled.input`
   border : none;
   flex : 8;
   margin-left : 20px;
`;
const Button = styled.button`
   flex : 1;
   border : none;
   background-color : teal;
   color : white;
`;

const NewsLetter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Description>Get Timely updates from your favourite products</Description>
      <InputContainer>
        <Input placeholder="Your email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default NewsLetter;
