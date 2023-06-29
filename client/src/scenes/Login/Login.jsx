import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import TextField from "@mui/material/TextField";
import classes from "./login.module.css";
import Button from "@mui/material/Button";
import {
  AiFillGoogleCircle,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from "react-icons/ai";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import { setLogin } from "state";
import { Link } from "react-router-dom";

const Login = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3001/auth/login`, {
        headers: {
          "content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      dispatch(setLogin(data));
      navigate("/home");
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  return (
    <Box className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.loginLeftSide}>
          <img
            src="/assets/336782239_744532177141189_4507603250200076778_n.jpg"
            alt=""
          />
        </div>
        <div className={classes.loginRightSide}>
          <h1 className={classes.title}>LOGIN</h1>
          <form onSubmit={handleLogin} className={classes.forms}>
            <TextField
              fullWidth
              id="outlined-required"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className={classes.btn}>
              Se connecter
            </Button>
          </form>
          <div className={classes.noAcc}>
            Vous n'avez pas encore de compte?{" "}
            <span>
              {" "}
              <Link to="/signup">S'inscrire</Link>{" "}
            </span>
          </div>
          <div className={classes.sm}>
            <h3>ou inscrivez-vous avec votre compte de médias sociaux</h3>
            <div className={classes.iconsSocialMedia}>
              <AiFillGoogleCircle className={classes.iconsm} />
              <AiFillFacebook className={classes.iconsm} />
              <AiFillTwitterCircle className={classes.iconsm} />
              <AiFillLinkedin className={classes.iconsm} />
            </div>
          </div>
          {error && (
            <div className={classes.errorMessage}>
              Wrong credentials ! Try different ones
            </div>
          )}
        </div>
      </div>
    </Box>
  );
};

export default Login;
