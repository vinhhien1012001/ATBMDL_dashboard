import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
// import axios from "../../state/axios-instance";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        LIBERTY SCHOOL
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const req = new FormData(event.currentTarget);

    // const response = await fetch("http://localhost:3001/auth/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: req.get("email"),
    //     password: req.get("password"),
    //   }),
    // });

    const response = await axios
      .post("/auth/login", {
        email: req.get("email"),
        password: req.get("password"),
      })
      .then((res) => {
        console.log("res", res);
        dispatch(
          setLogin({
            user: res.data.user,
            token: res.data.token,
          })
        );
        navigate("/students");
      })
      .catch((err) => console.log(err));

    const data = await response.json();

    // if (data.user) {
    //   dispatch(
    //     setLogin({
    //       user: data.user,
    //       token: data.token,
    //     })
    //   );
    //   navigate("/students");
    // } else {
    //   alert("Please check your username and password");
    // }
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const req = new FormData(event.currentTarget);

  //   const user = JSON.stringify({
  //     email: req.get("email"),
  //     password: req.get("password"),
  //   });

  //   // const response = await axios.post("/auth/login", user);

  //   const response = await fetch("http://localhost:3001/auth/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: req.get("email"),
  //       password: req.get("password"),
  //     }),
  //   });

  //   console.log("res:", response.json());

  //   // axios
  //   //     .post("/student/add", newRow)
  //   //     .then((res) => {
  //   //       setRows(rows.filter((row) => row._id !== newRow._id));
  //   //       setRows((oldRows) => [...oldRows, res.data]);
  //   //     })
  //   //     .catch((err) => console.log(err));

  //   //
  //   // const response = await axios.post(API_URL + 'login', userData)

  //   // if (response.data) {
  //   //   localStorage.setItem('user', JSON.stringify(response.data))
  //   // }

  //   // return response.data

  //   //

  //   const data = await response.json();

  //   if (data.user) {
  //     dispatch(
  //       setLogin({
  //         user: data.user,
  //         token: data.token,
  //       })
  //     );
  //     navigate("/students");
  //   } else {
  //     alert("Please check your username and password");
  //   }
  // };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ height: 100 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: "100vh",
            justifyContent: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
