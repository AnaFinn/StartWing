import { useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputBase,
  Button,
} from "@mui/material";
import Alert from '@mui/material/Alert';
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");

  const handleClick = () => setShow(!show);
  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      setAlert("warning");
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
        "api/user/login",
        { email, password },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      setAlert("error");
    }
  };
  return (
    <div>
      <Stack spacing={2}>
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
        <Button
          sx={{
            width: "100%",
            marginTop: "15px",
            backgroundColor: "#005892",
            color: "paper",
          }}
          onClick={submitHandler}
          isLoading={loading}
        >
          Login
        </Button>
        <Button
          sx={{
            width: "100%",
            marginTop: "15px",
            backgroundColor: "red",
            color: "white",
          }}
          onClick={() => {
            setEmail("guest@example.come");
            setPassword("123123");
          }}
        >
          Get Guest User Credentials
        </Button>
      </Stack>
    </div>
  );
};

export default Login;
