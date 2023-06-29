import React from "react";
import { useTheme } from "@emotion/react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import TextField from "@mui/material/TextField";
import classes from "./singup.module.css";
import Button from "@mui/material/Button";
import {
  AiFillGoogleCircle,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { json, useNavigate } from "react-router-dom";
import { setLogin, setRegister } from "state";
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Signup = () => {
  const theme = useTheme();
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");
  const [occupation, setOccupation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");

  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      let filename = null;

      if (image) {
        filename = Date.now() + image.name;
        formData.append("filename", filename);
        formData.append("image", image);

        await fetch(`http://localhost:3001/upload/image`, {
          method: "POST",
          body: formData,
        });
      }
      const res = await fetch(`http://localhost:3001/auth/register`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          image: filename,
          location,
          occupation,
          password,
        }),
      });

      const userRegister = await res.json();
      dispatch(setRegister(userRegister));
      navigate("/");
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 3000);
    }
  };

  const handleClose = () => {
    setImage("");
  };
  const onChangeFile = (e) => {
    setImage(e.target.files[0]);
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
          <h1 className={classes.title}>SIGN UP</h1>
          <form onSubmit={handleRegister} className={classes.forms}>
            <div className={classes.inpGroup}>
              <TextField
                fullWidth
                id="outlined-required"
                label="FistName"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                fullWidth
                id="outlined-required"
                label="lastName"
                onChange={(e) => setlastName(e.target.value)}
              />
            </div>
            <div className={classes.inpGroup}>
              <TextField
                fullWidth
                id="outlined-required"
                label="location"
                onChange={(e) => setLocation(e.target.value)}
              />
              <TextField
                fullWidth
                id="outlined-required"
                label="occupation"
                onChange={(e) => setOccupation(e.target.value)}
              />
            </div>
            <div className={classes.inputWrapperImage}>
              <label htmlFor="image" className={classes.labelFileUpload}>
                Image: <span>Upload here</span>{" "}
              </label>
              <input
                id="image"
                type="file"
                placeholder="Title..."
                className={classes.input}
                onChange={onChangeFile}
                style={{ display: "none" }}
              />
              {image && (
                <p className={classes.imageName}>
                  {image.name}
                  <AiOutlineCloseCircle
                    onClick={handleClose}
                    className={classes.closeIcon}
                  />
                </p>
              )}
            </div>
            <TextField
              fullWidth
              id="outlined-password-input"
              label="Email"
              type="email"
              autoComplete="current-password"
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
              S'inscrire
            </Button>
          </form>
          <div className={classes.noAcc}>
            Vous avez deja un compte? <span>Se Connecter</span>
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

export default Signup;
