import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import {
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import BackImage from "../assets/b1.jpg";

import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useFormik } from "formik";
import * as yup from "yup";

import cogoToast from "cogo-toast";
import axios from "axios";
import Otp from "./Otp";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  phoneNumber: yup
    .string()
    // .required("required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "to short")
    .max(10, "to long"),
});
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 150,
    },
    width: 400,
    padding: 25,
    borderRadius: "20px",
    border: "1px solid #e9e9e9",
    boxShadow: "10px 10px 40px 10px rgb(0,0,0, 0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    flexDirection: "column",
    "& > *:not(:last-child)": {
      marginBottom: 20,
    },
    backgroundColor: "white",
  },
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url("${BackImage}")`,

    // background: `linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("${BackImage}")`,
    // background: "linear-gradient(#e66465, #9198e5);",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  logoImage: {
    width: "200px",
    height: "auto",
    margin: "0 auto",
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    flexDirection: "column",
    "& .MuiTextField-root": {
      width: "100%",
      margin: 0,
      marginBottom: 20,
    },
  },
  fullWidth: {
    width: "100%",
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [isDisable, setDisable] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [userId, setUserId] = useState("");

  const handleSubmit = (values) => {
    setDisable(true);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_DASHBOARD_URL}/api/user/register`,
      data: values,
    })
      .then((response) => {
        if (response.status === 201) {
          cogoToast.error(response.data?.message);
        } else if (response.status === 200) {
          setUserId(response.data?.data?.userId);
          cogoToast.success(response.data?.message);
          setShowOtp(true);
        } else {
          cogoToast.error(response.data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setDisable(false);
      });
  };

  return (
    <>
      {!showOtp ? (
        <div className={classes.container}>
          <div className={classes.root}>
            {/* <img src={loginImg} alt="Login" className={classes.logoImage} /> */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="h6">Sign up here</Typography>
            </div>
            <form
              className={classes.form}
              onSubmit={formik.handleSubmit}
              autoComplete="off"
            >
              <TextField
                id="outlined-error"
                label="Enter Name"
                placeholder="Enter name.."
                fullWidth
                name="name"
                variant="outlined"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                id="outlined-error"
                label="Enter Phone No"
                placeholder="Enter no.."
                fullWidth
                name="phoneNumber"
                variant="outlined"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
              <TextField
                id="outlined-error"
                label="Enter Email"
                placeholder="Enter email.."
                fullWidth
                name="email"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                label="Enter Password"
                placeholder="Enter Password"
                fullWidth
                variant="outlined"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                onClick={() => {
                  formik.handleSubmit();
                }}
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                style={{ border: "none", outline: "none" }}
                disabled={isDisable}
              >
                Signup
              </Button>
            </form>
            <div>
              Already Signup ?{" "}
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  textDecoration: "none",
                })}
              >
                Login Here
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <Otp email={formik.values.email} userId={userId} />
      )}
    </>
  );
};
export default SignUp;
