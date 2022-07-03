import { Typography, Button } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MyContext } from "../components/AuthProvider";
import ExitToAppSharpIcon from "@material-ui/icons/ExitToAppSharp";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Tooltip from "@material-ui/core/Tooltip";
import UpdateProfile from "../pages/UpdateProfile";
const BodyHeader = () => {
  const context = useContext(MyContext);
  const [open, setOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const { name } = context.user;
  let navigate = useNavigate();
  let location = useLocation();
  const handleModalOpen = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };
  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div
          style={{ display: "flex", cursor: "pointer", marginRight: "1rem" }}
        >
          <Typography variant="h6">
            Wellcome <span style={{ color: "red" }}>{name}</span>
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "1rem",
          }}
        >
          <div
            style={{ display: "flex", cursor: "pointer", marginRight: "2rem" }}
          >
            <Button
              href="#text-buttons"
              color="primary"
              onClick={handleOpenEditModal}
            >
              Edit Profile
            </Button>
          </div>
          <div
            onClick={handleModalOpen}
            style={{ display: "flex", cursor: "pointer", marginRight: "1rem" }}
          >
            <Tooltip title="Logout" aria-label="add">
              <ExitToAppSharpIcon />
            </Tooltip>
          </div>
        </div>
      </div>
      {showEditModal && (
        <UpdateProfile
          showEditModal={showEditModal}
          setShowEditModal={setShowEditModal}
        />
      )}
      <div>
        <Dialog
          open={open}
          onClose={closeModal}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle style={{ color: "red" }} id="alert-dialog-title">
            Logout
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to logout ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={closeModal}
              style={{ outline: "none" }}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                context.signOut(() => {
                  let to = location.state?.from?.pathname || "/";
                  navigate(to, { replace: true });
                });
              }}
              color="secondary"
              style={{ outline: "none" }}
              autoFocus
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default BodyHeader;
