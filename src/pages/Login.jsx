import React, { useState, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";
import cogoToast from "cogo-toast";
import BackImage from "../assets/b1.jpg";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { MyContext } from "../components/AuthProvider";
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 150,
    },
    width: 300,
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
    width: "80%",
  },
}));

const LoginForm = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const context = useContext(MyContext);
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const [isDesable, setDisable] = useState(false);

  const handleSubmit = (values) => {
    setDisable(true);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_DASHBOARD_URL}/api/user/login`,
      data: values,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          context.signIn(response.data.user, () => {
            let to = location.state?.from?.pathname || "/profile";
            navigate(to, { replace: true });
          });
        } else {
          cogoToast.error(response.data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
        cogoToast.error("Failed to login");
      })
      .finally(() => {
        setDisable(false);
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.root}>
        {/* <img src={loginImg} alt="Login" className={classes.logoImage} /> */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Typography variant="h6">Login Here</Typography>
        </div>
        <form
          className={classes.form}
          onSubmit={formik.handleSubmit}
          autoComplete="off"
        >
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
            error={formik.touched.password && Boolean(formik.errors.password)}
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
            disabled={isDesable}
          >
            Login
          </Button>
        </form>
        <div>
          Didn't Signup ?{" "}
          <NavLink
            to="/signup"
            style={({ isActive }) => ({
              textDecoration: "none",
            })}
          >
            Signup Here
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
