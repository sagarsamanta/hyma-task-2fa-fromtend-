import React from "react";
import { NavLink } from "react-router-dom";
import Divider from "@material-ui/core/Divider";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li
          style={{ listStyle: "none", marginBottom: "1rem", marginTop: "1rem" }}
        >
          <NavLink
            to="../profile"
            style={({ isActive }) => ({
              color: isActive ? "white" : "#f7ececa3",
              textDecoration: "none",
              fontSize: "18px",
            })}
          >
            Profile
          </NavLink>
        </li>
        <Divider style={{ background: "#a39898", width: "350%" }} />

        <li
          styl
          style={{ listStyle: "none", marginBottom: "1rem", marginTop: "1rem" }}
        >
          <NavLink
            to="../posts"
            style={({ isActive }) => ({
              color: isActive ? "white" : "#f7ececa3",
              textDecoration: "none",
              fontSize: "18px",
            })}
          >
            Posts
          </NavLink>
        </li>
        <Divider style={{ background: "#a39898", width: "350%" }} />

        <li
          style={{ listStyle: "none", marginBottom: "1rem", marginTop: "1rem" }}
        >
          <NavLink
            to="../gallery"
            style={({ isActive }) => ({
              color: isActive ? "white" : "#f7ececa3",
              textDecoration: "none",
              fontSize: "18px",
            })}
          >
            Gallery
          </NavLink>
        </li>
        <Divider style={{ background: "#a39898", width: "350%" }} />
        <li
          style={{ listStyle: "none", marginBottom: "1rem", marginTop: "1rem" }}
        >
          <NavLink
            to="../todos"
            style={({ isActive }) => ({
              color: isActive ? "white" : "#f7ececa3",
              textDecoration: "none",
              fontSize: "18px",
            })}
          >
            ToDo
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
