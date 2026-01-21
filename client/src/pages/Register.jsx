import "./register.css";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Publish } from "@material-ui/icons";
import { useState } from "react";
import app from "../firebase";
import { useDispatch } from "react-redux";
import { register } from "../redux/apicalls";
import { useHistory } from "react-router-dom";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background:
    linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
    url("file:///C:/Users/user/Downloads/1.png") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  background-color: white;
  padding: 20px;
  ${mobile({ width: "50%" })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 500;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%; /* Cant be smaller than 40 percent but can be bigger than this*/
  margin: ${(props) =>
    props.margin === "margin" ? "20px 10px 0px 0px;" : "20px 10px 0px 0px;"};
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 30px 0px;
`;
const Button = styled.button`
  padding: 10px 20px;
  float: right;
  right: 0;
  position: absolute;
  bottom: 2px;
  cursor: pointer;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 2px;
  &:disabled {
    cursor: not-allowed;
    color: red;
  }
  ${mobile({
    flexEnd: "right",
    width: "30%",
    height: "5%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "0px;",
    padding: "0px;",
  })}
`;

const FileUploadContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  padding: ${(props) => props.margin === "margin" && "0px 0px 0px 0px;"};
`;

const RadioButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 90px;
  flex-wrap: "wrap";
  width: 40%;
  ${mobile({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginLeft: "40px;",
  })}
`;

const Regsiter = () => {
  const [inputs, setInputs] = useState({});
  const [files, setFiles] = useState(null);
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    gender: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const handleChange = (event) => {
    setInputs((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
    validateInput(event);
  };
  const validateInput = (event) => {
    let { name, value } = event.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };
      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "Please enter Username";
          }
          break;
        case "email":
          if (!value) {
            stateObj[name] = "Please enter email";
          }
          break;
        case "fullName":
          if (!value) {
            stateObj[name] = "Please enter your  fullname";
          }
          break;
        case "password":
          if (!value) {
            stateObj[name] = "Please enter password.";
          } else if (
            inputs.confirmPassword &&
            value !== inputs.confirmPassword
          ) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = inputs.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;
        case "confirmPassword":
          if (!value) {
            stateObj[name] = "Please enter Confirm Password.";
          } else if (inputs.password && value !== inputs.password) {
            stateObj[name] = "Password and Confirm Password does not match.";
          }
          break;
        default:
          break;
      }
      return stateObj;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fileName = new Date().getTime() + files.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, files);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...

        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const user = {
            ...inputs,
            img: downloadURL,
          };
          register(dispatch, user);
          history.push("/login");
        });
      },
    );
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <FileUploadContainer>
            <Label htmlFor="file">
              <Publish
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              />
            </Label>
            <Input
              type="file"
              id="file"
              onChange={(event) => setFiles(event.target.files[0])}
            />
          </FileUploadContainer>
          <Input
            placeholder="fullName"
            name="fullName"
            type="text"
            onChange={handleChange}
            onBlur={validateInput}
          />
          {error.fullName && <span className="err">{error.fullName}</span>}
          <Input
            placeholder="username"
            type="text"
            name="username"
            onChange={handleChange}
            onBlur={validateInput}
          />
          {error.username && <span className="err">{error.username}</span>}
          <Input
            placeholder="email"
            name="email"
            type="email"
            onChange={handleChange}
            onBlur={validateInput}
          />
          {error.email && <span className="err">{error.email}</span>}
          <Input
            placeholder="password"
            name="password"
            type="password"
            onChange={handleChange}
            onBlur={validateInput}
          />
          {error.password && <span className="err">{error.password}</span>}
          <Input
            placeholder="confirm password"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            onBlur={validateInput}
          />
          {error.confirmPassword && (
            <span className="err">{error.confirmPassword}</span>
          )}
          <RadioButton>
            <Input
              type="radio"
              id="male"
              name="gender"
              margin="margin"
              onChange={handleChange}
              value="male"
            />
            <Label htmlFor="male" margin="margin">
              Male
            </Label>
            <Input
              type="radio"
              id="female"
              name="gender"
              margin="margin"
              onChange={handleChange}
              value="female"
            />
            <Label htmlFor="female" margin="margin">
              Female
            </Label>
            <Input
              type="radio"
              id="other"
              name="gender"
              margin="margin"
              onChange={handleChange}
              value="other"
            />
            <Label htmlFor="other" margin="margin">
              Other
            </Label>
          </RadioButton>
          <Agreement>
            By creating an account , I consent to the processing of my personal
            data in accordance with the
            <b style={{ marginLeft: "5px" }}>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleSubmit}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Regsiter;
