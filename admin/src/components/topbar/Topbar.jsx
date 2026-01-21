import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { useState } from "react";
import DropdownMenu from "../../UI/Dropdown";
import { ReactComponent as CaretIcon } from "../../icons/caret.svg";
import { Link } from "react-router-dom";

export default function Topbar() {
  function Navbar(props) {
    return (
      <nav className="navbar">
        <ul className="navbar-nav">{props.children}</ul>
      </nav>
    );
  }

  function NavItem(props) {
    const [open, setOpen] = useState(false);

    return (
      <li className="nav-item">
        <Link to="#" className="icon-button" onClick={() => setOpen(!open)}>
          {props.icon}
        </Link>
        {open && props.children}
      </li>
    );
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">sha1admin</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <div
            className="topbarIconContainer"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/new-shopping-app-d6e85.appspot.com/o/17690066504092.png?alt=media&token=8195725e-fc89-4a9f-8151-a21766e532c1"
              alt=""
              className="topAvatar"
            />
            <Navbar>
              <NavItem icon={<CaretIcon />}>
                <DropdownMenu></DropdownMenu>
              </NavItem>
            </Navbar>
          </div>
        </div>
      </div>
    </div>
  );
}
