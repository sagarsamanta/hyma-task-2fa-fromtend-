import React, { useState, useContext } from "react";
import { TextField, Button} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Grid from "@material-ui/core/Grid";
import { useFormik } from "formik";
import { Backdrop, Fade } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import * as yup from "yup";
import axios from "axios";

import cogoToast from "cogo-toast";
import { MyContext } from "../components/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: "none",
    outline: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const UserSchema = yup.object({
  name: yup.string().required("*Required"),

  phoneNumber: yup
    .string()
    // .required("required")
    .matches(phoneRegExp, "Phone number is not valid")
    .min(10, "to short")
    .max(10, "to long"),
});
const UpdateProfile = ({ setShowEditModal, showEditModal }) => {
  const classes = useStyles();
  let navigate = useNavigate();
  let location = useLocation();
  const [modalStyle] = React.useState(getModalStyle);
  const [isDisable, setDisable] = useState(false);
  const context = useContext(MyContext);
  console.log(context);
  const { name, phoneNumber, userId } = context.user;
  const formik1 = useFormik({
    initialValues: {
      name: `${name}`,
      phoneNumber: `${phoneNumber}`,
    },
    validationSchema: UserSchema,
    onSubmit: (values) => {
      console.log(values);
      handleSubmit(values);
    },
  });

  const handleSubmit = (values) => {
    setDisable(true);
    values.userId = userId;
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_DASHBOARD_URL}/api/user/editUser`,
      data: values,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          cogoToast.success(response.data?.message);
          setShowEditModal(false);
          context.signIn(response.data.user, () => {
            let to = location.state?.from?.pathname || "/profile";
            navigate(to, { replace: true });
          });
        } else {
          cogoToast.error(response.data?.message);
        }
      })
      .catch((err) => {
        cogoToast.error("Failed to update");
      })
      .finally(() => {
        setDisable(false);
      });
  };
  const handleClose = () => {
    setShowEditModal(false);
  };

  // modal body
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
        }}
      >
        <div style={{}}>{}</div>
        <div style={{ marginLeft: "" }}>
          {" "}
          <Typography variant="h5" style={{ color: "#7e7e7e" }} gutterBottom>
            EDIT USER DETAILS
          </Typography>
        </div>
        <Button
          onClick={handleClose}
          style={{ border: "none", outline: "none", marginRight: "-2rem" }}
          startIcon={<CloseIcon />}
        ></Button>
      </div>
      <hr />

      <div style={{ marginTop: "2.5rem" }}>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                size="small"
                placeholder="Enter name here"
                label="Name"
                variant="outlined"
                fullWidth
                className={classes.inputField}
                name="name"
                type="text"
                value={formik1.values.name}
                onChange={formik1.handleChange}
                error={formik1.touched.name && Boolean(formik1.errors.name)}
                helperText={formik1.touched.name && formik1.errors.name}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                placeholder="Enter no"
                label="Phone Number"
                variant="outlined"
                fullWidth
                className={classes.inputField}
                name="phoneNumber"
                type="text"
                value={formik1.values.phoneNumber}
                onChange={formik1.handleChange}
                error={
                  formik1.touched.phoneNumber &&
                  Boolean(formik1.errors.phoneNumber)
                }
                helperText={
                  formik1.touched.phoneNumber && formik1.errors.phoneNumber
                }
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "1rem" }}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                // startIcon={<AddCircleIcon />}
                color="primary"
                onClick={() => {
                  formik1.handleSubmit();
                }}
                style={{ width: "100%", outline: "none" }}
                disabled={isDisable}
              >
                Update
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
                style={{ width: "100%", outline: "none" }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
  return (
    <Modal
      open={showEditModal}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 1000,
      }}
    >
      <Fade in={true}>{body}</Fade>
    </Modal>
  );
};

export default React.memo(UpdateProfile);
