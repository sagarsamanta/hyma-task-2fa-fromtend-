import { Avatar, Typography } from "@material-ui/core";
import React, { useContext } from "react";
import { MyContext } from "../components/AuthProvider";

const Profile = () => {
  const context = useContext(MyContext);
  const { name, email, phoneNumber } = context.user;
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "80%",
          marginTop: "0rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "1em",
          }}
        >
          <Avatar style={{ width: 100, height: 100 }} src={""} alt="No Image" />
          <div style={{ marginTop: "1rem" }}>
            <Typography
              variant="h6"
              gutterBottom
              component="div"
              style={{
                fontSize: "21px",
                color: "black",
                marginTop: "1rem",
                fontWeight: "700",
              }}
            >
              {name}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "21px",
                  color: "#877e7e",
                  marginTop: "1rem",
                  fontWeight: "500",
                }}
              >
                Name&nbsp;&nbsp;
              </div>
              <div
                style={{
                  fontSize: "21px",
                  color: "#877e7e",
                  marginTop: "1rem",
                  fontWeight: "500",
                }}
              >
                E-mail&nbsp;&nbsp;
              </div>
              <div
                style={{
                  fontSize: "21px",
                  color: "#877e7e",
                  marginTop: "1rem",
                  fontWeight: "500",
                }}
              >
                Phone&nbsp;&nbsp;
              </div>
              <div
                style={{
                  fontSize: "21px",
                  color: "#877e7e",
                  marginTop: "1rem",
                  fontWeight: "500",
                }}
              >
                Website&nbsp;&nbsp;
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "21px",
                  color: "black",
                  marginTop: "1rem",
                  fontWeight: "500",
                }}
              >
                :&nbsp;&nbsp;{name}
              </div>
              <div
                style={{
                  fontSize: "21px",
                  color: "black",
                  marginTop: "1rem",
                  fontWeight: "500",
                }}
              >
                :&nbsp;&nbsp;{email}
              </div>
              <div
                style={{
                  fontSize: "21px",
                  color: "black",
                  marginTop: "1rem",
                  fontWeight: "500",
                }}
              >
                :&nbsp;&nbsp;{phoneNumber}
              </div>
              <div
                style={{
                  fontSize: "21px",
                  color: "black",
                  marginTop: "1rem",
                  fontWeight: "500",
                }}
              >
                :&nbsp;&nbsp;{"website"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
