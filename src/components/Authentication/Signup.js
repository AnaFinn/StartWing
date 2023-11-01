import { useState } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputBase,
  Button,
  Alert,
} from "@mui/material";

const Signup = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);

  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {};

  const submitHandler = async () => {
    console.log("Button clicked");
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      <Alert severity="warning">Please fill in all the forms</Alert>;
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      <Alert severity="warning">Passwords do not match</Alert>;
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );

      <Alert severity="success">Registration is successful</Alert>

      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/');
    } catch (error) {
      <Alert severity="error">{error.response.data.message}</Alert>
    }
  };
  return (
    <div>
      <Stack spacing={3}>
        <FormControl id="first-name" required>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter your name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></Input>
        </FormControl>
        <FormControl id="email" required>
          <FormLabel>E-mail</FormLabel>
          <Input
            placeholder="Enter your e-mail"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          ></Input>
        </FormControl>
        <FormControl id="pswd" required>
          <FormLabel>Password</FormLabel>
          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "14px" }}
          >
            <Input
              sx={{ width: "100%" }}
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            ></Input>
            <Button sx={{ height: "1.75rem" }} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </div>
        </FormControl>
        <FormControl id="confirm-pswd" required>
          <FormLabel>Confirm password</FormLabel>
          <div
            style={{ display: "flex", flexDirection: "row", marginTop: "14px" }}
          >
            <Input
              sx={{ width: "100%" }}
              type={show ? "text" : "password"}
              placeholder="Enter password"
              onChange={(event) => {
                setConfirmpassword(event.target.value);
              }}
            ></Input>
            <Button sx={{ height: "1.75rem" }} onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </div>
        </FormControl>
        <FormControl id="pic" required>
          <FormLabel>Upload your photo</FormLabel>
          <Input
            type="file"
            accept="image/*"
            onChange={(event) => {
              postDetails(event.target.files[0]);
            }}
          ></Input>
        </FormControl>

        <Button
          sx={{
            width: "100%",
            marginTop: "15px",
            backgroundColor: "#005892",
            color: "paper",
          }}
          onClick={submitHandler}
        >
          Sign up
        </Button>
      </Stack>
    </div>
  );
};

export default Signup;
